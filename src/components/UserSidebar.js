import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaChartLine, FaCreditCard, FaCalendarAlt, FaWhatsapp, FaSignOutAlt } from "react-icons/fa";
import "../styles/Sidebar.css"; // We'll create this next

function UserSidebar() {
    return (
        <div className="sidebar">
            <h3 className="sidebar-title">My Dashboard</h3>
            <ul className="sidebar-list">
                <li><Link to="/dashboard/profile"><FaUser /> Profile</Link></li>
                <li><Link to="/dashboard/progress"><FaChartLine /> Progress</Link></li>
                <li><Link to="/dashboard/subscription"><FaCreditCard /> Subscription</Link></li>
                <li><Link to="/dashboard/sessions"><FaCalendarAlt /> Sessions</Link></li>
                <li><Link to="/dashboard/followup"><FaWhatsapp /> Follow-Up</Link></li>
                <li><Link to="/" onClick={() => window.location.reload()}><FaSignOutAlt /> Logout</Link></li>
            </ul>
        </div>
    );
}

export default UserSidebar;
