// src/components/BookingForm.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getUserData } from "../firebase/authService"; // Assuming you already have this
import { useNavigate } from "react-router-dom";

function BookingForm({ programId, programTitle }) {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const uid = localStorage.getItem("userId"); // Or pull from auth state
        if (!uid) return navigate("/login");

        getUserData(uid).then((data) => {
            setUserData(data);
            setLoading(false);
        });
    }, [navigate]);

    const handleBooking = async (e) => {
        e.preventDefault();
        setMessage("");

        const selectedDateTime = new Date(`${date}T${time}`);
        const now = new Date();
        const daysDiff = (selectedDateTime - now) / (1000 * 60 * 60 * 24);

        if (daysDiff < 2) {
            setMessage("⛔ You must book at least 2 days in advance.");
            return;
        }

        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        await addDoc(collection(db, "bookings"), {
            userId: userData.uid,
            programId,
            programTitle,
            requestedDate: Timestamp.fromDate(selectedDateTime),
            userTimeZone,
            status: "pending",
            createdAt: Timestamp.now(),
        });

        setMessage("✅ Booking request sent successfully!");
        setDate("");
        setTime("");
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="card p-4 mt-4">
            <h4>📅 Book Your Session</h4>
            {message && <div className="alert alert-info">{message}</div>}

            <form onSubmit={handleBooking}>
                <input
                    type="date"
                    className="form-control mb-2"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <input
                    type="time"
                    className="form-control mb-3"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
                <button className="btn btn-primary" type="submit">
                    Request Booking
                </button>
            </form>
        </div>
    );
}

export default BookingForm;
