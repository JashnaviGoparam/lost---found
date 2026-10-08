import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = (e) => {

        e.preventDefault();


        /* =========================
           STUDENT LOGIN
        ========================= */

        const users =
            JSON.parse(
                localStorage.getItem("users")
            ) || [];


        const student = users.find(
            (user) =>
                user.email === email &&
                user.password === password
        );


        if (student) {

            const loggedInStudent = {

                id: student.id,

                name: student.name,

                email: student.email,

                rollNumber: student.rollNumber,

                phone: student.phone,

                branch: student.branch,

                role: "student"

            };


            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(loggedInStudent)
            );


            alert("Login successful!");


            navigate("/student-dashboard");


            return;
        }


        alert(
            "Invalid email or password!"
        );

    };


    return (

        <div className="auth-container">

            <div className="auth-card">

                <h1>
                    Lost & Found Portal
                </h1>


                <p>
                    Student Login
                </p>


                <form onSubmit={handleLogin}>

                    <label>
                        Email
                    </label>


                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />


                    <label>
                        Password
                    </label>


                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />


                    <button type="submit">
                        Login
                    </button>

                </form>


                <p>

                    Don't have an account?{" "}

                    <Link to="/register">
                        Register
                    </Link>

                </p>


                <p>

                    Are you an administrator?{" "}

                    <Link to="/admin-login">
                        Admin Login
                    </Link>

                </p>

            </div>

        </div>

    );
}

export default Login;