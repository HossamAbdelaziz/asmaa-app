import React, { useEffect, useState } from "react";
import { getUserData, checkAuthState } from "../firebase/authService";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css"; // You can create a CSS file for styling

function UserDashboard() {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuthState(async (currentUser) => {
            if (!currentUser) {
                navigate("/login");
            } else {
                setUser(currentUser);
                const data = await getUserData(currentUser.uid);
                setUserData(data);
                setLoading(false);
            }
        });
    }, [navigate]);

    if (loading) return <h2 className="text-center mt-5">Loading Dashboard...</h2>;

    return (
        <div className="dashboard container py-4">
            <h2 className="mb-4">👋 Welcome, {userData?.firstName}!</h2>

            {/* ✅ Profile Overview */}
            <div className="card mb-4 p-3">
                <h4>👤 Profile Info</h4>
                <p><strong>Name:</strong> {userData?.firstName} {userData?.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Country:</strong> {userData?.country}</p>
                <p><strong>Phone:</strong> {userData?.phone}</p>
            </div>

            {/* ✅ Program Progress */}
            <div className="card mb-4 p-3">
                <h4>📈 Program Progress</h4>
                <p>You're currently enrolled in <strong>“Healing Confidence”</strong></p>
                <div className="progress">
                    <div className="progress-bar" style={{ width: "40%" }}>Day 4 of 10</div>
                </div>
                <button className="btn btn-outline-primary mt-2">View Program Details</button>
            </div>

            {/* ✅ Subscription Info */}
            <div className="card mb-4 p-3">
                <h4>💳 Subscription</h4>
                <p>You are subscribed to the <strong>Monthly Support Plan</strong>.</p>
                <p>Start Date: March 1, 2025</p>
                <p>End Date: March 30, 2025</p>
                <button className="btn btn-outline-secondary">Manage Subscription</button>
            </div>

            {/* ✅ Upcoming Zoom Sessions */}
            <div className="card mb-4 p-3">
                <h4>📅 Upcoming Sessions</h4>
                <ul>
                    <li>🗓️ Wednesday, March 27 @ 7:00 PM</li>
                    <li>🗓️ Saturday, March 30 @ 1:00 PM</li>
                </ul>
                <button className="btn btn-success mt-2">Join Today's Session</button>
            </div>

            {/* ✅ Follow-up Reminder */}
            <div className="card p-3">
                <h4>💬 Daily Follow-Up</h4>
                <p>Your daily follow-up is done through WhatsApp for now.</p>
                <a className="btn btn-success" href="https://wa.me/16476557623" target="_blank" rel="noopener noreferrer">Open WhatsApp</a>
            </div>
        </div>
    );
}

export default UserDashboard;
