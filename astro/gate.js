// === PASSWORD HASH (SHA-256) ===
// Generate a new hash in the browser console if you change the password
const STORED_HASH =
  "81c4d66f638dcab2657a7544fab9ae6dd226c1e8d1de463e0d7a60893327dc45";

// Session storage key
const STORAGE_KEY = "sunniejae_unlocked";

// Auto-unlock if already authenticated in this session
document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem(STORAGE_KEY) === "true") {
    unlockPage();
  }
});

// Called when user clicks "Enter"
async function unlock() {
  const inputEl = document.getElementById("password");
  if (!inputEl) return;

  const input = inputEl.value;
  if (!input) return;

  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input)
  );

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");

  if (hashHex === STORED_HASH) {
    sessionStorage.setItem(STORAGE_KEY, "true");
    unlockPage();
  } else {
    alert("Incorrect password. Try again.");
  }
}

// Reveals protected content
function unlockPage() {
  const gate = document.getElementById("gate");
  const content = document.getElementById("protected-content");

  if (gate) gate.style.display = "none";
  if (content) content.style.display = "block";

  // Optional: unlock internal member overlays
  document
    .querySelectorAll(".member-lock .member-overlay")
    .forEach(el => (el.style.display = "none"));
}
