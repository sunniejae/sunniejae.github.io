const PRODUCTS = [
    {
        id: 1,
        name: "Starry Jae 2026 Astrology Guide",
        type: "exclusive",
        images: [
            "journal261.png",
            "journal262.png",
            "journal263.png"
        ]
    },
    {
        id: 2,
        name: "Going Mental: A Tour Through the Mind of a Girl Named Lisa",
        type: "direct",
        link: "https://www.amazon.com/dp/B0GB5KCGRJ/ref=cm_sw_r_as_gl_api_gl_i_37AMD81Q5NM3DDZKJWDZ?linkCode=ml1&tag=jaymeallen-20&linkId=bec1e7eed538f1329d0eb4111770f143",
        images: [
            "goingmental.png",
            "goingmental2.png"
        ]
    },
    {
        id: 3,
        name: "Le Sserafim Spaghetti Era",
        type: "direct",
        link: "https://www.redbubble.com/people/sunniejae/shop?artistUserName=SunnieJae&collections=4422838&iaCode=all-departments&sortOrder=top%20selling",
        images: [
            "spaghetti-EUNCHAE.png",
            "spaghetti-KAZUHA.png"
        ]
    },
    {
        id: 4,
        name: "You're My Sweet Potato",
        type: "direct",
        link: "https://www.redbubble.com/people/sunniejae/shop?artistUserName=SunnieJae&collections=4428320&iaCode=all-departments&sortOrder=top%20selling",
        images: [
            "shepotato.png",
            "hepotato.png",
            "theypotato.png",
            "iyam.png"
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
        thumb.onclick = () => {
            mainImg.src = thumb.src;
        };
        thumbs.appendChild(thumb);
    });

    wrapper.appendChild(mainImg);
    wrapper.appendChild(thumbs);

    card.appendChild(wrapper);

    const title = document.createElement("h3");
    title.textContent = product.name;
    card.appendChild(title);

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

/* ===== Wishlist Modal ===== */
const wishlistModal = document.getElementById("wishlist-modal");

document.getElementById("wishlist-btn").onclick = () => {
    wishlistModal.style.display = "flex";
};

wishlistModal.onclick = e => {
    if (e.target === wishlistModal) wishlistModal.style.display = "none";
};

/* ===== How To Order Modal ===== */
const howModal = document.getElementById("how-to-order-modal");
const howBtn = document.getElementById("how-to-order-btn");
const closeHowBtn = document.getElementById("close-how-to-order");

howBtn.onclick = () => {
    howModal.style.display = "flex";
};

closeHowBtn.onclick = () => {
    howModal.style.display = "none";
};

howModal.onclick = e => {
    if (e.target === howModal) howModal.style.display = "none";
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
