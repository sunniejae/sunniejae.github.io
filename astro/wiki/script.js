/* ================= THEME SYSTEM ================= */
const root = document.documentElement;
const toggle = document.getElementById("themeToggle");

function loadTheme() {
  const saved = localStorage.getItem("moon-theme") || "dreamer";
  root.setAttribute("data-moon", saved);
  if (toggle) updateToggle(saved);
}

function updateToggle(mode) {
  toggle.textContent = mode === "dreamer"
    ? "🌙 Dreamer Mode"
    : "👑 Diva Mode";
}

if (toggle) {
  toggle.addEventListener("click", () => {
    const next =
      root.getAttribute("data-moon") === "dreamer" ? "diva" : "dreamer";
    root.setAttribute("data-moon", next);
    localStorage.setItem("moon-theme", next);
    updateToggle(next);
  });
}

loadTheme();

/* ================= HOROSCOPE ================= */
const box = document.getElementById("daily-box");
if (box) {
  const msgs = [
    "Rest is productive for you right now.",
    "Listen to your intuition—it’s loud today.",
    "Creative flow returns when you slow down.",
    "Dreams hold messages worth writing down.",
    "Boundaries protect your magic."
  ];
  const d = new Date();
  box.textContent = msgs[d.getDate() % msgs.length];
}
