function TankAnalysis() {

    return (

        <main className="page-container">

            <div className="page-header">

                <p className="small-text">
                    AI POWERED
                </p>

                <h1>
                    Tank Analysis
                </h1>

                <p>
                    Understand your aquarium's
                    current health.
                </p>

            </div>


            <div className="analysis-grid">

                <div className="analysis-card">

                    <span>
                        🌡️
                    </span>

                    <p>
                        Temperature
                    </p>

                    <h2>
                        27°C
                    </h2>

                    <small>
                        Optimal
                    </small>

                </div>


                <div className="analysis-card">

                    <span>
                        🧪
                    </span>

                    <p>
                        pH Level
                    </p>

                    <h2>
                        7.2
                    </h2>

                    <small>
                        Healthy
                    </small>

                </div>


                <div className="analysis-card">

                    <span>
                        💧
                    </span>

                    <p>
                        Water Quality
                    </p>

                    <h2>
                        92%
                    </h2>

                    <small>
                        Excellent
                    </small>

                </div>

            </div>


            <div className="ai-insight-card">

                <div className="feature-icon">
                    🤖
                </div>

                <h2>
                    AI Insight
                </h2>

                <p>
                    Your aquarium currently appears
                    to be in good condition. Temperature
                    and pH are within the recommended
                    range.
                </p>

                <p>
                    Continue monitoring water quality
                    regularly and maintain your current
                    maintenance schedule.
                </p>

            </div>

        </main>
    );
}


export default TankAnalysis;