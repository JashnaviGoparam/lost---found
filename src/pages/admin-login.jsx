import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminLogin() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {

        e.preventDefault();

        if (
            email === "admin@mits.ac.in" &&
            password === "MITS@2026"
        ) {

            const adminUser = {
                id: "admin",
                name: "MITS Admin",
                email: "admin@mits.ac.in",
                role: "admin"
            };

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(adminUser)
            );

            alert("Admin login successful!");

            navigate("/admin-dashboard");

        } else {

            alert("Invalid admin email or password!");

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
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <label>
                        Admin Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter admin password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    <button type="submit">
                        Admin Login
                    </button>

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