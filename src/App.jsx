import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Link
} from "react-router-dom";

import { useState } from "react";

import Login from "./pages/login";
import Register from "./pages/register";
import AdminLogin from "./pages/admin-login";


/* =====================================================
   STUDENT DASHBOARD
===================================================== */

function StudentDashboard() {

    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <h1>
                    Student Dashboard
                </h1>

                <p>
                    Welcome to the Lost & Found Portal
                </p>

            </div>


            <div className="dashboard-cards">

                <Link
                    to="/report-lost"
                    className="dashboard-card"
                >

                    <h2>
                        Report Lost Item
                    </h2>

                    <p>
                        Report an item that you have lost.
                    </p>

                </Link>


                <Link
                    to="/report-found"
                    className="dashboard-card"
                >

                    <h2>
                        Report Found Item
                    </h2>

                    <p>
                        Report an item that you have found.
                    </p>

                </Link>


                <Link
                    to="/search-items"
                    className="dashboard-card"
                >

                    <h2>
                        Search Items
                    </h2>

                    <p>
                        Search for lost and found items.
                    </p>

                </Link>


                <Link
                    to="/my-reports"
                    className="dashboard-card"
                >

                    <h2>
                        My Reports
                    </h2>

                    <p>
                        View your reported items.
                    </p>

                </Link>

            </div>

        </div>
    );
}


/* =====================================================
   REPORT LOST ITEM
===================================================== */

function ReportLost() {

    const [formData, setFormData] = useState({

        itemName: "",
        category: "",
        description: "",
        location: "",
        date: "",
        color: "",
        brand: ""

    });


    const handleSubmit = (e) => {

        e.preventDefault();


        const loggedInUser =
            JSON.parse(
                localStorage.getItem("loggedInUser")
            );


        if (!loggedInUser) {

            alert("Please login first!");

            return;
        }


        const existingReports =
            JSON.parse(
                localStorage.getItem("reports")
            ) || [];


        const newReport = {

            id: Date.now(),

            type: "lost",

            /* STUDENT DETAILS */

            userId: loggedInUser.id,

            userName: loggedInUser.name,

            userEmail: loggedInUser.email,

            rollNumber: loggedInUser.rollNumber,

            phone: loggedInUser.phone,

            branch: loggedInUser.branch,

            /* ITEM DETAILS */

            itemName: formData.itemName,

            category: formData.category,

            description: formData.description,

            location: formData.location,

            date: formData.date,

            color: formData.color,

            brand: formData.brand

        };


        localStorage.setItem(
            "reports",
            JSON.stringify([
                ...existingReports,
                newReport
            ])
        );


        alert(
            "Lost item reported successfully!"
        );


        setFormData({

            itemName: "",
            category: "",
            description: "",
            location: "",
            date: "",
            color: "",
            brand: ""

        });

    };


    return (

        <div className="auth-container">

            <div className="auth-card">

                <h1>
                    Report Lost Item
                </h1>

                <p>
                    Enter the details of your lost item.
                </p>


                <form onSubmit={handleSubmit}>

                    <label>
                        Item Name
                    </label>

                    <input
                        type="text"
                        placeholder="Example: Black Wallet"
                        value={formData.itemName}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                itemName: e.target.value
                            })
                        }
                        required
                    />


                    <label>
                        Category
                    </label>

                    <select
                        value={formData.category}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                category: e.target.value
                            })
                        }
                        required
                    >

                        <option value="">
                            Select Category
                        </option>

                        <option>
                            Electronics
                        </option>

                        <option>
                            Documents
                        </option>

                        <option>
                            Wallet
                        </option>

                        <option>
                            Keys
                        </option>

                        <option>
                            Books
                        </option>

                        <option>
                            Accessories
                        </option>

                        <option>
                            Other
                        </option>

                    </select>


                    <label>
                        Description
                    </label>

                    <textarea
                        placeholder="Describe the item"
                        rows="4"
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value
                            })
                        }
                        required
                    ></textarea>


                    <label>
                        Lost Location
                    </label>

                    <input
                        type="text"
                        placeholder="Example: College Library"
                        value={formData.location}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                location: e.target.value
                            })
                        }
                        required
                    />


                    <label>
                        Date Lost
                    </label>

                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                date: e.target.value
                            })
                        }
                        required
                    />


                    <label>
                        Color
                    </label>

                    <input
                        type="text"
                        placeholder="Example: Black"
                        value={formData.color}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                color: e.target.value
                            })
                        }
                    />


                    <label>
                        Brand
                    </label>

                    <input
                        type="text"
                        placeholder="Example: HP"
                        value={formData.brand}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                brand: e.target.value
                            })
                        }
                    />


                    <label>
                        Upload Image
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                    />


                    <button type="submit">
                        Submit Lost Report
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


