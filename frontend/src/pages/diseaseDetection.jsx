import { useState } from "react";

function DiseaseDetection() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
        setResult(null);
    };

    const handleAnalyze = async () => {
        if (!selectedFile) {
            alert("Please upload a fish image first.");
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const formData = new FormData();

            formData.append("file", selectedFile);

            const response = await fetch(
                "http://localhost:8000/api/disease-check",
                {
                    method: "POST",
                    body: formData
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Analysis failed"
                );
            }

            setResult(data);

        } catch (error) {
            console.error(
                "Disease detection error:",
                error
            );

            alert(
                "Could not analyze the image. Please make sure the backend is running."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="page-container disease-page">

            <div className="page-header">

                <p className="small-text">
                    AI POWERED
                </p>

                <h1>
                    Disease Detection
                </h1>

                <p>
                    Upload a fish image to identify possible diseases.
                </p>

            </div>


            <div className="disease-layout">

                {/* Upload Section */}

                <section className="upload-card">

                    <div className="upload-icon">
                        🔬
                    </div>

                    <h2>
                        Upload Fish Image
                    </h2>

                    <p>
                        Use a clear image of the fish for better detection.
                    </p>


                    <label className="upload-box">

                        {preview ? (

                            <img
                                src={preview}
                                alt="Fish preview"
                            />

                        ) : (

                            <>
                                <span>
                                    📷
                                </span>

                                <strong>
                                    Choose an image
                                </strong>

                                <small>
                                    JPG, PNG or WEBP
                                </small>
                            </>

                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                    </label>


                    <button
                        className="primary-btn"
                        onClick={handleAnalyze}
                        disabled={loading}
                    >

                        {loading
                            ? "Analyzing..."
                            : "Analyze Fish"}

                    </button>

                </section>


                {/* Result Section */}

                {result && (

                    <section className="disease-result">

                        <div className="result-header">

                            <div>

                                <p className="small-text">
                                    ANALYSIS RESULT
                                </p>

                                <h2>
                                    {result.disease}
                                </h2>

                            </div>


                            <div className="confidence">
                                {result.confidence}%
                            </div>

                        </div>


                        <div className="result-row">

                            <span>
                                Confidence
                            </span>

                            <strong>
                                {result.confidence}%
                            </strong>

                        </div>


                        <div className="result-row">

                            <span>
                                Severity
                            </span>

                            <strong>
                                {result.severity}
                            </strong>

                        </div>


                        {/* Symptoms */}

                        <div className="recommendation">

                            <p className="small-text">
                                VISIBLE SYMPTOMS
                            </p>

                            {result.symptoms &&
                                result.symptoms.length > 0 ? (

                                <ul>
                                    {result.symptoms.map(
                                        (symptom, index) => (
                                            <li key={index}>
                                                {symptom}
                                            </li>
                                        )
                                    )}
                                </ul>

                            ) : (

                                <p>
                                    No clear symptoms could be identified.
                                </p>

                            )}

                        </div>


                        {/* Recommendation */}

                        <div className="recommendation">

                            <p className="small-text">
                                RECOMMENDATION
                            </p>

                            <p>
                                {result.recommendation}
                            </p>

                        </div>


                        {/* Next Steps */}

                        <div className="recommendation">

                            <p className="small-text">
                                NEXT STEPS
                            </p>

                            {result.nextSteps &&
                                result.nextSteps.length > 0 ? (

                                <ul>
                                    {result.nextSteps.map(
                                        (step, index) => (
                                            <li key={index}>
                                                {step}
                                            </li>
                                        )
                                    )}
                                </ul>

                            ) : (

                                <p>
                                    Continue monitoring the fish and water quality.
                                </p>

                            )}

                        </div>


                        {/* Disclaimer */}

                        <div className="ai-disclaimer">

                            <span>
                                ⚠️
                            </span>

                            <p>
                                This is an AI-assisted visual assessment
                                and should not be considered a confirmed
                                medical or veterinary diagnosis.
                            </p>

                        </div>

                    </section>

                )}

            </div>

        </main>
    );
}

export default DiseaseDetection;