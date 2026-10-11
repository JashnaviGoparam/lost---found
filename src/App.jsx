import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Link
} from "react-router-dom";

import { useState, useEffect } from "react";

import Login from "./pages/login";
import Register from "./pages/register";
import AdminLogin from "./pages/admin-login";
import ResetPassword from "./pages/reset-password";
import { apiRequest } from "./config";

function getLoggedInUser() {
    try {
        return JSON.parse(localStorage.getItem("loggedInUser") || "null");
    } catch (error) {
        console.error("Stored user data is invalid:", error);
        return null;
    }
}

function RequireRole({ role, children }) {
    const user = getLoggedInUser();

    if (!user) {
        return <Navigate to={role === "admin" ? "/admin-login" : "/login"} replace />;
    }

    if (user.role !== role) {
        const destination =
            user.role === "admin"
                ? "/admin-dashboard"
                : user.role === "student"
                    ? "/student-dashboard"
                    : "/login";
        return <Navigate to={destination} replace />;
    }

    return children;
}

/* ==================== STUDENT DASHBOARD ==================== */

function StudentDashboard() {
    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Student Dashboard</h1>
                <p>Welcome to the Lost & Found Portal</p>
            </div>

            <div className="dashboard-cards">
                <Link to="/report-lost" className="dashboard-card">
                    <h2>Report Lost Item</h2>
                    <p>Report an item that you have lost.</p>
                </Link>

                <Link to="/report-found" className="dashboard-card">
                    <h2>Report Found Item</h2>
                    <p>Report an item that you have found.</p>
                </Link>

                <Link to="/search-items" className="dashboard-card">
                    <h2>Search Items</h2>
                    <p>Search for lost and found items.</p>
                </Link>

                <Link to="/my-reports" className="dashboard-card">
                    <h2>My Reports</h2>
                    <p>View your reported items.</p>
                </Link>
            </div>
        </div>
    );
}

/* ==================== REPORT FORM ==================== */

function ReportForm({ type }) {
    const isLost = type === "lost";

    const emptyForm = {
        itemName: "",
        category: "",
        description: "",
        location: "",
        date: "",
        color: "",
        brand: "",
        image: ""
    };

    const [formData, setFormData] = useState(emptyForm);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await apiRequest("/api/items", {
                method: "POST",
                body: JSON.stringify({ ...formData, type })
            });
            alert(
                isLost
                    ? "Lost item reported successfully!"
                    : "Found item reported successfully!"
            );
            setFormData(emptyForm);
        } catch (requestError) {
            console.error("Report submission error:", requestError);
            setError(requestError.message || "Could not save your report.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>
                    {isLost ? "Report Lost Item" : "Report Found Item"}
                </h1>

                <p>Enter the details of the item.</p>

                <form onSubmit={handleSubmit}>
                    <label>Item Name</label>
                    <input
                        name="itemName"
                        type="text"
                        placeholder="Example: Black Wallet"
                        value={formData.itemName}
                        onChange={handleChange}
                        maxLength={100}
                        required
                    />

                    <label>Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Documents">Documents</option>
                        <option value="Wallet">Wallet</option>
                        <option value="Keys">Keys</option>
                        <option value="Books">Books</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Other">Other</option>
                    </select>

                    <label>Description</label>
                    <textarea
                        name="description"
                        placeholder="Describe the item"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        maxLength={10000}
                        required
                    />

                    <label>
                        {isLost ? "Lost Location" : "Found Location"}
                    </label>
                    <input
                        name="location"
                        type="text"
                        placeholder="Example: College Library"
                        value={formData.location}
                        onChange={handleChange}
                        maxLength={150}
                        required
                    />

                    <label>{isLost ? "Date Lost" : "Date Found"}</label>
                    <input
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />

                    <label>Color</label>
                    <input
                        name="color"
                        type="text"
                        placeholder="Example: Black"
                        value={formData.color}
                        onChange={handleChange}
                        maxLength={100}
                    />

                    <label>Brand</label>
                    <input
                        name="brand"
                        type="text"
                        placeholder="Example: Samsung"
                        value={formData.brand}
                        onChange={handleChange}
                        maxLength={100}
                    />

                    <label>Image URL (optional)</label>
                    <input
                        name="image"
                        type="url"
                        placeholder="https://example.com/item-image.jpg"
                        value={formData.image}
                        onChange={handleChange}
                        maxLength={255}
                    />

                    {error && <p role="alert" style={{ color: "red" }}>{error}</p>}

                    <button type="submit" disabled={loading}>
                        {loading
                            ? "Submitting..."
                            : isLost
                                ? "Submit Lost Report"
                                : "Submit Found Report"}
                    </button>
                </form>

                <p>
                    <Link to="/student-dashboard">
                        ← Back to Dashboard
                    </Link>
                </p>
            </div>
        </div>
    );
}