/* =====================================================
   REPORT FOUND ITEM
===================================================== */

function ReportFound() {

    const [formData, setFormData] = useState({

        itemName: "",
        category: "",
        description: "",
        location: "",
        date: "",
        color: "",
        brand: ""

    });


    const handleSubmit = (e) => {

        e.preventDefault();


        const loggedInUser =
            JSON.parse(
                localStorage.getItem("loggedInUser")
            );


        if (!loggedInUser) {

            alert("Please login first!");

            return;
        }


        const existingReports =
            JSON.parse(
                localStorage.getItem("reports")
            ) || [];


        const newReport = {

            id: Date.now(),

            type: "found",

            /* STUDENT DETAILS */

            userId: loggedInUser.id,

            userName: loggedInUser.name,

            userEmail: loggedInUser.email,

            rollNumber: loggedInUser.rollNumber,

            phone: loggedInUser.phone,

            branch: loggedInUser.branch,

            /* ITEM DETAILS */

            itemName: formData.itemName,

            category: formData.category,

            description: formData.description,

            location: formData.location,

            date: formData.date,

            color: formData.color,

            brand: formData.brand

        };


        localStorage.setItem(
            "reports",
            JSON.stringify([
                ...existingReports,
                newReport
            ])
        );


        alert(
            "Found item reported successfully!"
        );


        setFormData({

            itemName: "",
            category: "",
            description: "",
            location: "",
            date: "",
            color: "",
            brand: ""

        });

    };


    return (

        <div className="auth-container">

            <div className="auth-card">

                <h1>
                    Report Found Item
                </h1>

                <p>
                    Enter the details of the item you found.
                </p>


                <form onSubmit={handleSubmit}>

                    <label>
                        Item Name
                    </label>

                    <input
                        type="text"
                        placeholder="Example: Black Wallet"
                        value={formData.itemName}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                itemName: e.target.value
                            })
                        }
                        required
                    />


                    <label>
                        Category
                    </label>

                    <select
                        value={formData.category}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                category: e.target.value
                            })
                        }
                        required
                    >

                        <option value="">
                            Select Category
                        </option>

                        <option>
                            Electronics
                        </option>

                        <option>
                            Documents
                        </option>

                        <option>
                            Wallet
                        </option>

                        <option>
                            Keys
                        </option>

                        <option>
                            Books
                        </option>

                        <option>
                            Accessories
                        </option>

                        <option>
                            Other
                        </option>

                    </select>


                    <label>
                        Description
                    </label>

                    <textarea
                        placeholder="Describe the item"
                        rows="4"
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value
                            })
                        }
                        required
                    ></textarea>


                    <label>
                        Found Location
                    </label>

                    <input
                        type="text"
                        placeholder="Example: College Canteen"
                        value={formData.location}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                location: e.target.value
                            })
                        }
                        required
                    />


                    <label>
                        Date Found
                    </label>

                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                date: e.target.value
                            })
                        }
                        required
                    />


                    <label>
                        Color
                    </label>

                    <input
                        type="text"
                        placeholder="Example: Black"
                        value={formData.color}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                color: e.target.value
                            })
                        }
                    />


                    <label>
                        Brand
                    </label>

                    <input
                        type="text"
                        placeholder="Example: Samsung"
                        value={formData.brand}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                brand: e.target.value
                            })
                        }
                    />


                    <label>
                        Upload Image
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                    />


                    <button type="submit">
                        Submit Found Report
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


/* =====================================================
   SEARCH ITEMS
===================================================== */

