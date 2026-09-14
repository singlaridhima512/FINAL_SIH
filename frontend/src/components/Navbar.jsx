import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../LanguageContext";

function Navbar() {

    const navigate = useNavigate();

    const { language, setLanguage, t } = useLanguage();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <nav className="navbar">

            <Link to="/home" className="logo">AquaCore</Link>

            <div className="nav-links">

                <Link to="/home">
                    {t.home}
                </Link>

                <Link to="/disease">
                    {t.disease}
                </Link>

                <Link to="/assistant">
                    {t.assistant}
                </Link>

                <Link to="/marketplace">
                    {t.marketplace}
                </Link>

                <Link to="/cart">
                    {t.cart}
                </Link>

                <select
                    className="language-selector"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="en">English</option>
                    <option value="hi">हिन्दी</option>
                    <option value="bn">বাংলা</option>
                    <option value="ta">தமிழ்</option>
                </select>

                <button
                    onClick={handleLogout}
                    className="logout-btn"
                >
                    {t.logout}
                </button>

            </div>

        </nav>
    );
}

export default Navbar;