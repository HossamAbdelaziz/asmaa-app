import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaHome, FaInfoCircle, FaListAlt, FaSignInAlt, FaUserPlus, FaUserCircle } from "react-icons/fa";
import { logout, checkAuthState, getUserData } from "../firebase/authService";
import avatarDefault from "../assets/avatar-default.png";
import "../styles/Navbar.css";

function Navbar() {
    const { t, i18n } = useTranslation();
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        checkAuthState(async (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                const data = await getUserData(firebaseUser.uid);
                setUserData(data);
            } else {
                setUserData(null);
            }
        });
    }, []);

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    const handleLogout = async () => {
        await logout();
        setUser(null);
        setUserData(null);
    };

    const toggleLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);
    };

    return (
        <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container">
                {/* Brand */}
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src="/logo.png" alt="Asmaa Logo" className="navbar-logo" />
                    <span className="ms-2">Asmaa Gadlerab</span>
                </Link>

                {/* Links */}
                <div className="navbar-nav ms-auto d-flex align-items-center">
                    <Link className="nav-link" to="/">
                        <FaHome className="nav-icon" /> {t("navbar.home")}
                    </Link>
                    <Link className="nav-link" to="/about">
                        <FaInfoCircle className="nav-icon" /> {t("navbar.about")}
                    </Link>
                    <Link className="nav-link" to="/programs">
                        <FaListAlt className="nav-icon" /> {t("navbar.programs")}
                    </Link>

                    {user ? (
                        <div className="nav-profile" onClick={toggleDropdown}>
                            <img src={avatarDefault} alt="User Avatar" className="nav-avatar" />
                            <span className="nav-username">{userData?.firstName || "User"}</span>

                            {showDropdown && (
                                <div className="nav-dropdown">
                                    <Link to="/profile" className="dropdown-item">👤 Profile Settings</Link>
                                    <Link to="/progress" className="dropdown-item">📊 Program Progress</Link>
                                    <Link to="/subscription" className="dropdown-item">💳 My Subscription</Link>
                                    <div className="dropdown-divider" />
                                    <div className="dropdown-item">
                                        🌍 Language:
                                        <button className="btn btn-sm btn-outline-dark ms-2" onClick={() => toggleLanguage("en")}>EN</button>
                                        <button className="btn btn-sm btn-outline-dark ms-2" onClick={() => toggleLanguage("ar")}>AR</button>
                                    </div>
                                    <div className="dropdown-divider" />
                                    <button className="dropdown-item text-danger" onClick={handleLogout}>🚪 Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link className="nav-link btn btn-primary text-white px-3 me-2" to="/login">
                                <FaSignInAlt className="nav-icon" /> {t("navbar.login")}
                            </Link>
                            <Link className="nav-link btn btn-outline-primary px-3" to="/signup">
                                <FaUserPlus className="nav-icon" /> {t("navbar.signup")}
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