function SearchItems() {

    const [reports] = useState(
        JSON.parse(
            localStorage.getItem("reports")
        ) || []
    );


    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <h1>
                    Search Items
                </h1>

                <p>
                    Search lost and found items.
                </p>

            </div>


            <div className="dashboard-cards">

                {reports.length === 0 ? (

                    <div className="dashboard-card">

                        <h2>
                            No Items Available
                        </h2>

                        <p>
                            No lost or found items have been reported yet.
                        </p>

                    </div>

                ) : (

                    reports.map((report) => (

                        <div
                            className="dashboard-card"
                            key={report.id}
                        >

                            <h2>
                                {report.itemName}
                            </h2>


                            <p>
                                <strong>
                                    Type:
                                </strong>{" "}
                                {report.type}
                            </p>


                            <p>
                                <strong>
                                    Category:
                                </strong>{" "}
                                {report.category}
                            </p>


                            <p>
                                <strong>
                                    Description:
                                </strong>{" "}
                                {report.description}
                            </p>


                            <p>
                                <strong>
                                    Location:
                                </strong>{" "}
                                {report.location}
                            </p>


                            <p>
                                <strong>
                                    Date:
                                </strong>{" "}
                                {report.date}
                            </p>


                            <p>
                                <strong>
                                    Color:
                                </strong>{" "}
                                {report.color ||
                                    "Not specified"}
                            </p>


                            <p>
                                <strong>
                                    Brand:
                                </strong>{" "}
                                {report.brand ||
                                    "Not specified"}
                            </p>


                            {report.type === "found" && (

                                <p>

                                    <strong>
                                        Status:
                                    </strong>{" "}

                                    Found - Available for Claim

                                </p>

                            )}

                        </div>

                    ))

                )}

            </div>


            <br />


            <Link to="/student-dashboard">
                ← Back to Dashboard
            </Link>

        </div>
    );
}


/* =====================================================
   MY REPORTS
===================================================== */

