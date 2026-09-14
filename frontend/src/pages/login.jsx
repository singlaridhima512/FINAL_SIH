import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }

        try {

            const response = await fetch(
                "http://localhost:8000/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            alert("Login successful!");

            // Save logged-in user temporarily
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            navigate("/home");

        } catch (error) {

            console.error(error);

            alert("Cannot connect to the backend.");

        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-logo">🐟</div>

                <h1>Welcome Back</h1>

                <p className="auth-subtitle">
                    Sign in to continue to Aqua-Sense
                </p>

                <form onSubmit={handleLogin}>

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        className="primary-btn"
                        type="submit"
                    >
                        Login
                    </button>

                </form>

                <p className="auth-footer">

                    Don't have an account?{" "}

                    <Link to="/register">
                        Create Account
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;