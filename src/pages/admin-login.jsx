import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../config";

function AdminLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const data = await apiRequest("/api/admin/login", {
                method: "POST",
                body: JSON.stringify({
                    email: email.trim().toLowerCase(),
                    password
                })
            });

            if (data.user?.role !== "admin") {
                setError("This account does not have admin access.");
                return;
            }

            if (!data.token) {
                throw new Error("The server did not provide an authentication token.");
            }

            localStorage.setItem("loggedInUser", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);

            alert("Admin login successful!");
            navigate("/admin-dashboard");
        } catch (error) {
            console.error("Admin login error:", error);
            setError(error.message || "Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1>Admin Login</h1>

                <p>
                    Lost & Found Portal Administration
                </p>

                <form onSubmit={handleLogin}>

                    <label>
                        Admin Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter admin email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                        }}
                        required
                    />

                    <label>
                        Admin Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter admin password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError("");
                        }}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Admin Login"}
                    </button>

                    {error && (
                        <p role="alert" style={{ color: "red" }}>
                            {error}
                        </p>
                    )}
                </form>

                <p>
                    <Link to="/login">
                        ← Back to Student Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default AdminLogin;