function ReportLost() {
    return <ReportForm type="lost" />;
}

function ReportFound() {
    return <ReportForm type="found" />;
}

/* ==================== SEARCH ITEMS ==================== */

function SearchItems() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        apiRequest("/api/items")
            .then((data) => {
                if (!Array.isArray(data.items)) {
                    throw new Error("The server returned an invalid items response.");
                }
                if (active) {
                    setReports(data.items);
                }
            })
            .catch((loadError) => {
                console.error("Load items error:", loadError);
                if (active) {
                    setError(loadError.message || "Could not load items.");
                }
            })
            .finally(() => {
                if (active) {
                    setLoading(false);
                }
            });

        return () => {
            active = false;
        };
    }, []);

    const [search, setSearch] = useState("");

    const filteredReports = reports.filter((report) => {
        const text = [
            report.itemName,
            report.category,
            report.description,
            report.location,
            report.type
        ]
            .join(" ")
            .toLowerCase();

        return text.includes(search.toLowerCase());
    });

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Search Items</h1>
                <p>Search lost and found items.</p>
            </div>

            <div className="dashboard-card">
                <input
                    type="text"
                    placeholder="Search by item, category, or location"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="dashboard-cards">
                {loading ? (
                    <div className="dashboard-card"><p>Loading items...</p></div>
                ) : error ? (
                    <div className="dashboard-card" role="alert"><p>{error}</p></div>
                ) : filteredReports.length === 0 ? (
                    <div className="dashboard-card">
                        <h2>No Items Available</h2>
                        <p>No matching lost or found items were found.</p>
                    </div>
                ) : (
                    filteredReports.map((report) => (
                        <div className="dashboard-card" key={report.id}>
                            <h2>{report.itemName}</h2>
                            <p><strong>Type:</strong> {report.type}</p>
                            <p><strong>Category:</strong> {report.category}</p>
                            <p><strong>Description:</strong> {report.description}</p>
                            <p><strong>Location:</strong> {report.location}</p>
                            <p><strong>Date:</strong> {report.date}</p>
                            <p><strong>Color:</strong> {report.color || "Not specified"}</p>
                            <p><strong>Brand:</strong> {report.brand || "Not specified"}</p>
                            {report.image && (
                                <p><a href={report.image} target="_blank" rel="noreferrer">View item image</a></p>
                            )}
                            {report.type === "found" && (
                                <p><strong>Status:</strong> Available for Claim</p>
                            )}
                        </div>
                    ))
                )}
            </div>

            <br />
            <Link to="/student-dashboard">← Back to Dashboard</Link>
        </div>
    );
}

/* ==================== MY REPORTS ==================== */

