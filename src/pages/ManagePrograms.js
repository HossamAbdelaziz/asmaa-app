// src/pages/ManagePrograms.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import {
    collection,
    getDocs,
    setDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { checkAdminAuthState } from "../firebase/authService";

function ManagePrograms() {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        title: "",
        description: "",
        duration: "",
        price: "",
        image: "",
    });
    const [editingId, setEditingId] = useState(null);
    const navigate = useNavigate();

    // ✅ Protect Route
    useEffect(() => {
        checkAdminAuthState((adminUser) => {
            if (!adminUser) {
                navigate("/admin-login");
            } else {
                fetchPrograms();
                setLoading(false);
            }
        });
    }, [navigate]);

    // ✅ Fetch programs from Firestore
    const fetchPrograms = async () => {
        const snapshot = await getDocs(collection(db, "programs"));
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPrograms(list);
    };

    // ✅ Handle Input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // ✅ Save Program to Fixed Document
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            isActive: true,
            duration: parseInt(form.duration),
            price: parseFloat(form.price),
        };

        const id = editingId || `program${programs.length + 1}`;
        await setDoc(doc(db, "programs", id), payload);

        setForm({ title: "", description: "", duration: "", price: "", image: "" });
        setEditingId(null);
        fetchPrograms();
    };

    // ✅ Delete
    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "programs", id));
        fetchPrograms();
    };

    if (loading) return <h2 className="text-center mt-5">Checking Admin Access...</h2>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4">📋 Manage Programs</h2>

            {/* Form */}
            <form className="card p-4 mb-4" onSubmit={handleSubmit}>
                <h5>{editingId ? "Edit Program" : "Add New Program"}</h5>
                <input
                    name="title"
                    className="form-control mb-2"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    className="form-control mb-2"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    required
                />
                <input
                    name="duration"
                    className="form-control mb-2"
                    type="number"
                    placeholder="Duration (days)"
                    value={form.duration}
                    onChange={handleChange}
                    required
                />
                <input
                    name="price"
                    className="form-control mb-2"
                    type="number"
                    placeholder="Price ($)"
                    value={form.price}
                    onChange={handleChange}
                    required
                />
                <input
                    name="image"
                    className="form-control mb-2"
                    type="text"
                    placeholder="Image URL (https://...)"
                    value={form.image}
                    onChange={handleChange}
                />
                <div className="d-flex justify-content-between">
                    <button className="btn btn-success" type="submit">
                        {editingId ? "Update Program" : "Save Program"}
                    </button>
                    {editingId && (
                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={() => {
                                setEditingId(null);
                                setForm({ title: "", description: "", duration: "", price: "", image: "" });
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* List */}
            <div className="list-group">
                {programs.map((p) => (
                    <div
                        key={p.id}
                        className="list-group-item d-flex justify-content-between align-items-start"
                    >
                        <div>
                            <h5>{p.title}</h5>
                            <p className="mb-1">{p.description}</p>
                            {p.image && (
                                <img
                                    src={p.image}
                                    alt={p.title}
                                    style={{ maxWidth: "150px", height: "auto" }}
                                    className="mb-2"
                                />
                            )}
                            <small>
                                Duration: {p.duration} days | Price: ${p.price}
                            </small>
                        </div>
                        <div>
                            <button
                                className="btn btn-primary me-2"
                                onClick={() => {
                                    setEditingId(p.id);
                                    setForm({
                                        title: p.title,
                                        description: p.description,
                                        duration: p.duration,
                                        price: p.price,
                                        image: p.image || "",
                                    });
                                }}
                            >
                                Edit
                            </button>
                            <button className="btn btn-danger" onClick={() => handleDelete(p.id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManagePrograms;
