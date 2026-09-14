const express = require("express");
const multer = require("multer");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage()
});

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

router.post("/", upload.single("file"), async (req, res) => {

    try {

        // Check whether an image was uploaded

        if (!req.file) {

            return res.status(400).json({
                message: "Please upload a fish image."
            });

        }


        console.log(
            "Image received:",
            req.file.originalname
        );


        // Convert image to Base64

        const base64Image =
            req.file.buffer.toString("base64");


        // Send image to Gemini

        const response = await ai.models.generateContent({

            model: "gemini-3.8-flash",

            contents: [

                {

                    role: "user",

                    parts: [

                        {
                            inlineData: {
                                mimeType: req.file.mimetype,
                                data: base64Image
                            }
                        },

                        {

                            text: `
You are Aqua-Sense AI, an assistant for fish farmers and aquaculture.

Analyze the uploaded fish image carefully.

Your task is to provide an AI-assisted visual assessment of the fish.

Return ONLY valid JSON.

Use exactly this format:

{
    "disease": "name of possible disease or Healthy Fish",
    "confidence": 85,
    "severity": "Low",
    "symptoms": [
        "Visible symptom 1",
        "Visible symptom 2"
    ],
    "recommendation": "Practical recommendation for the fish farmer.",
    "nextSteps": [
        "First step",
        "Second step",
        "Third step"
    ]
}

Rules:

1. confidence must be a number between 0 and 100.

2. severity must be exactly one of:
   Low
   Medium
   High

3. If the fish appears healthy, use:
   "Healthy Fish"

4. If a disease is suspected, mention the most likely visible condition.

5. Only mention symptoms that are actually visible or reasonably supported by the image.

6. Do not invent symptoms.

7. Give 2 to 4 practical next steps.

8. Give simple and understandable recommendations.

9. Do not claim that the image provides a certain diagnosis.

10. If the image is unclear, heavily obstructed, or does not contain a fish, use:

   "disease": "Unable to determine"

11. If the image is unclear, keep confidence low.

12. Do not recommend exact medicine dosages.

13. For serious disease or mortality situations, recommend consulting an aquaculture expert or veterinarian.

14. Do not include Markdown or code fences.

Return ONLY the JSON object.
`
                        }

                    ]

                }

            ]

        });


        // Get Gemini response

        let text = response.text;


        console.log(
            "Gemini response:",
            text
        );


        // Remove code fences if Gemini accidentally adds them

        text = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();


        // Convert Gemini response into JSON

        const result = JSON.parse(text);


        // Send result back to React

        res.json(result);


    } catch (error) {

        console.error(
            "Disease detection error:",
            error
        );


        res.status(500).json({

            message:
                "Could not analyze the fish image."

        });

    }

});


module.exports = router;