function MyReports() {
    const loggedInUser = getLoggedInUser();
    const [myReports, setMyReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        apiRequest("/api/my-items")
            .then((data) => {
                if (!Array.isArray(data.items)) {
                    throw new Error("The server returned an invalid reports response.");
                }
                if (active) {
                    setMyReports(data.items);
                }
            })
            .catch((loadError) => {
                console.error("Load personal reports error:", loadError);
                if (active) {
                    setError(loadError.message || "Could not load your reports.");
                }
            })
            .finally(() => {
                if (active) {
                    setLoading(false);
                }
            });

        return () => {
            active = false;
        };
    }, []);

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>My Reports</h1>
                <p>View your details and reported items.</p>
            </div>

            {!loggedInUser && (
                <div className="dashboard-card">
                    <p>Please log in to view your reports.</p>
                    <Link to="/login">Go to Login</Link>
                </div>
            )}

            {loggedInUser && (
                <div className="dashboard-card">
                    <h2>My Student Details</h2>
                    <p><strong>Name:</strong> {loggedInUser.name || "Not available"}</p>
                    <p><strong>Email:</strong> {loggedInUser.email || "Not available"}</p>
                    <p>
                        <strong>Roll Number:</strong>{" "}
                        {loggedInUser.rollNumber ||
                            loggedInUser.roll_number ||
                            "Not available"}
                    </p>
                    <p><strong>Phone:</strong> {loggedInUser.phone || "Not available"}</p>
                    <p><strong>Branch:</strong> {loggedInUser.branch || "Not available"}</p>
                </div>
            )}

            <h2>My Reported Items</h2>

            <div className="dashboard-cards">
                {loading ? (
                    <div className="dashboard-card"><p>Loading your reports...</p></div>
                ) : error ? (
                    <div className="dashboard-card" role="alert"><p>{error}</p></div>
                ) : myReports.length === 0 ? (
                    <div className="dashboard-card">
                        <h2>No Reports Yet</h2>
                        <p>You have not submitted any reports.</p>
                    </div>
                ) : (
                    myReports.map((report) => (
                        <div className="dashboard-card" key={report.id}>
                            <h2>{report.itemName}</h2>
                            <p><strong>Report ID:</strong> {report.id}</p>
                            <p><strong>Type:</strong> {report.type}</p>
                            <hr />
                            <h3>Student Details</h3>
                            <p><strong>Name:</strong> {report.userName || loggedInUser?.name || "Not available"}</p>
                            <p><strong>Email:</strong> {report.userEmail || "Not available"}</p>
                            <p><strong>Roll Number:</strong> {report.rollNumber || "Not available"}</p>
                            <p><strong>Phone:</strong> {report.phone || "Not available"}</p>
                            <p><strong>Branch:</strong> {report.branch || "Not available"}</p>
                            <hr />
                            <h3>Item Details</h3>
                            <p><strong>Category:</strong> {report.category}</p>
                            <p><strong>Description:</strong> {report.description}</p>
                            <p><strong>Location:</strong> {report.location}</p>
                            <p><strong>Date:</strong> {report.date}</p>
                            <p><strong>Color:</strong> {report.color || "Not specified"}</p>
                            <p><strong>Brand:</strong> {report.brand || "Not specified"}</p>
                        </div>
                    ))
                )}
            </div>

            <br />
            <Link to="/student-dashboard">← Back to Dashboard</Link>
        </div>
    );
}

/* ==================== ADMIN DASHBOARD ==================== */

