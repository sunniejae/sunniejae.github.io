const controls = document.getElementById("controls");

/* =======================
   CATEGORY DATA
======================= */

const CATEGORIES = {
  shirt: [
    {
      id: "crop-tee",
      thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/1.png",
      versions: [1,2,3,4].map(n =>
        `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/${n}.png`
      )
    },
    {
      id: "costume-shirt",
      thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/5.png",
      versions: [
        "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/5.png"
      ]
    },
    {
      id: "plaid-tank",
      thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/6.png",
      versions: [6,7].map(n =>
        `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shirts/${n}.png`
      )
    }
  ],

  shirtdesign: [
    {
      id: "logos",
      thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/1.png",
      versions: [1,2,3,4,5].map(n =>
        `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/${n}.png`
      )
    },
    {
      id: "graphics",
      thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/6.png",
      versions: [6,7,8,9,10].map(n =>
        `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/accessories/${n}.png`
      )
    }
  ],

  shorts: [
    {
      id: "jean-shorts",
      thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/1.png",
      versions: [1,2,3,4,5,6,7].map(n =>
        `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/${n}.png`
      )
    },
    {
      id: "tie-dye-sweats",
      thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/8.png",
      versions: [
        "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/8.png"
      ]
    },
    {
      id: "plaid-skirt",
      thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/9.png",
      versions: [9,10].map(n =>
        `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shorts/${n}.png`
      )
    }
  ],

  socks: [
    {
      id: "fishnets",
      thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/socks/1.png",
      versions: [
        "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/socks/1.png"
      ]
    },
    {
      id: "socks",
      thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/socks/2.png",
      versions: [
        "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/socks/2.png"
      ]
    },
    {
      id: "combo",
      thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/socks/3.png",
      versions: [
        "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/socks/3.png"
      ]
    }
  ],

  shoes: [
    {
      id: "booties",
      thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/1.png",
      versions: [1,2,3,4,5].map(n =>
        `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/${n}.png`
      )
    },
    {
      id: "sneakers",
      thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/6.png",
      versions: [
        "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/6.png"
      ]
    },
    {
      id: "costume-shoes",
      thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/7.png",
      versions: [
        "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/shoes/7.png"
      ]
    }
  ],

  hair: [
    {
      id: "straight",
      thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/1.png",
      versions: [1,2,3,4,5].map(n =>
        `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/${n}.png`
      )
    },
    {
      id: "wavy",
      thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/6.png",
      versions: [6,7,8,9,10].map(n =>
        `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/${n}.png`
      )
    },
    {
      id: "costume-hair",
      thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/11.png",
      versions: [11,12,13].map(n =>
        `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/hair/${n}.png`
      )
    }
  ],

  eyes: Array.from({ length: 7 }, (_, i) =>
    `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyes/${i+1}.png`
  ),

  eyeshadow: Array.from({ length: 9 }, (_, i) =>
    `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/eyeshadow/${i+1}.png`
  ),

  lips: Array.from({ length: 8 }, (_, i) =>
    `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/lips/${i+1}.png`
  ),

  handhelds: [
    {
      id: "lightsticks",
      thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/1.png",
      versions: [1,2,3,4,5].map(n =>
        `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/${n}.png`
      )
    },
    {
      id: "hobbies",
      thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/6.png",
      versions: [6,7,8].map(n =>
        `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/${n}.png`
      )
    },
    {
      id: "drinks",
      thumb: "https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/9.png",
      versions: [9,10,11,12].map(n =>
        `https://sunniejae.blob.core.windows.net/sunniejae/assets/dressup/handhelds/${n}.png`
      )
    }
  ]
};

/* =======================
   VERSION UI
======================= */

function showVersions(category, item) {
  let bar = document.getElementById("versionBar");

  if (!bar) {
    bar = document.createElement("div");
    bar.id = "versionBar";
    bar.className = "version-switch";
    controls.prepend(bar);
  }

  bar.innerHTML = "";

  item.versions.forEach((src, i) => {
    const btn = document.createElement("button");
    btn.textContent = i + 1;
    btn.className = "version";

    btn.onclick = () => {
      document.getElementById(category).src = src;
      [...bar.children].forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    };

    bar.appendChild(btn);
  });
}

/* =======================
   BUILD UI
======================= */

Object.entries(CATEGORIES).forEach(([category, items]) => {
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

  items.forEach(item => {
    if (typeof item === "string") {
      const img = document.createElement("img");
      img.src = item;
      img.onclick = () => {
        document.getElementById(category).src = item;
      };
      grid.appendChild(img);
      return;
    }

    const img = document.createElement("img");
    img.src = item.thumb;
    img.onclick = () => showVersions(category, item);
    grid.appendChild(img);
  });

  section.appendChild(title);
  section.appendChild(grid);
  controls.appendChild(section);
});

/* =======================
   EXPORT
======================= */

async function waitForImages(container) {
  const imgs = container.querySelectorAll("img");
  await Promise.all(
    [...imgs].map(img =>
      img.complete
        ? Promise.resolve()
        : new Promise(res => (img.onload = img.onerror = res))
    )
  );
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