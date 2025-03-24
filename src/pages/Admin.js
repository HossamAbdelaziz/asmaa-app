import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAdminAuthState } from "../firebase/authService";

function Admin() {
    const [admin, setAdmin] = useState(null); // Store admin user
    const [loading, setLoading] = useState(true); // Track loading state
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true; // 🔒 Prevent state update if component unmounted

        checkAdminAuthState((adminUser) => {
            if (!adminUser) {
                console.warn("🚫 Unauthorized access. Redirecting...");
                navigate("/admin-login");
            } else if (isMounted) {
                setAdmin(adminUser);
                setLoading(false);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [navigate]);

    if (loading) return <h2>Checking admin access...</h2>;

    return (
        <div>
            <h1>Welcome Admin</h1>
            <p>✅ You are authorized to see this page</p>
        </div>
    );
}

export default Admin;