function AdminDashboard() {
    const [reports, setReports] = useState([]);
    const [reportsError, setReportsError] = useState("");

    useEffect(() => {
        let active = true;

        apiRequest("/api/items")
            .then((data) => {
                if (!Array.isArray(data.items)) {
                    throw new Error("The server returned an invalid items response.");
                }
                if (active) {
                    setReports(data.items);
                }
            })
            .catch((loadError) => {
                console.error("Admin load items error:", loadError);
                if (active) {
                    setReportsError(loadError.message || "Could not load reports.");
                }
            });

        return () => {
            active = false;
        };
    }, []);

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <p>Lost & Found Portal Administration</p>
            </div>

            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <h2>Total Reports</h2>
                    <p>{reports.length}</p>
                </div>

                <div className="dashboard-card">
                    <h2>Lost Items</h2>
                    <p>{reports.filter((r) => r.type === "lost").length}</p>
                </div>

                <div className="dashboard-card">
                    <h2>Found Items</h2>
                    <p>{reports.filter((r) => r.type === "found").length}</p>
                </div>

                <div className="dashboard-card">
                    <h2>Registered Students</h2>
                    <p>Open Registered Users to view database records.</p>
                    <Link to="/users">View Users</Link>
                </div>
            </div>

            <br />

            <div className="dashboard-cards">
                <Link to="/manage-items" className="dashboard-card">
                    <h2>Manage Items</h2>
                    <p>View and remove lost and found reports.</p>
                </Link>

                <Link to="/users" className="dashboard-card">
                    <h2>Registered Users</h2>
                    <p>View registered student details from the backend.</p>
                </Link>
            </div>

            <h2>All Lost & Found Reports</h2>

            {reportsError && <p role="alert" style={{ color: "red" }}>{reportsError}</p>}

            <div className="dashboard-cards">
                {reports.length === 0 ? (
                    <div className="dashboard-card">
                        <h2>No Reports</h2>
                        <p>No reports are available.</p>
                    </div>
                ) : (
                    reports.map((report) => (
                        <div className="dashboard-card" key={report.id}>
                            <h2>{report.itemName}</h2>
                            <p><strong>Report ID:</strong> {report.id}</p>
                            <p><strong>Type:</strong> {report.type}</p>
                            <p><strong>Status:</strong> Pending</p>
                            <hr />
                            <h3>Student Details</h3>
                            <p><strong>Name:</strong> {report.userName || "Not available"}</p>
                            <p><strong>Email:</strong> {report.userEmail || "Not available"}</p>
                            <p><strong>Roll Number:</strong> {report.rollNumber || "Not available"}</p>
                            <p><strong>Phone:</strong> {report.phone || "Not available"}</p>
                            <p><strong>Branch:</strong> {report.branch || "Not available"}</p>
                            <hr />
                            <h3>Item Details</h3>
                            <p><strong>Category:</strong> {report.category}</p>
                            <p><strong>Description:</strong> {report.description}</p>
                            <p><strong>Location:</strong> {report.location}</p>
                            <p><strong>Date:</strong> {report.date}</p>
                            <p><strong>Color:</strong> {report.color || "Not specified"}</p>
                            <p><strong>Brand:</strong> {report.brand || "Not specified"}</p>
                        </div>
                    ))
                )}
            </div>

            <br />
            <Link to="/admin-dashboard">← Back to Admin Dashboard</Link>
        </div>
    );
}

/* ==================== MANAGE ITEMS ==================== */

function ManageItems() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [removingId, setRemovingId] = useState(null);

    useEffect(() => {
        let active = true;

        apiRequest("/api/items")
            .then((data) => {
                if (!Array.isArray(data.items)) {
                    throw new Error("The server returned an invalid items response.");
                }
                if (active) {
                    setReports(data.items);
                }
            })
            .catch((loadError) => {
                console.error("Manage items load error:", loadError);
                if (active) {
                    setError(loadError.message || "Could not load items.");
                }
            })
            .finally(() => {
                if (active) {
                    setLoading(false);
                }
            });

        return () => {
            active = false;
        };
    }, []);

    const removeReport = async (id) => {
        if (!window.confirm("Are you sure you want to remove this report?")) {
            return;
        }

        setRemovingId(id);
        setError("");
        try {
            await apiRequest(`/api/items/${id}`, { method: "DELETE" });
            setReports((currentReports) =>
                currentReports.filter((report) => report.id !== id)
            );
        } catch (removeError) {
            console.error("Remove item error:", removeError);
            setError(removeError.message || "Could not remove item.");
        } finally {
            setRemovingId(null);
        }
    };

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Manage Items</h1>
                <p>View and remove lost and found reports.</p>
            </div>

            {error && <p role="alert" style={{ color: "red" }}>{error}</p>}

            <div className="dashboard-cards">
                {loading ? (
                    <div className="dashboard-card"><p>Loading items...</p></div>
                ) : reports.length === 0 ? (
                    <div className="dashboard-card">
                        <h2>No Items</h2>
                        <p>No reports are available.</p>
                    </div>
                ) : (
                    reports.map((report) => (
                        <div className="dashboard-card" key={report.id}>
                            <h2>{report.itemName}</h2>
                            <p><strong>Type:</strong> {report.type}</p>
                            <p><strong>Reported By:</strong> {report.userName || "Unknown"}</p>
                            <p><strong>Email:</strong> {report.userEmail || "Not available"}</p>
                            <p><strong>Category:</strong> {report.category}</p>
                            <p><strong>Location:</strong> {report.location}</p>

                            <button
                                onClick={() => removeReport(report.id)}
                                disabled={removingId === report.id}
                            >
                                {removingId === report.id ? "Removing..." : "Remove Item"}
                            </button>
                        </div>
                    ))
                )}
            </div>

            <br />
            <Link to="/admin-dashboard">← Back to Admin Dashboard</Link>
        </div>
    );
}