function MyReports() {

    const loggedInUser =
        JSON.parse(
            localStorage.getItem("loggedInUser")
        );


    const allReports =
        JSON.parse(
            localStorage.getItem("reports")
        ) || [];


    /* ONLY CURRENTLY LOGGED-IN STUDENT REPORTS */

    const myReports = allReports.filter(
        (report) =>
            report.userEmail ===
            loggedInUser?.email
    );


    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <h1>
                    My Reports
                </h1>

                <p>
                    View your reported items and your details.
                </p>

            </div>


            {/* CURRENTLY LOGGED-IN STUDENT DETAILS */}

            {loggedInUser && (

                <div className="dashboard-card">

                    <h2>
                        My Student Details
                    </h2>


                    <p>
                        <strong>
                            Name:
                        </strong>{" "}
                        {loggedInUser.name ||
                            "Not available"}
                    </p>


                    <p>
                        <strong>
                            Email:
                        </strong>{" "}
                        {loggedInUser.email ||
                            "Not available"}
                    </p>


                    <p>
                        <strong>
                            Roll Number:
                        </strong>{" "}
                        {loggedInUser.rollNumber ||
                            "Not available"}
                    </p>


                    <p>
                        <strong>
                            Phone:
                        </strong>{" "}
                        {loggedInUser.phone ||
                            "Not available"}
                    </p>


                    <p>
                        <strong>
                            Branch:
                        </strong>{" "}
                        {loggedInUser.branch ||
                            "Not available"}
                    </p>

                </div>

            )}


            <br />


            <div className="dashboard-header">

                <h2>
                    My Reported Items
                </h2>

            </div>


            <div className="dashboard-cards">

                {myReports.length === 0 ? (

                    <div className="dashboard-card">

                        <h2>
                            No Reports Yet
                        </h2>

                        <p>
                            You have not submitted any reports.
                        </p>

                    </div>

                ) : (

                    myReports.map((report) => (

                        <div
                            className="dashboard-card"
                            key={report.id}
                        >

                            <h2>
                                {report.itemName}
                            </h2>


                            <hr />


                            {/* REPORT DETAILS */}

                            <h3>
                                Report Details
                            </h3>


                            <p>
                                <strong>
                                    Report ID:
                                </strong>{" "}
                                {report.id}
                            </p>


                            <p>
                                <strong>
                                    Type:
                                </strong>{" "}
                                {report.type}
                            </p>


                            <hr />


                            {/* STUDENT DETAILS */}

                            <h3>
                                Student Details
                            </h3>


                            <p>
                                <strong>
                                    Name:
                                </strong>{" "}
                                {report.userName ||
                                    loggedInUser?.name ||
                                    "Not available"}
                            </p>


                            <p>
                                <strong>
                                    Email:
                                </strong>{" "}
                                {report.userEmail ||
                                    loggedInUser?.email ||
                                    "Not available"}
                            </p>


                            <p>
                                <strong>
                                    Roll Number:
                                </strong>{" "}
                                {report.rollNumber ||
                                    loggedInUser?.rollNumber ||
                                    "Not available"}
                            </p>


                            <p>
                                <strong>
                                    Phone:
                                </strong>{" "}
                                {report.phone ||
                                    loggedInUser?.phone ||
                                    "Not available"}
                            </p>


                            <p>
                                <strong>
                                    Branch:
                                </strong>{" "}
                                {report.branch ||
                                    loggedInUser?.branch ||
                                    "Not available"}
                            </p>


                            <hr />


                            {/* ITEM DETAILS */}

                            <h3>
                                Item Details
                            </h3>


                            <p>
                                <strong>
                                    Item Name:
                                </strong>{" "}
                                {report.itemName}
                            </p>


                            <p>
                                <strong>
                                    Category:
                                </strong>{" "}
                                {report.category}
                            </p>


                            <p>
                                <strong>
                                    Description:
                                </strong>{" "}
                                {report.description}
                            </p>


                            <p>
                                <strong>
                                    Location:
                                </strong>{" "}
                                {report.location}
                            </p>


                            <p>
                                <strong>
                                    Date:
                                </strong>{" "}
                                {report.date}
                            </p>


                            <p>
                                <strong>
                                    Color:
                                </strong>{" "}
                                {report.color ||
                                    "Not specified"}
                            </p>


                            <p>
                                <strong>
                                    Brand:
                                </strong>{" "}
                                {report.brand ||
                                    "Not specified"}
                            </p>


                            {report.type === "found" && (

                                <p>

                                    <strong>
                                        Status:
                                    </strong>{" "}

                                    Found - Available for Claim

                                </p>

                            )}

                        </div>

                    ))

                )}

            </div>


            <br />


            <Link to="/student-dashboard">
                ← Back to Dashboard
            </Link>

        </div>
    );
}


/* =====================================================
   ADMIN DASHBOARD
===================================================== */

