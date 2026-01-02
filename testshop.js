const PRODUCTS = [
    {
        id: 1,
        name: "Capricorn Ritual Guide",
        type: "exclusive",
        images: [
            "Capricorn Ritual Guide-1.png",
            "Capricorn Ritual Guide-2.png",
            "Capricorn Ritual Guide-3.png"
        ]
    },
    {
        id: 2,
        name: "Astrology Planner",
        type: "direct",
        link: "https://amazon.com",
        images: [
            "Astrology Planner-1.png",
            "Astrology Planner-2.png"
        ]
    },
    {
        id: 3,
        name: "Zodiac Art Print",
        type: "direct",
        link: "https://redbubble.com",
        images: [
            "Zodiac Art Print-1.png",
            "Zodiac Art Print-2.png"
        ]
    }
];

let wishlist = [];

const grid = document.getElementById("product-grid");

/* ===== Render Products ===== */
PRODUCTS.forEach(product => {
    const card = document.createElement("div");
    card.className = "product";

    const wrapper = document.createElement("div");
    wrapper.className = "image-wrapper";

    const mainImg = document.createElement("img");
    mainImg.className = "main-image";
    mainImg.src = `assets/shop/${product.images[0]}`;

    const thumbs = document.createElement("div");
    thumbs.className = "thumbs";

    product.images.forEach(img => {
        const thumb = document.createElement("img");
        thumb.className = "thumb";
        thumb.src = `assets/shop/${img}`;
        thumb.onclick = () => mainImg.src = thumb.src;
        thumbs.appendChild(thumb);
    });

    wrapper.appendChild(mainImg);
    wrapper.appendChild(thumbs);

    card.appendChild(wrapper);
    card.innerHTML += `<h3>${product.name}</h3>`;

    if (product.type === "direct") {
        const link = document.createElement("a");
        link.href = product.link;
        link.target = "_blank";
        link.className = "direct";
        link.textContent = "BUY NOW";
        card.appendChild(link);
    } else {
        const btn = document.createElement("button");
        btn.className = "exclusive";
        btn.textContent = "ADD TO WISHLIST";
        btn.onclick = () => addToWishlist(product);
        card.appendChild(btn);
    }

    grid.appendChild(card);
});

/* ===== Wishlist ===== */
function addToWishlist(product) {
    if (!wishlist.find(p => p.id === product.id)) {
        wishlist.push(product);
        updateWishlist();
    }
}

function updateWishlist() {
    document.getElementById("wishlist-count").textContent = wishlist.length;
    document.getElementById("wishlist-items").innerHTML =
        wishlist.length
            ? wishlist.map(p => `✦ ${p.name}`).join("<br>")
            : "Your wishlist is empty.";
}

/* ===== Modal ===== */
const modal = document.getElementById("wishlist-modal");

document.getElementById("wishlist-btn").onclick = () => {
    modal.style.display = "flex";
};

modal.onclick = e => {
    if (e.target === modal) modal.style.display = "none";
};

/* ===== Mailto ===== */
document.getElementById("request-order").onclick = () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subscribe = document.getElementById("subscribe").checked ? "Yes" : "No";

    const wishlistText = wishlist.map(p => `- ${p.name}`).join("\n");

    const body = `
Name: ${name}
Email: ${email}
Subscribe to Emails: ${subscribe}

Wishlist:
${wishlistText}
`;

    window.location.href =
        `mailto:orders@sunniejae.com?subject=SUNNIE%20JAE%20SHOP%20ORDER&body=${encodeURIComponent(body)}`;
};
