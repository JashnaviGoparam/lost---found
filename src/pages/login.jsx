import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../config";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await apiRequest("/api/login", {
                method: "POST",
                body: JSON.stringify({
                    email: email.trim().toLowerCase(),
                    password
                })
            });

            if (data.user?.role !== "student" || !data.token) {
                throw new Error("Student login could not be verified.");
            }

            const loggedInStudent = {
                ...data.user,
                role: "student"
            };

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(loggedInStudent)
            );

            localStorage.setItem("token", data.token);

            alert("Login successful!");
            navigate("/student-dashboard");

        } catch (error) {
            console.error("Login error:", error);
            alert(error.message || "Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Lost &amp; Found Portal</h1>
                <p>Student Login</p>

                <form onSubmit={handleLogin}>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter registered email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p>
                    Don't have an account?{" "}
                    <Link to="/register">Register</Link>
                </p>

                <p>
                    <Link to="/reset-password">Forgot your password?</Link>
                </p>

                <p>
                    Are you an administrator?{" "}
                    <Link to="/admin-login">Admin Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;