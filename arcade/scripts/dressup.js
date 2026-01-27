/* =======================
   CORE ELEMENTS
======================= */

const controls = document.getElementById("controls");

/* =======================
   ASSET CATEGORIES
   (GROUPED VARIANTS)
======================= */

const CATEGORIES = {
  skintone: [
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/base/1.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/base/2.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/base/3.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/base/4.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/base/5.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/base/6.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/base/7.png"
  ],

  shirt: [
    { thumb: ".../shirts/1.png", versions: [...Array(4)].map((_,i)=>`https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/${i+1}.png`) },
    { thumb: ".../shirts/5.png", versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/5.png"] },
    { thumb: ".../shirts/6.png", versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/6.png","https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/7.png"] }
  ],

  shirtdesign: [
    { thumb: ".../accessories/1.png", versions: [...Array(5)].map((_,i)=>`https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/${i+1}.png`) },
    { thumb: ".../accessories/6.png", versions: [...Array(5)].map((_,i)=>`https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/${i+6}.png`) }
  ],

  shorts: [
    { thumb: ".../shorts/1.png", versions: [...Array(7)].map((_,i)=>`https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/${i+1}.png`) },
    { thumb: ".../shorts/8.png", versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/8.png"] },
    { thumb: ".../shorts/9.png", versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/9.png","https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/10.png"] }
  ],

  socks: [
    { thumb: ".../socks/1.png", versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/socks/1.png"] },
    { thumb: ".../socks/2.png", versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/socks/2.png"] },
    { thumb: ".../socks/3.png", versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/socks/3.png"] }
  ],

  shoes: [
    { thumb: ".../shoes/1.png", versions: [...Array(5)].map((_,i)=>`https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/${i+1}.png`) },
    { thumb: ".../shoes/6.png", versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/6.png"] },
    { thumb: ".../shoes/7.png", versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/7.png"] }
  ],

  hair: [
    { thumb: ".../hair/1.png", versions: [...Array(5)].map((_,i)=>`https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/${i+1}.png`) },
    { thumb: ".../hair/6.png", versions: [...Array(5)].map((_,i)=>`https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/${i+6}.png`) },
    { thumb: ".../hair/11.png", versions: [...Array(3)].map((_,i)=>`https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/${i+11}.png`) }
  ],

  eyes: [{ thumb: ".../eyes/1.png", versions: [...Array(7)].map((_,i)=>`https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyes/${i+1}.png`) }],
  eyeshadow: [{ thumb: ".../eyeshadow/1.png", versions: [...Array(9)].map((_,i)=>`https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyeshadow/${i+1}.png`) }],
  lips: [{ thumb: ".../lips/1.png", versions: [...Array(8)].map((_,i)=>`https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/lips/${i+1}.png`) }],

  handhelds: [
    { thumb: ".../handhelds/1.png", versions: [...Array(5)].map((_,i)=>`https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/${i+1}.png`) },
    { thumb: ".../handhelds/6.png", versions: [...Array(3)].map((_,i)=>`https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/${i+6}.png`) },
    { thumb: ".../handhelds/9.png", versions: [...Array(4)].map((_,i)=>`https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/${i+9}.png`) }
  ]
};

/* =======================
   TAB SYSTEM
======================= */

const tabBar = document.createElement("div");
tabBar.className = "tabs";
controls.appendChild(tabBar);

let activeSection = null;

Object.entries(CATEGORIES).forEach(([category, items], index) => {

  const tab = document.createElement("button");
  tab.className = "tab-btn";
  tab.textContent = category;
  tabBar.appendChild(tab);

  const section = document.createElement("div");
  section.className = "category";

  const grid = document.createElement("div");
  grid.className = "items";

  items.forEach(item => {
    const img = document.createElement("img");
    img.src = item.thumb || item;

    img.onclick = () => {
      document.getElementById(category).src = item.versions ? item.versions[0] : item;
      showVersions(category, item.versions);
    };

    grid.appendChild(img);
  });

  section.appendChild(grid);
  controls.appendChild(section);

  tab.onclick = () => {
    document.querySelectorAll(".category").forEach(c => c.style.display = "none");
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    section.style.display = "block";
    tab.classList.add("active");
  };

  if (index === 0) tab.click();
});

/* =======================
   VERSION SWITCHER
======================= */

function showVersions(category, versions) {
  if (!versions || versions.length <= 1) return;

  let bar = document.getElementById("versionBar");
  if (!bar) {
    bar = document.createElement("div");
    bar.id = "versionBar";
    bar.className = "version-switch";
    controls.prepend(bar);
  }

  bar.innerHTML = "";

  versions.forEach((src, i) => {
    const btn = document.createElement("button");
    btn.textContent = i + 1;
    btn.onclick = () => document.getElementById(category).src = src;
    bar.appendChild(btn);
  });
}

/* =======================
   SAVE OUTFIT
======================= */

async function waitForImages(container) {
  const imgs = container.querySelectorAll("img");
  await Promise.all([...imgs].map(img =>
    img.complete ? Promise.resolve() : new Promise(res => img.onload = img.onerror = res)
  ));
}

document.getElementById("saveOutfit").addEventListener("click", async () => {
  const doll = document.getElementById("dollCapture");
  await waitForImages(doll);

  const canvas = await html2canvas(doll, {
    backgroundColor: null,
    scale: 2,
    useCORS: true
  });

  const link = document.createElement("a");
  link.download = "sunniejae-dressup.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});