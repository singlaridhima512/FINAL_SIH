import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {

        e.preventDefault();

        if (!name || !email || !password) {
            alert("Please fill all fields.");
            return;
        }

        try {

            const response = await fetch(
                "http://localhost:8000/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name,
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

            alert("Registration successful!");

            navigate("/");

        } catch (error) {

            console.error(error);

            alert("Cannot connect to the backend.");

        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-logo">🐟</div>

                <h1>Create Account</h1>

                <p className="auth-subtitle">
                    Join Aqua-Sense today
                </p>

                <form onSubmit={handleRegister}>

                    <label>Name</label>

                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

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
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        className="primary-btn"
                        type="submit"
                    >
                        Create Account
                    </button>

                </form>

                <p className="auth-footer">

                    Already have an account?{" "}

                    <Link to="/">
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Register;