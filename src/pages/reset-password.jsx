import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiRequest } from "../config";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token") || "";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            if (token && password !== confirmPassword) {
                throw new Error("The passwords do not match.");
            }

            const result = token
                ? await apiRequest("/api/password/reset", {
                    method: "POST",
                    body: JSON.stringify({ token, password })
                })
                : await apiRequest("/api/password/forgot", {
                    method: "POST",
                    body: JSON.stringify({ email: email.trim() })
                });

            setMessage(result.message);
            setPassword("");
            setConfirmPassword("");
        } catch (requestError) {
            console.error("Password reset error:", requestError);
            setError(requestError.message || "Could not reset the password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>{token ? "Choose a New Password" : "Reset Password"}</h1>
                <p>
                    {token
                        ? "Enter and confirm your new password."
                        : "Enter your registered student email to receive a reset link."}
                </p>

                <form onSubmit={handleSubmit}>
                    {!token ? (
                        <>
                            <label htmlFor="reset-email">Registered email</label>
                            <input
                                id="reset-email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                maxLength={100}
                                required
                            />
                        </>
                    ) : (
                        <>
                            <label htmlFor="new-password">New password</label>
                            <input
                                id="new-password"
                                type="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                minLength={8}
                                required
                            />

                            <label htmlFor="confirm-password">Confirm new password</label>
                            <input
                                id="confirm-password"
                                type="password"
                                autoComplete="new-password"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                minLength={8}
                                required
                            />
                        </>
                    )}

                    {error && <p role="alert" style={{ color: "red" }}>{error}</p>}
                    {message && <p role="status">{message}</p>}

                    <button type="submit" disabled={loading}>
                        {loading
                            ? "Please wait..."
                            : token
                                ? "Update Password"
                                : "Send Reset Link"}
                    </button>
                </form>

                <p><Link to="/login">← Back to Student Login</Link></p>
            </div>
        </div>
    );
}

export default ResetPassword;
