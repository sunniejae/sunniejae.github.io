const { CosmosClient } = require("@azure/cosmos");
const nodemailer = require("nodemailer");

const client = new CosmosClient({
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY
});
const container = client.database("PortfolioDB").container("wishlist");

module.exports = async function(context, req) {
    const { name, email, products, userId } = req.body;

    if(!name || !email || !products?.length) {
        return context.res = { status: 400, body: { error: "Missing required fields" } };
    }

    for(const product of products) {
        await container.items.upsert({
            id: `${userId}-${product}`,
            userId,
            productId: product,
            name,
            email,
            addedAt: new Date().toISOString()
        });
    }

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
