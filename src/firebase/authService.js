import { auth, db } from "./firebaseConfig"; // Import Firebase authentication & Firestore
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendEmailVerification,
    reload,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Firestore operations

/* =============================== */
/* ✅ User Signup - Register New User */
/* =============================== */
export const signUp = async (email, password, firstName, lastName, country, phone) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            firstName,
            lastName,
            email,
            country,
            phone,
            isAdmin: false,
            createdAt: new Date(),
        });

        await sendEmailVerification(user);
        console.log("✅ Verification email sent to", email);

        await signOut(auth);

        return {
            success: true,
            message: "Account created. Please check your email and verify before logging in.",
        };
    } catch (error) {
        console.error("❌ Signup Error:", error.message);
        throw error;
    }
};

/* =============================== */
/* ✅ User Login - Authenticate Regular Users */
/* =============================== */
export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await reload(user);

        if (!user.emailVerified) {
            await signOut(auth);
            throw new Error("❌ Please verify your email address before logging in.");
        }

        return user;
    } catch (error) {
        console.error("❌ Login Error:", error.message);
        throw error;
    }
};

/* =============================== */
/* ✅ Admin Login - Separate Authentication for Admins */
/* =============================== */
export const adminLogin = async (email, password) => {
    try {
        const adminRef = doc(db, "admins", email.toLowerCase());
        const adminSnap = await getDoc(adminRef);

        if (!adminSnap.exists()) {
            throw new Error("❌ Unauthorized: Not an Admin");
        }

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("✅ Admin Logged In:", user.email);
        return user;
    } catch (error) {
        console.error("❌ Admin Login Error:", error.message);
        throw error;
    }
};

/* =============================== */
/* ✅ Logout Function - Sign Out Any User */
/* =============================== */
export const logout = async () => {
    try {
        await signOut(auth);
        console.log("✅ User logged out successfully");
    } catch (error) {
        console.error("❌ Logout Error:", error.message);
    }
};

/* =============================== */
/* ✅ Check User Role (Admin or Not) */
/* =============================== */
export const checkUserRole = async (userId) => {
    try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            console.log("🔹 User Data:", userData);
            return userData.isAdmin || false;
        }
        return false;
    } catch (error) {
        console.error("❌ Error checking user role:", error.message);
        return false;
    }
};

/* =============================== */
/* ✅ Fetch Full User Data from Firestore */
/* =============================== */
export const getUserData = async (userId) => {
    try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            return userSnap.data();
        }
        return null;
    } catch (error) {
        console.error("❌ Failed to get user data:", error.message);
        return null;
    }
};

/* =============================== */
/* ✅ Auth State Listener - Track User Login Status */
/* =============================== */
export const checkAuthState = (callback) => {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
};

/* =============================== */
/* ✅ Admin State Listener - Track Admin Login Status */
/* =============================== */
export const checkAdminAuthState = (callback) => {
    onAuthStateChanged(auth, async (user) => {
        if (!user) {
            callback(null);
            return;
        }

        const adminRef = doc(db, "admins", user.email);
        const adminSnap = await getDoc(adminRef);

        if (adminSnap.exists()) {
            console.log("✅ Admin Authenticated:", user.email);
            callback(user);
        } else {
            console.warn("❌ Unauthorized Admin Attempt:", user.email);
            callback(null);
        }
    });
};
