const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const WISHLIST_FILE = path.join(__dirname, "wishlist.json");

function readWishlist() {
    try { return JSON.parse(fs.readFileSync(WISHLIST_FILE, "utf8")); } 
    catch { return []; }
}

function saveWishlist(item) {
    const wishlist = readWishlist();
    wishlist.push(item);
    fs.writeFileSync(WISHLIST_FILE, JSON.stringify(wishlist, null, 2));
}

module.exports = async function(context, req) {
    const { name, email, products, userId } = req.body;
    if(!name || !email || !products?.length) return context.res = { status: 400, body: { error: "Missing fields" } };

    saveWishlist({ userId, name, email, products, createdAt: new Date().toISOString() });

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASS }
    });

    const mailOptions = {
        from: `"Wishlist App" <${process.env.GMAIL_USER}>`,
        to: "orders@sunniejae.com",
        subject: `New Wishlist from ${name} (${email})`,
        text: `User Name: ${name}\nUser Email: ${email}\nWishlist Items:\n- ${products.join("\n- ")}`
    };

    try {
        await transporter.sendMail(mailOptions);
        context.res = { status: 200, body: { message: "Wishlist saved and emailed successfully" } };
    } catch(err) {
        context.log("Email error:", err);
        context.res = { status: 500, body: { error: "Failed to send email" } };
    }
};
