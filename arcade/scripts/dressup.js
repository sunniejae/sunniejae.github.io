document.addEventListener("DOMContentLoaded", () => {

  const controls = document.getElementById("controls");
  if (!controls) return;

  /* =======================
     DATA
  ======================= */

  const CATEGORIES = {

    backgrounds: Array.from({ length: 6 }, (_, i) =>
      `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/backgrounds/${i + 1}.png`
    ),

    skintone: Array.from({ length: 7 }, (_, i) =>
      `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/base/${i + 1}.png`
    ),

    eyeshadow: Array.from({ length: 9 }, (_, i) =>
      `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyeshadow/${i + 1}.png`
    ),

    eyes: Array.from({ length: 7 }, (_, i) =>
      `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyes/${i + 1}.png`
    ),

    lips: Array.from({ length: 8 }, (_, i) =>
      `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/lips/${i + 1}.png`
    ),

    hair: [
      { thumb: h(1), versions: range(1,5,"hair") },
      { thumb: h(6), versions: range(6,10,"hair") },
      { thumb: h(11), versions: range(11,13,"hair") }
    ],

    shirt: [
      { thumb: s(1), versions: range(1,4,"shirts") },
      { thumb: s(5), versions: [s(5)] },
      { thumb: s(6), versions: range(6,7,"shirts") }
    ],

    shirtdesign: [
      { thumb: a(1), versions: range(1,5,"accessories") },
      { thumb: a(6), versions: range(6,10,"accessories") }
    ],

    shorts: [
      { thumb: sh(1), versions: range(1,7,"shorts") },
      { thumb: sh(8), versions: [sh(8)] },
      { thumb: sh(9), versions: range(9,10,"shorts") }
    ],

    socks: [
      so(1), so(2), so(3)
    ],

    shoes: [
      { thumb: shs(1), versions: range(1,5,"shoes") },
      { thumb: shs(6), versions: [shs(6)] },
      { thumb: shs(7), versions: [shs(7)] }
    ],

    handhelds: [
      { thumb: hh(1), versions: range(1,5,"handhelds") },
      { thumb: hh(6), versions: range(6,8,"handhelds") },
      { thumb: hh(9), versions: range(9,12,"handhelds") }
    ]
  };

  /* =======================
     HELPERS
  ======================= */

  function range(start, end, folder) {
    return Array.from({ length: end - start + 1 }, (_, i) =>
      `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/${folder}/${start + i}.png`
    );
  }

  const h  = n => `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/${n}.png`;
  const s  = n => `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/${n}.png`;
  const sh = n => `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/${n}.png`;
  const so = n => `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/socks/${n}.png`;
  const shs= n => `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/${n}.png`;
  const a  = n => `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/${n}.png`;
  const hh = n => `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/${n}.png`;

  /* =======================
     VERSION SWITCHER
  ======================= */

  function showVersions(targetId, versions) {
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
      btn.onclick = () => {
        const el = document.getElementById(targetId);
        if (el) el.src = src;
      };
      bar.appendChild(btn);
    });
  }

  /* =======================
     UI BUILD
  ======================= */

  Object.entries(CATEGORIES).forEach(([category, items]) => {

    const section = document.createElement("div");
    section.className = "category";

    const title = document.createElement("h3");
    title.textContent = category;

    const grid = document.createElement("div");
    grid.className = "items";

    items.forEach(item => {
      const img = document.createElement("img");

      if (typeof item === "string") {
        img.src = item;
        img.onclick = () => {
          if (category === "backgrounds") {
            document.getElementById("bgLayer").style.backgroundImage = `url(${item})`;
          } else {
            const el = document.getElementById(category);
            if (el) el.src = item;
          }
        };
      } else {
        img.src = item.thumb;
        img.onclick = () => showVersions(category, item.versions);
      }

      grid.appendChild(img);
    });

    section.appendChild(title);
    section.appendChild(grid);
    controls.appendChild(section);
  });

});