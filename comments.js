const API_URL = "https://YOUR-FUNCTION-NAME.azurewebsites.net/api/comments";

async function loadComments() {
  const res = await fetch(`${API_URL}?postId=project-one`);
  const comments = await res.json();

  const container = document.getElementById("comments");
  container.innerHTML = "";

  comments.forEach(c => {
    const div = document.createElement("div");
    div.innerText = `${c.anonymous ? "Anonymous" : c.username}: ${c.text}`;
    container.appendChild(div);
  });
}

document.getElementById("commentForm").addEventListener("submit", async e => {
  e.preventDefault();

  const text = document.getElementById("commentText").value;
  const anonymous = document.getElementById("anonymous").checked;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      postId: "project-one",
      text,
      anonymous
    })
  });

  loadComments();
});

loadComments();
