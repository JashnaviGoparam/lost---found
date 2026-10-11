import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../config";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        rollNumber: "",
        email: "",
        phone: "",
        branch: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await apiRequest("/api/register", {
                method: "POST",
                body: JSON.stringify({
                    name: formData.name.trim(),
                    roll_number: formData.rollNumber.trim(),
                    email: formData.email.trim(),
                    phone: formData.phone.trim(),
                    branch: formData.branch,
                    password: formData.password
                })
            });

            alert("Registration successful! Please log in.");
            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error);
            setError(error.message || "Could not connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Create Account</h1>
                <p>Register for Lost & Found Portal</p>

                <form onSubmit={handleSubmit}>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={handleChange}
                        maxLength={100}
                        required
                    />

                    <label>Roll Number</label>
                    <input
                        type="text"
                        name="rollNumber"
                        placeholder="Enter roll number"
                        value={formData.rollNumber}
                        onChange={handleChange}
                        maxLength={50}
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        maxLength={100}
                        required
                    />

                    <label>Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength={15}
                    />

                    <label>Branch</label>
                    <select
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Branch</option>
                        <option value="CSE">CSE</option>
                        <option value="IT">IT</option>
                        <option value="ECE">ECE</option>
                        <option value="EEE">EEE</option>
                        <option value="MECH">MECH</option>
                        <option value="CIVIL">CIVIL</option>
                    </select>

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Create password"
                        value={formData.password}
                        onChange={handleChange}
                        minLength={8}
                        required
                    />

                    {error && <p role="alert" style={{ color: "red" }}>{error}</p>}

                    <button type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p>
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;