function AdminDashboard() {

    const [reports] = useState(
        JSON.parse(
            localStorage.getItem("reports")
        ) || []
    );


    const users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <h1>
                    Admin Dashboard
                </h1>

                <p>
                    Complete Lost & Found Portal Administration
                </p>

            </div>


            {/* SUMMARY CARDS */}

            <div className="dashboard-cards">

                <div className="dashboard-card">

                    <h2>
                        Total Reports
                    </h2>

                    <p>
                        {reports.length}
                    </p>

                </div>


                <div className="dashboard-card">

                    <h2>
                        Lost Items
                    </h2>

                    <p>

                        {
                            reports.filter(
                                (report) =>
                                    report.type === "lost"
                            ).length
                        }

                    </p>

                </div>


                <div className="dashboard-card">

                    <h2>
                        Found Items
                    </h2>

                    <p>

                        {
                            reports.filter(
                                (report) =>
                                    report.type === "found"
                            ).length
                        }

                    </p>

                </div>


                <div className="dashboard-card">

                    <h2>
                        Registered Students
                    </h2>

                    <p>
                        {users.length}
                    </p>

                </div>

            </div>


            <br />


            {/* ADMIN ACTIONS */}

            <div className="dashboard-cards">

                <Link
                    to="/manage-items"
                    className="dashboard-card"
                >

                    <h2>
                        Manage Items
                    </h2>

                    <p>
                        Manage all lost and found reports.
                    </p>

                </Link>


                <Link
                    to="/users"
                    className="dashboard-card"
                >

                    <h2>
                        Registered Users
                    </h2>

                    <p>
                        View registered student details.
                    </p>

                </Link>

            </div>


            <br />


            {/* ALL REPORTS */}

            <div className="dashboard-header">

                <h2>
                    All Lost & Found Reports
                </h2>

                <p>
                    Admin can view complete details of every report.
                </p>

            </div>


            <div className="dashboard-cards">

                {reports.length === 0 ? (

                    <div className="dashboard-card">

                        <h2>
                            No Reports
                        </h2>

                        <p>
                            No reports are available.
                        </p>

                    </div>

                ) : (

                    reports.map((report) => (

                        <div
                            className="dashboard-card"
                            key={report.id}
                        >

                            <h2>
                                {report.itemName}
                            </h2>


                            <hr />


                            {/* REPORT DETAILS */}

                            <h3>
                                Report Details
                            </h3>


                            <p>
                                <strong>
                                    Report ID:
                                </strong>{" "}
                                {report.id}
                            </p>


                            <p>
                                <strong>
                                    Type:
                                </strong>{" "}
                                {report.type}
                            </p>


                            <p>
                                <strong>
                                    Status:
                                </strong>{" "}
                                Pending
                            </p>


                            <p>
                                <strong>
                                    Verification:
                                </strong>{" "}
                                Pending
                            </p>


                            <hr />


                            {/* STUDENT DETAILS */}

                            <h3>
                                Student Details
                            </h3>


                            <p>
                                <strong>
                                    Student Name:
                                </strong>{" "}
                                {report.userName ||
                                    "Not available"}
                            </p>


                            <p>
                                <strong>
                                    Email:
                                </strong>{" "}
                                {report.userEmail ||
                                    "Not available"}
                            </p>


                            <p>
                                <strong>
                                    Roll Number:
                                </strong>{" "}
                                {report.rollNumber ||
                                    "Not available"}
                            </p>


                            <p>
                                <strong>
                                    Phone:
                                </strong>{" "}
                                {report.phone ||
                                    "Not available"}
                            </p>


                            <p>
                                <strong>
                                    Branch:
                                </strong>{" "}
                                {report.branch ||
                                    "Not available"}
                            </p>


                            <hr />


                            {/* ITEM DETAILS */}

                            <h3>
                                Item Details
                            </h3>


                            <p>
                                <strong>
                                    Item Name:
                                </strong>{" "}
                                {report.itemName}
                            </p>


                            <p>
                                <strong>
                                    Category:
                                </strong>{" "}
                                {report.category}
                            </p>


                            <p>
                                <strong>
                                    Description:
                                </strong>{" "}
                                {report.description}
                            </p>


                            <p>
                                <strong>
                                    Location:
                                </strong>{" "}
                                {report.location}
                            </p>


                            <p>
                                <strong>
                                    Date:
                                </strong>{" "}
                                {report.date}
                            </p>


                            <p>
                                <strong>
                                    Color:
                                </strong>{" "}
                                {report.color ||
                                    "Not specified"}
                            </p>


                            <p>
                                <strong>
                                    Brand:
                                </strong>{" "}
                                {report.brand ||
                                    "Not specified"}
                            </p>

                        </div>

                    ))

                )}

            </div>


            <br />


            <Link to="/student-dashboard">
                ← Back to Student Dashboard
            </Link>

        </div>
    );
}


/* =====================================================
   MANAGE ITEMS
===================================================== */

