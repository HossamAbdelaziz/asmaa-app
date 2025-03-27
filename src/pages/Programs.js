// src/pages/Programs.js
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "../styles/Programs.css"; // optional for custom styles

function Programs() {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrograms = async () => {
            const snapshot = await getDocs(collection(db, "programs"));
            const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setPrograms(list);
            setLoading(false);
        };

        fetchPrograms();
    }, []);

    if (loading) return <h2 className="text-center mt-5">Loading programs...</h2>;

    return (
        <div className="container py-5">
            <h2 className="mb-4 text-center">Our Programs</h2>
            <div className="row">
                {programs.map((program) => (
                    <div key={program.id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            {program.image && (
                                <img
                                    src={program.image}
                                    alt={program.title}
                                    className="card-img-top"
                                    style={{ maxHeight: "200px", objectFit: "cover" }}
                                />
                            )}
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{program.title}</h5>
                                <p className="card-text">{program.description}</p>
                                <p className="card-text">
                                    <small>Duration: {program.duration} days</small><br />
                                    <small>Price: ${program.price}</small>
                                </p>
                                <button className="btn btn-outline-primary mt-auto">Learn More</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Programs;
