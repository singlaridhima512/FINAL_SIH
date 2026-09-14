import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";

function Home() {

    const { t } = useLanguage();

    const user = JSON.parse(localStorage.getItem("user"));

    const userName = user ? user.name : "User";

    return (
        <main className="page-container">

            <div className="dashboard-header">

                <div>
                    <p className="small-text">
                        AQUA-SENSE DASHBOARD
                    </p>

                    <h1>
                        Welcome back, {userName} 👋
                    </h1>

                    <p>
                        Monitor your aquarium and keep your fish healthy.
                    </p>
                </div>

            </div>


            <div className="tank-status-card">

                <div>
                    <p className="small-text">
                        CURRENT TANK STATUS
                    </p>

                    <h2>
                        Your aquarium is healthy
                    </h2>

                    <p>
                        Everything looks good right now.
                    </p>
                </div>

                <div className="status-badge">
                    ● Healthy
                </div>

            </div>


            <div className="tank-stats">

                <div className="tank-stat">
                    <span>🌡️</span>
                    <p>Temperature</p>
                    <h2>27°C</h2>
                </div>

                <div className="tank-stat">
                    <span>🧪</span>
                    <p>pH Level</p>
                    <h2>7.2</h2>
                </div>

                <div className="tank-stat">
                    <span>💧</span>
                    <p>Water Quality</p>
                    <h2>92%</h2>
                </div>

            </div>


            <div className="feature-section">

                <div className="page-header">
                    <p className="small-text">
                        AQUACORE TOOLS
                    </p>

                    <h2>
                        Explore Aqua-Sense
                    </h2>
                </div>


                <div className="feature-grid">

                    <Link
                        to="/tank-analysis"
                        className="feature-card"
                    >
                        <div className="feature-icon">
                            📊
                        </div>

                        <h3>
                            Tank Analysis
                        </h3>

                        <p>
                            Check your aquarium's current health
                            and water conditions.
                        </p>
                    </Link>


                    <Link
                        to="/disease"
                        className="feature-card"
                    >
                        <div className="feature-icon">
                            🐟
                        </div>

                        <h3>
                            Disease Detection
                        </h3>

                        <p>
                            Upload a fish image and check for
                            possible diseases.
                        </p>
                    </Link>


                    <Link
                        to="/assistant"
                        className="feature-card"
                    >
                        <div className="feature-icon">
                            🤖
                        </div>

                        <h3>
                            AI Assistant
                        </h3>

                        <p>
                            Get helpful guidance for your
                            aquarium.
                        </p>
                    </Link>


                    <Link
                        to="/marketplace"
                        className="feature-card"
                    >
                        <div className="feature-icon">
                            🛒
                        </div>

                        <h3>
                            Marketplace
                        </h3>

                        <p>
                            Find products for fish health
                            and aquarium care.
                        </p>
                    </Link>

                </div>

            </div>

        </main>
    );
}

export default Home;