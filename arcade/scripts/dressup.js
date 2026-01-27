document.addEventListener("DOMContentLoaded", () => {

  /* =======================
     CORE ELEMENTS
  ======================= */
  const controls = document.getElementById("controls");

  /* =======================
     ASSET CATEGORIES (WITH GROUPED VERSIONS)
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
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/1.png",
        versions: [
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/1.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/2.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/3.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/4.png"
        ] },
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/5.png",
        versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/5.png"] },
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/6.png",
        versions: [
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/6.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/7.png"
        ] }
    ],

    shirtdesign: [
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/1.png",
        versions: [
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/1.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/2.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/3.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/4.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/5.png"
        ] },
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/6.png",
        versions: [
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/6.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/7.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/8.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/9.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/10.png"
        ] }
    ],

    shorts: [
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/1.png",
        versions: [
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/1.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/2.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/3.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/4.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/5.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/6.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/7.png"
        ] },
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/8.png",
        versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/8.png"] },
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/9.png",
        versions: [
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/9.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/10.png"
        ] }
    ],

    socks: [
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/socks/2.png",
        versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/socks/2.png"] },
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/socks/3.png",
        versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/socks/3.png"] },
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/socks/1.png",
        versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/socks/1.png"] }
    ],

    shoes: [
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/1.png",
        versions: [
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/1.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/2.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/3.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/4.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/5.png"
        ] },
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/6.png",
        versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/6.png"] },
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/7.png",
        versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/7.png"] }
    ],

    hair: [
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/1.png",
        versions: [
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/1.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/2.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/3.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/4.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/5.png"
        ] },
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/6.png",
        versions: [
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/6.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/7.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/8.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/9.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/10.png"
        ] },
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/11.png",
        versions: [
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/11.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/12.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/13.png"
        ] }
    ],

    eyes: [
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyes/1.png",
        versions: [...Array(7)].map((_,i)=>`https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyes/${i+1}.png`) }
    ],

    eyeshadow: [
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyeshadow/1.png",
        versions: [...Array(9)].map((_,i)=>`https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyeshadow/${i+1}.png`) }
    ],

    lips: [
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/lips/1.png",
        versions: [...Array(8)].map((_,i)=>`https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/lips/${i+1}.png`) }
    ],

    handhelds: [
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/1.png",
        versions: [...Array(5)].map((_,i)=>`https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/${i+1}.png`) },
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/6.png",
        versions: [...Array(3)].map((_,i)=>`https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/${i+6}.png`) },
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/9.png",
        versions: [...Array(4)].map((_,i)=>`https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/${i+9}.png`) }
    ]
  };

  /* =======================
     TABS + UI BUILDER
  ======================= */
  const tabBar = document.createElement("div");
  tabBar.className = "tabs";
  controls.appendChild(tabBar);

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
        const el = document.getElementById(category);
        if (el) el.src = item.versions ? item.versions[0] : item;
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

});