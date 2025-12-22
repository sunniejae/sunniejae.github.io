const { CosmosClient } = require("@azure/cosmos");

const client = new CosmosClient({
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY
});
const container = client.database("PortfolioDB").container("comments");

module.exports = async function(context, req) {
    const page = req.body?.page || req.query.page || "/";

    if(req.method === "GET") {
        const query = {
            query: "SELECT * FROM c WHERE c.page=@page AND c.approved=true ORDER BY c.createdAt DESC",
            parameters: [{ name: "@page", value: page }]
        };
        const { resources: comments } = await container.items.query(query).fetchAll();
        context.res = { status: 200, body: comments };
    } else if(req.method === "POST") {
        const { author, text } = req.body;
        if(!text?.trim()) return context.res = { status: 400, body: { error: "Text required" } };

        const newComment = {
            id: Date.now().toString(),
            author: author || "Anonymous",
            text,
            page,
            createdAt: new Date().toISOString(),
            approved: false
        };
        await container.items.create(newComment);
        context.res = { status: 201, body: { message: "Comment submitted for moderation" } };
    } else {
        context.res = { status: 405, body: "Method not allowed" };
    }
};
