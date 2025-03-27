// src/pages/UserDashboard.js
import React, { useEffect, useState } from "react";
import { getUserData, checkAuthState } from "../firebase/authService";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/UserSidebar";
import "../styles/Dashboard.css";
import BookingForm from "../components/BookingForm";

function UserDashboard() {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quote, setQuote] = useState("");
    const navigate = useNavigate();

    // ✅ Check Auth and Load User Data
    useEffect(() => {
        const unsubscribe = checkAuthState((currentUser) => {
            if (!currentUser) {
                navigate("/login");
            } else {
                setUser(currentUser);
                getUserData(currentUser.uid).then((data) => {
                    setUserData(data);
                    setLoading(false);
                    console.log("✅ User is authenticated");
                });
            }
        });

        return () => unsubscribe(); // clean up listener
    }, [navigate]);

    // ✅ Redirect if not logged in after loading
    useEffect(() => {
        if (!loading && !user) {
            console.log("⛔ No user detected. Redirecting to login.");

            navigate("/login");
        }
    }, [loading, user, navigate]);

    // ✅ Random inspirational quote
    useEffect(() => {
        const quotes = [
            "Every step forward is a step toward healing.",
            "You are stronger than you think.",
            "Small progress is still progress.",
            "Your journey is your power.",
            "Healing begins the moment you decide to grow."
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(randomQuote);
    }, []);

    if (loading) return <h2 className="text-center mt-5">Loading Dashboard...</h2>;

    return (
        <div className="d-flex">
            {user && <Sidebar />}

            <main className="dashboard container-fluid py-4" style={{ marginLeft: user ? "200px" : "0", paddingTop: "80px" }}>
                <header className="mb-4">
                    <h2>👋 Welcome, {userData?.firstName}!</h2>
                </header>

                {/* ✨ Daily Quote Section */}
                <section className="card mb-4 p-4 text-center bg-light border-start border-5 border-primary">
                    <blockquote className="blockquote mb-0">
                        <p className="mb-1">“{quote}”</p>
                        <footer className="blockquote-footer">Asmaa App</footer>
                    </blockquote>
                </section>

                {/* ✅ Program Progress */}
                <section className="card mb-4 p-3">
                    <h4>📈 Program Progress</h4>
                    <p>You're currently enrolled in <strong>“Healing Confidence”</strong></p>
                    <progress className="form-range w-100" value="4" max="10"></progress>
                    <small className="text-muted">Day 4 of 10</small><br />
                    <button className="btn btn-outline-primary mt-2">View Program Details</button>
                </section>

                {/* ✅ Subscription Info + Booking */}
                <section className="card mb-4 p-3">
                    <h4>💳 Subscription</h4>
                    <p>You are subscribed to the <strong>Monthly Support Plan</strong>.</p>
                    <p>Start Date: March 1, 2025</p>
                    <p>End Date: March 30, 2025</p>
                    <button className="btn btn-outline-secondary">Manage Subscription</button>
                    <BookingForm programId="program1" programTitle="Healing Confidence" />
                </section>

                {/* ✅ Upcoming Zoom Sessions */}
                <section className="card mb-4 p-3">
                    <h4>📅 Upcoming Sessions</h4>
                    <ul className="list-unstyled">
                        <li>🗓️ Wednesday, March 27 @ 7:00 PM</li>
                        <li>🗓️ Saturday, March 30 @ 1:00 PM</li>
                    </ul>
                    <button className="btn btn-success mt-2">Join Today's Session</button>
                </section>

                {/* ✅ Follow-up Reminder */}
                <section className="card p-3">
                    <h4>💬 Daily Follow-Up</h4>
                    <p>Your daily follow-up is done through WhatsApp for now.</p>
                    <a className="btn btn-success" href="https://wa.me/16476557623" target="_blank" rel="noopener noreferrer">
                        Open WhatsApp
                    </a>
                </section>
            </main>
        </div>
    );
}

export default UserDashboard;
