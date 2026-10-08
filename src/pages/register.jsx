import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

    const handleSubmit = (e) => {
        e.preventDefault();

        const existingUsers =
            JSON.parse(localStorage.getItem("users")) || [];

        const newUser = {
    id: Date.now(),
    name: formData.name,
    rollNumber: formData.rollNumber,
    email: formData.email,
    phone: formData.phone,
    branch: formData.branch,
    password: formData.password
};

        const updatedUsers = [
            ...existingUsers,
            newUser
        ];

        localStorage.setItem(
            "users",
            JSON.stringify(updatedUsers)
        );

        alert("Registration successful!");

        navigate("/login");
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
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value
                            })
                        }
                        required
                    />

                    <label>Roll Number</label>

                    <input
                        type="text"
                        placeholder="Enter roll number"
                        value={formData.rollNumber}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                rollNumber: e.target.value
                            })
                        }
                        required
                    />

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value
                            })
                        }
                        required
                    />

                    <label>Phone Number</label>

                    <input
                        type="text"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                phone: e.target.value
                            })
                        }
                    />

                    <label>Branch</label>

                    <select
                        value={formData.branch}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                branch: e.target.value
                            })
                        }
                        required
                    >
                        <option value="">
                            Select Branch
                        </option>

                        <option>CSE</option>
                        <option>IT</option>
                        <option>ECE</option>
                        <option>EEE</option>
                        <option>MECH</option>
                        <option>CIVIL</option>
                    </select>

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Create password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value
                            })
                        }
                        required
                    />

                    <button type="submit">
                        Register
                    </button>

                </form>

                <p>
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Register;