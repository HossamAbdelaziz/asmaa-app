const functions = require("firebase-functions/v2"); // ✅ Use Firebase Functions Gen 2
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

admin.initializeApp(); // ✅ Initialize Firebase Admin SDK

// ✅ Load SendGrid API Key from Firebase Config
const sendGridAPIKey = functions.config().sendgrid.key;
if (!sendGridAPIKey) {
    console.error("❌ SendGrid API key is missing! Check Firebase Config.");
}
sgMail.setApiKey(sendGridAPIKey);

const app = express();
app.use(cors({ origin: true })); // ✅ Enable CORS

/**
 * ✅ Cloud Function to Send a Welcome Email (Gen 2)
 */
app.post("/sendWelcomeEmail", async (req, res) => {
    try {
        const { email, firstName } = req.body;
        if (!email || !firstName) {
            return res.status(400).json({ success: false, error: "Missing email or first name." });
        }

        const msg = {
            to: email,
            from: "asmaa.amr.gadelrab@gmail.com", // ✅ Your verified SendGrid sender email
            subject: "Welcome to Asmaa App!",
            text: `Hello ${firstName}, welcome to Asmaa App!`,
            html: `<h1>Welcome, ${firstName}!</h1><p>We're excited to have you on board. 🎉</p>`,
        };

        await sgMail.send(msg);
        console.log(`✅ Welcome email sent to: ${email}`);
        return res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("❌ Error sending email:", error.message);
        return res.status(500).json({ success: false, error: error.message });
    }
});

/**
 * ✅ Export Function for Firebase (Gen 2)
 */
exports.sendWelcomeEmail = functions.https.onRequest(app); // ✅ Use Gen 2 for better scaling
