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
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/2.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/3.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/4.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/5.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/6.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/7.png",
        ] },
        { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/thumbnails/leggingsthumb.png",
        versions: [
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/8.png",
        ] },
        { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/thumbnails/skirtsthumb.png",
        versions: [
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/9.png",
          "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/10.png",

        ] },
    ],

    socks: [
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/thumbnails/socksthumb.png",
        versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/socks/1.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/socks/2.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/socks/3.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/socks/4.png",
] }
    ],

    shoes: [
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/thumbnails/bootsthumb.png",
        versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/1.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/2.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/3.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/4.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/5.png",

    ] },
    { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/thumbnails/sneakersthumb.png",
        versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/6.png",
    ] },
     { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/thumbnails/costumethumb.png",
        versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/7.png",
    ] },
    ],

    hair: [
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/thumbnails/straightthumb.png",
        versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/1.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/2.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/3.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/4.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/5.png",
      ]},
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/thumbnails/wavythumb.png",
        versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/6.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/7.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/8.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/9.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/10.png",
      ]},
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/thumbnails/costumethumb.png",
        versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/11.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/12.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/13.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/14.png",
      ]}
    ],

    eyes: [
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/thumbnails/eyesthumb.png",
       versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyes/1.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyes/2.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyes/3.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyes/4.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyes/5.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyes/6.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyes/7.png"] }
    ],

    eyeshadow: [
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/thumbnails/eyeshadowthumb.png",
        versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyes/1.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyeshadow/2.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyeshadow/3.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyeshadow/4.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyeshadow/5.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyeshadow/6.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyeshadow/7.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyeshadow/8.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyeshadow/9.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyeshadow/10.png",
    ]}
    ],

    lips: [
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/thumbnails/lipstickthumb.png",
      versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/lips/1.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/lips/2.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/lips/3.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/lips/4.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/lips/5.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/lips/6.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/lips/6.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/lips/7.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/lips/8.png",]}
    ],

    handhelds: [
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/thumbnails/lightsticksthumb.png",
      versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/1.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/2.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/3.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/4.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/5.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/6.png",
      ]},
      { thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/thumbnails/hobbiesthumb.png",
      versions: ["https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/7.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/8.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/9.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/10.png",
      "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/11.png",
    "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/12.png",
  "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/13.png",]}    ]
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
