const controls = document.getElementById("controls");

/* =======================
   ASSET CATEGORIES
======================= */

const CATEGORIES = {
  skintone: [
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/base/1.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/base/2.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/base/3.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/base/4.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/base/5.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/base/6.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/base/7.PNG"
  ],
  shirt: [
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/1.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/2.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/3.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/4.PNG"
  ],
  shirtdesign: [
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/2.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/4.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/5.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/6.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/1.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/7.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/8.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/9.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/10.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/11.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/12.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/12.png",






],
  
  shorts: [
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/1.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/2.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/3.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/4.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/5.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/6.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/7.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/8.png"

  ],
  socks: [
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/socks/2.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/socks/3.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/socks/4.PNG"
  ],
  shoes: [
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/1.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/2.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/3.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/4.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/5.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/6.PNG"
  ],
  hair: [
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/1.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/2.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/3.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/4.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/5.PNG",
     "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/6.png",
     "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/7.png",
     "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/8.png",
     "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/9.png"
  ],
  eyes: [
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyes/1.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyes/2.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyes/3.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyes/4.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyes/5.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyes/6.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyes/7.PNG"
  ],
  eyeshadow: [
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyeshadow/1.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyeshadow/2.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyeshadow/3.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyeshadow/4.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyeshadow/5.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyeshadow/6.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyeshadow/7.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyeshadow/8.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyeshadow/9.PNG",
  ],

   lips: [
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/lips/1.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/lips/2.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/lips/3.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/lips/4.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/lips/5.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/lips/6.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/lips/7.PNG",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/lips/8.PNG",
  ],
  handhelds: [
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/1.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/2.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/3.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/4.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/5.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/6.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/7.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/8.png",
  "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/9.png",]
};

/* =======================
   BACKGROUNDS
======================= */

const BACKGROUNDS = {
  none: "",
  pink: "bg-pink",
  teal: "bg-teal",
  purple: "bg-purple",
  stars: "bg-stars"
};

const bgSection = document.createElement("div");
bgSection.className = "category";

const bgTitle = document.createElement("h3");
bgTitle.textContent = "Background";

const bgGrid = document.createElement("div");
bgGrid.className = "items";

Object.entries(BACKGROUNDS).forEach(([key, className]) => {
  const btn = document.createElement("div");
  btn.className = "bg-thumb";
  btn.textContent = key;

  btn.onclick = () => {
    const bg = document.getElementById("bgLayer");
    bg.className = "bg-layer";
    if (className) bg.classList.add(className);
  };

  bgGrid.appendChild(btn);
});

bgSection.appendChild(bgTitle);
bgSection.appendChild(bgGrid);
controls.appendChild(bgSection);

/* =======================
   CATEGORY UI
======================= */

Object.entries(CATEGORIES).forEach(([category, images]) => {
  const section = document.createElement("div");
  section.className = "category";

  const title = document.createElement("h3");
  title.textContent = category;

  const grid = document.createElement("div");
  grid.className = "items";

  const none = document.createElement("img");
  none.src = "/assets/none.png";
  none.onclick = () => document.getElementById(category).src = "";
  grid.appendChild(none);

  images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.onclick = () => document.getElementById(category).src = src;
    grid.appendChild(img);
  });

  section.appendChild(title);
  section.appendChild(grid);
  controls.appendChild(section);
});

/* =======================
   EXPORT
======================= */

document.getElementById("saveOutfit").addEventListener("click", async () => {
  const doll = document.getElementById("dollCapture");

  const canvas = await html2canvas(doll, {
    backgroundColor: null,
    scale: 4,
    useCORS: true
  });

  const link = document.createElement("a");
  link.download = "magical-girl-outfit.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
