function fetchComments() {
    fetch("https://<your-function-app>.azurewebsites.net/api/commentsTrigger")
        .then(r=>r.json())
        .then(data=>{
            document.getElementById("commentsList").innerHTML = data.map(c=>`<p><b>${c.author}:</b> ${c.text}</p>`).join("");
        });
}

function postComment() {
    const author = document.getElementById("author").value;
    const text = document.getElementById("commentText").value;
    fetch("https://<your-function-app>.azurewebsites.net/api/commentsTrigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, text, page: "/" })
    }).then(()=>fetchComments());
}

function sendWishlist() {
    const name = document.getElementById("userName").value;
    const email = document.getElementById("userEmail").value;
    const products = document.getElementById("wishlistItems").value.split(",").map(p=>p.trim());
    fetch("https://<your-function-app>.azurewebsites.net/api/wishlistTrigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, products, userId: email })
    }).then(r=>r.json()).then(data=>alert(data.message));
}

fetchComments();