function ManageItems() {

    const [reports, setReports] = useState(
        JSON.parse(
            localStorage.getItem("reports")
        ) || []
    );


    const removeReport = (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to remove this report?"
            );


        if (!confirmDelete) {
            return;
        }


        const updatedReports =
            reports.filter(
                (report) =>
                    report.id !== id
            );


        localStorage.setItem(
            "reports",
            JSON.stringify(updatedReports)
        );


        setReports(updatedReports);


        alert(
            "Report removed successfully!"
        );

    };


    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <h1>
                    Manage Items
                </h1>

                <p>
                    View and remove lost and found reports.
                </p>

            </div>


            <div className="dashboard-cards">

                {reports.length === 0 ? (

                    <div className="dashboard-card">

                        <h2>
                            No Items
                        </h2>

                        <p>
                            No reports are available.
                        </p>

                    </div>

                ) : (

                    reports.map((report) => (

                        <div
                            className="dashboard-card"
                            key={report.id}
                        >

                            <h2>
                                {report.itemName}
                            </h2>


                            <p>
                                <strong>
                                    Type:
                                </strong>{" "}
                                {report.type}
                            </p>


                            <p>
                                <strong>
                                    Reported By:
                                </strong>{" "}
                                {report.userName ||
                                    "Unknown"}
                            </p>


                            <p>
                                <strong>
                                    Email:
                                </strong>{" "}
                                {report.userEmail ||
                                    "Not available"}
                            </p>


                            <p>
                                <strong>
                                    Category:
                                </strong>{" "}
                                {report.category}
                            </p>


                            <p>
                                <strong>
                                    Location:
                                </strong>{" "}
                                {report.location}
                            </p>


                            <button
                                onClick={() =>
                                    removeReport(
                                        report.id
                                    )
                                }
                            >
                                Remove Item
                            </button>

                        </div>

                    ))

                )}

            </div>


            <br />


            <Link to="/admin-dashboard">
                ← Back to Admin Dashboard
            </Link>

        </div>
    );
}


/* =====================================================
   USERS
===================================================== */

function Users() {

    const [users, setUsers] = useState(() => {

        return (
            JSON.parse(
                localStorage.getItem("users")
            ) || []
        );

    });


    const refreshUsers = () => {

        const registeredUsers =
            JSON.parse(
                localStorage.getItem("users")
            ) || [];


        setUsers(registeredUsers);

    };


    return (

        <div className="dashboard">

            <div className="dashboard-header">

                <h1>
                    Registered Users
                </h1>

                <p>
                    Registered student accounts
                </p>

            </div>


            <div className="dashboard-card">

                <h2>
                    Total Users: {users.length}
                </h2>


                <button
                    onClick={refreshUsers}
                >
                    Refresh Users
                </button>


                {users.length === 0 ? (

                    <p>
                        No registered users found.
                    </p>

                ) : (

                    <table
                        style={{
                            width: "100%",
                            marginTop: "20px",
                            borderCollapse: "collapse"
                        }}
                    >

                        <thead>

                            <tr>

                                <th style={thStyle}>
                                    Name
                                </th>

                                <th style={thStyle}>
                                    Email
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {users.map((user) => (

                                <tr key={user.id}>

                                    <td style={tdStyle}>
                                        {user.name}
                                    </td>

                                    <td style={tdStyle}>
                                        {user.email}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>


            <br />


            <Link to="/admin-dashboard">
                ← Back to Admin Dashboard
            </Link>

        </div>
    );
}


/* =====================================================
   TABLE STYLES
===================================================== */

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


/* =====================================================
   APP ROUTES
===================================================== */

function App() {

    return (

        <BrowserRouter>

            <Routes>


                <Route
                    path="/"
                    element={
                        <Navigate to="/login" />
                    }
                />


                <Route
                    path="/login"
                    element={<Login />}
                />


                <Route
                    path="/register"
                    element={<Register />}
                />


                <Route
                    path="/admin-login"
                    element={<AdminLogin />}
                />


                <Route
                    path="/student-dashboard"
                    element={
                        <StudentDashboard />
                    }
                />


                <Route
                    path="/admin-dashboard"
                    element={
                        <AdminDashboard />
                    }
                />


                <Route
                    path="/manage-items"
                    element={
                        <ManageItems />
                    }
                />


                <Route
                    path="/users"
                    element={
                        <Users />
                    }
                />


                <Route
                    path="/report-lost"
                    element={
                        <ReportLost />
                    }
                />


                <Route
                    path="/report-found"
                    element={
                        <ReportFound />
                    }
                />


                <Route
                    path="/search-items"
                    element={
                        <SearchItems />
                    }
                />


                <Route
                    path="/my-reports"
                    element={
                        <MyReports />
                    }
                />


            </Routes>

        </BrowserRouter>
    );
}


export default App;