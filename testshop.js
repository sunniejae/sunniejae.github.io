/* ===== Product Data ===== */
const PRODUCTS = [
    {
        id: 1,
        name: "Capricorn Ritual Guide",
        description: "Printable digital guide",
        image: "assets/capricorn.png",
        type: "exclusive"
    },
    {
        id: 2,
        name: "Astrology Planner",
        description: "Available on Amazon",
        image: "assets/planner.png",
        type: "direct",
        link: "https://amazon.com"
    },
    {
        id: 3,
        name: "Zodiac Art Print",
        description: "Redbubble exclusive",
        image: "assets/print.png",
        type: "direct",
        link: "https://redbubble.com"
    }
];

let wishlist = [];

/* ===== Render Products ===== */
const grid = document.getElementById("product-grid");

PRODUCTS.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
    `;

    if (product.type === "direct") {
        const link = document.createElement("a");
        link.href = product.link;
        link.target = "_blank";
        link.className = "direct";
        link.textContent = "Buy Now";
        div.appendChild(link);
    } else {
        const btn = document.createElement("button");
        btn.className = "exclusive";
        btn.textContent = "Add to Wishlist";
        btn.onclick = () => addToWishlist(product);
        div.appendChild(btn);
    }

    grid.appendChild(div);
});

/* ===== Wishlist Logic ===== */
function addToWishlist(product) {
    if (!wishlist.find(item => item.id === product.id)) {
        wishlist.push(product);
        updateWishlistUI();
    }
}

function updateWishlistUI() {
    document.getElementById("wishlist-count").textContent = wishlist.length;

    const list = wishlist.map(item => `• ${item.name}`).join("<br>");
    document.getElementById("wishlist-items").innerHTML =
        wishlist.length ? list : "Your wishlist is empty.";
}

/* ===== Modal ===== */
const modal = document.getElementById("wishlist-modal");

document.getElementById("wishlist-btn").onclick = () => {
    modal.style.display = "flex";
};

modal.onclick = e => {
    if (e.target === modal) modal.style.display = "none";
};

/* ===== Mailto Request ===== */
document.getElementById("request-order").onclick = () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subscribe = document.getElementById("subscribe").checked ? "Yes" : "No";

    const wishlistText = wishlist.map(item => `- ${item.name}`).join("%0D%0A");

    const body =
`Name: ${name}
Email: ${email}
Subscribe to Emails: ${subscribe}

Wishlist:
${wishlistText}`;

    window.location.href =
`mailto:orders@sunniejae.com
?subject=SUNNIE%20JAE%20SHOP%20ORDER
&body=${encodeURIComponent(body)}`;
};
