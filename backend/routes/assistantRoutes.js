const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

router.post("/", async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                message: "Please enter a question."
            });
        }

        const conversation = [
            ...(history || []),
            {
                role: "user",
                parts: [
                    {
                        text: message
                    }
                ]
            }
        ];

        const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",

            contents: conversation,

            config: {
                systemInstruction: `
You are Aqua-Sense AI Assistant.

You help users with:
- Fish health
- Fish diseases
- Water quality
- Fish feeding
- Aquarium management
- Pond management
- Aquaculture practices
- Disease prevention

Give simple and practical answers.

Do not claim to diagnose a fish with certainty from text alone.

For serious fish disease or mortality situations,
recommend consulting an aquaculture expert or veterinarian.

Keep answers clear and easy to understand.
`
            }
        });

        res.json({
            reply: response.text
        });

    } catch (error) {

        console.error("Gemini error:", error);

        res.status(500).json({
            message: "AI assistant is temporarily unavailable. Please try again."
        });
    }
});

module.exports = router;