document.addEventListener("DOMContentLoaded", () => {
  /* =======================
     CORE ELEMENTS
  ======================= */
  const controls = document.getElementById("controls");
  const doll = document.getElementById("dollCapture");

  if (!controls || !doll) {
    console.error("Controls or dollCapture element not found!");
    return;
  }

  /* =======================
     ASSET CATEGORIES
  ======================= */

  const BACKGROUNDS = {
  none: "",
  pink: "bg-pink",  pink: "bg-pink",
  teal: "bg-teal",  teal: "bg-teal",
  purple: "bg-purple",  purple: "bg-purple",
  stars: "bg-stars"
};

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

    tops: [
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/thumbnails/croppedteethumb.png",
        versions: [
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/1.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/2.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/3.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/4.png"
        ] },
        { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/thumbnails/costumethumb.png",
        versions: [
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/5.png",
        ] },
        { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/thumbnails/croppedtankthumb.png",
        versions: [
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/6.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/7.png",
        ] }
    ],

    bottoms: [
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/thumbnails/shortsthumb.png",
        versions: [
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/1.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/2.png"
        ] }
    ],

    socks: [
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/thumbnails/socksthumb.png",
        versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/socks/2.png"] }
    ],

    shoes: [
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/thumbnails/bootsthumb.png",
        versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/1.png"] }
    ],

    hair: [
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/thumbnails/straightthumb.png",
        versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/1.png"] }
    ],

    eyes: [
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/thumbnails/eyethumb.png",
        versions: [...Array(7)].map((_,i)=>`https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyes/${i+1}.png`) }
    ],

    eyeshadow: [
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/thumbnails/eyeshadowthumb.png",
        versions: [...Array(9)].map((_,i)=>`https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyeshadow/${i+1}.png`) }
    ],

    lips: [
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/thumbnails/lipstickthumb.png",
        versions: [...Array(8)].map((_,i)=>`https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/lips/${i+1}.png`) }
    ],

    handhelds: [
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/thumbnails/lightsticksthumb.png",
        versions: [...Array(5)].map((_,i)=>`https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/${i+1}.png`) }
    ]
  };

  /* =======================
     BUILD TABS + UI
  ======================= */
  const tabBar = document.createElement("div");
  tabBar.className = "tabs";
  controls.appendChild(tabBar);

  Object.entries(CATEGORIES).forEach(([category, items], index) => {
    // Tab button
    const tab = document.createElement("button");
    tab.className = "tab-btn";
    tab.textContent = category;
    tabBar.appendChild(tab);

    // Category section
    const section = document.createElement("div");
    section.className = "category";

    const grid = document.createElement("div");
    grid.className = "items";

    // "None" button
    const noneWrapper = document.createElement("div");
    noneWrapper.className = "item-wrapper none-wrapper";
    const noneBtn = document.createElement("button");
    noneBtn.className = "none-btn";
    noneBtn.textContent = "None";
    noneBtn.onclick = () => {
      const el = document.getElementById(category);
      if(el) el.src = "";
    };
    noneWrapper.appendChild(noneBtn);
    grid.appendChild(noneWrapper);

    // Add items
    items.forEach((item, itemIndex) => {
      const wrapper = document.createElement("div");
      wrapper.className = "item-wrapper";

      const img = document.createElement("img");
      img.src = item.thumb || item;
      img.alt = `${category} option ${itemIndex + 1}`;

      // Click to select first version
      img.onclick = () => {
        const el = document.getElementById(category);
        if (!el) return console.error(`Element with id "${category}" not found!`);
        const newSrc = typeof item === "string" ? item : item.versions[0];
        el.src = newSrc;
      };

      wrapper.appendChild(img);

      // Version buttons
      if(item.versions && item.versions.length > 1){
        const versionSelector = document.createElement("div");
        versionSelector.className = "version-selector";
        item.versions.forEach((src,vIndex)=>{
          const versionBtn = document.createElement("button");
          versionBtn.className = "version-btn";
          versionBtn.textContent = vIndex + 1;
          versionBtn.onclick = e=>{
            e.stopPropagation();
            const el = document.getElementById(category);
            if(!el) return console.error(`Element with id "${category}" not found!`);
            el.src = src;
          };
          versionSelector.appendChild(versionBtn);
        });
        wrapper.appendChild(versionSelector);
      }

      grid.appendChild(wrapper);
    });

    section.appendChild(grid);
    controls.appendChild(section);

    // Tab click
    tab.onclick = () => {
      document.querySelectorAll(".category").forEach(c=>c.classList.remove("active"));
      document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("active"));
      section.classList.add("active");
      tab.classList.add("active");
    };

    // Activate first tab
    if(index === 0) tab.click();
  });

  /* =======================
     SAVE OUTFIT
  ======================= */
  const saveBtn = document.getElementById("saveOutfit");
  if(saveBtn){
    saveBtn.addEventListener("click", async ()=>{
      if(!doll) return console.error("dollCapture not found!");
      const canvas = await html2canvas(doll, {backgroundColor:null, scale:2, useCORS:true});
      const link = document.createElement("a");
      link.download = "sunniejae-dressup.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  }
});
