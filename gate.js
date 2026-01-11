const STORED_HASH =
  "cdb59ac48dc26ea4f7d9b448777a6032754d77da15bf580ac3f55788b3ea577d";

async function sha256(text) {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text)
  );
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function unlock() {
  const input = document.getElementById("password").value;
  const hash = await sha256(input);

  if (hash === STORED_HASH) {
    localStorage.setItem("sunniejae_access", "granted");
    document.getElementById("gate").style.display = "none";
    document.getElementById("content").style.display = "block";
  } else {
    alert("Incorrect password");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("sunniejae_access") === "granted") {
    document.getElementById("gate").style.display = "none";
    document.getElementById("content").style.display = "block";
  }
});
