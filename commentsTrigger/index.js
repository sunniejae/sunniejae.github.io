const fs = require("fs");
const path = require("path");
const COMMENTS_FILE = path.join(__dirname, "comments.json");

function readComments() {
    try {
        return JSON.parse(fs.readFileSync(COMMENTS_FILE, "utf8"));
    } catch { return []; }
}

function saveComments(comment) {
    const comments = readComments();
    comments.push(comment);
    fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 2));
}

module.exports = async function(context, req) {
    const page = req.body?.page || req.query.page || "/";

    if(req.method === "GET") {
        const comments = readComments().filter(c => c.page === page && c.approved);
        context.res = { status: 200, body: comments };
    } else if(req.method === "POST") {
        const { author, text } = req.body;
        if(!text?.trim()) return context.res = { status: 400, body: { error: "Text required" } };
        const newComment = { author: author||"Anonymous", text, page, createdAt: new Date().toISOString(), approved: false };
        saveComments(newComment);
        context.res = { status: 201, body: { message: "Comment submitted for moderation" } };
    } else {
        context.res = { status: 405, body: "Method not allowed" };
    }
};