/* ==================== REGISTERED USERS ==================== */

async function fetchUsers(token) {
    const data = await apiRequest("/api/users", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!Array.isArray(data.users)) {
        throw new Error("The server returned an invalid users response.");
    }

    return data.users;
}

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const refreshUsers = async () => {
        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                throw new Error(
                    "Admin token not found. Please log in again."
                );
            }

            setUsers(await fetchUsers(token));
        } catch (err) {
            console.error("Users API error:", err);
            setError(err.message || "Unable to load users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let active = true;

        const loadUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Admin token not found. Please log in again.");
                }
                const loadedUsers = await fetchUsers(token);
                if (active) {
                    setUsers(loadedUsers);
                }
            } catch (err) {
                console.error("Users API error:", err);
                if (active) {
                    setError(err.message || "Unable to load users.");
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        loadUsers();
        return () => {
            active = false;
        };
    }, []);

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Registered Users</h1>
                <p>Registered student accounts</p>
            </div>

            <div className="dashboard-card">
                <h2>Total Users: {users.length}</h2>

                <button onClick={refreshUsers} disabled={loading}>
                    {loading ? "Loading..." : "Refresh Users"}
                </button>

                {loading && <p>Loading students...</p>}

                {error && (
                    <p style={{ color: "red" }}>{error}</p>
                )}

                {!loading && !error && users.length === 0 && (
                    <p>No registered users found.</p>
                )}

                {!loading && !error && users.length > 0 && (
                    <div style={{ overflowX: "auto" }}>
                        <table
                            style={{
                                width: "100%",
                                marginTop: "20px",
                                borderCollapse: "collapse"
                            }}
                        >
                            <thead>
                                <tr>
                                    <th style={thStyle}>Name</th>
                                    <th style={thStyle}>Roll Number</th>
                                    <th style={thStyle}>Email</th>
                                    <th style={thStyle}>Phone</th>
                                    <th style={thStyle}>Branch</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td style={tdStyle}>{user.name}</td>
                                        <td style={tdStyle}>{user.roll_number || "-"}</td>
                                        <td style={tdStyle}>{user.email}</td>
                                        <td style={tdStyle}>{user.phone || "-"}</td>
                                        <td style={tdStyle}>{user.branch || "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <br />
            <Link to="/admin-dashboard">← Back to Admin Dashboard</Link>
        </div>
    );
}

/* ==================== TABLE STYLES ==================== */

const thStyle = {
    border: "1px solid #ddd",
    padding: "12px",
    background: "#1d4ed8",
    color: "white",
    textAlign: "left"
};

const tdStyle = {
    border: "1px solid #ddd",
    padding: "12px"
};

/* ==================== APP ROUTES ==================== */

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                <Route
                    path="/student-dashboard"
                    element={
                        <RequireRole role="student">
                            <StudentDashboard />
                        </RequireRole>
                    }
                />

                <Route
                    path="/admin-dashboard"
                    element={
                        <RequireRole role="admin">
                            <AdminDashboard />
                        </RequireRole>
                    }
                />

                <Route
                    path="/manage-items"
                    element={
                        <RequireRole role="admin">
                            <ManageItems />
                        </RequireRole>
                    }
                />
                <Route
                    path="/users"
                    element={
                        <RequireRole role="admin">
                            <Users />
                        </RequireRole>
                    }
                />
                <Route
                    path="/report-lost"
                    element={
                        <RequireRole role="student">
                            <ReportLost />
                        </RequireRole>
                    }
                />
                <Route
                    path="/report-found"
                    element={
                        <RequireRole role="student">
                            <ReportFound />
                        </RequireRole>
                    }
                />
                <Route
                    path="/search-items"
                    element={
                        <RequireRole role="student">
                            <SearchItems />
                        </RequireRole>
                    }
                />
                <Route
                    path="/my-reports"
                    element={
                        <RequireRole role="student">
                            <MyReports />
                        </RequireRole>
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;