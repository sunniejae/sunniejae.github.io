// Sample Products Data
const products = {
    exclusive: [
        {
            id: 1,
            title: "Custom Portrait",
            price: "$150",
            image: "https://via.placeholder.com/250x250/9a9ad4/ffffff?text=Custom+Portrait",
            type: "exclusive"
        },
        {
            id: 2,
            title: "Handmade Ceramic Mug",
            price: "$45",
            image: "https://via.placeholder.com/250x250/ffb3d6/ffffff?text=Ceramic+Mug",
            type: "exclusive"
        },
        {
            id: 3,
            title: "Personalized Tote Bag",
            price: "$35",
            image: "https://via.placeholder.com/250x250/00c9c2/ffffff?text=Tote+Bag",
            type: "exclusive"
        },
        {
            id: 4,
            title: "Original Watercolor Art",
            price: "$200",
            image: "https://via.placeholder.com/250x250/c13886/ffffff?text=Watercolor",
            type: "exclusive"
        }
    ],
    direct: [
        {
            id: 5,
            title: "My Book on Amazon",
            price: "$19.99",
            image: "https://via.placeholder.com/250x250/3f3d7a/ffffff?text=Book",
            type: "direct",
            link: "https://www.amazon.com"
        },
        {
            id: 6,
            title: "Digital Album",
            price: "$9.99",
            image: "https://via.placeholder.com/250x250/00a8a3/ffffff?text=Album",
            type: "direct",
            link: "https://books.apple.com"
        },
        {
            id: 7,
            title: "Art Print",
            price: "$24.99",
            image: "https://via.placeholder.com/250x250/bfbfdc/ffffff?text=Art+Print",
            type: "direct",
            link: "https://www.redbubble.com"
        },
        {
            id: 8,
            title: "Sticker Pack",
            price: "$8.99",
            image: "https://via.placeholder.com/250x250/ffb3d6/ffffff?text=Stickers",
            type: "direct",
            link: "https://www.redbubble.com"
        }
    ]
};

// Wishlist stored in memory
let wishlist = [];

// Initialize the shop
function init() {
    renderProducts();
    updateWishlistCount();
    attachEventListeners();
}

// Render products to the page
function renderProducts() {
    const exclusiveGrid = document.getElementById('exclusiveProducts');
    const directGrid = document.getElementById('directProducts');

    // Render exclusive products
    products.exclusive.forEach(product => {
        const card = createProductCard(product);
        exclusiveGrid.appendChild(card);
    });

    // Render direct products
    products.direct.forEach(product => {
        const card = createProductCard(product);
        directGrid.appendChild(card);
    });
}

// Create a product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const img = document.createElement('img');
    img.className = 'product-image';
    img.src = product.image;
    img.alt = product.title;

    const info = document.createElement('div');
    info.className = 'product-info';

    const title = document.createElement('h3');
    title.className = 'product-title';
    title.textContent = product.title;

    const price = document.createElement('div');
    price.className = 'product-price';
    price.textContent = product.price;

    const type = document.createElement('div');
    type.className = 'product-type';
    type.textContent = product.type === 'exclusive' ? 'Exclusive to Order' : 'Direct Order';

    const actions = document.createElement('div');
    actions.className = 'product-actions';

    if (product.type === 'exclusive') {
        const wishlistBtn = document.createElement('button');
        wishlistBtn.className = 'btn btn-wishlist';
        wishlistBtn.textContent = 'Add to Wishlist';
        wishlistBtn.onclick = () => addToWishlist(product);
        actions.appendChild(wishlistBtn);
    } else {
        const orderBtn = document.createElement('a');
        orderBtn.className = 'btn btn-secondary';
        orderBtn.textContent = 'Order Now';
        orderBtn.href = product.link;
        orderBtn.target = '_blank';
        actions.appendChild(orderBtn);
    }

    info.appendChild(title);
    info.appendChild(price);
    info.appendChild(type);
    info.appendChild(actions);

    card.appendChild(img);
    card.appendChild(info);

    return card;
}

// Add product to wishlist
function addToWishlist(product) {
    // Check if already in wishlist
    const exists = wishlist.find(item => item.id === product.id);
    if (exists) {
        alert('This item is already in your wishlist!');
        return;
    }

    wishlist.push(product);
    updateWishlistCount();
    
    // Visual feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = 'Added!';
    btn.style.backgroundColor = 'var(--teal)';
    btn.style.color = 'var(--white)';
    
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
        btn.style.color = '';
    }, 1000);
}

// Remove product from wishlist
function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    updateWishlistCount();
    renderWishlist();
}

// Update wishlist count badge
function updateWishlistCount() {
    const countElement = document.getElementById('wishlistCount');
    countElement.textContent = wishlist.length;
    countElement.style.display = wishlist.length > 0 ? 'flex' : 'none';
}

// Render wishlist in modal
function renderWishlist() {
    const wishlistItems = document.getElementById('wishlistItems');
    wishlistItems.innerHTML = '';

    if (wishlist.length === 0) {
        wishlistItems.innerHTML = '<div class="empty-wishlist">Your wishlist is empty. Add some exclusive items to get started!</div>';
        return;
    }

    wishlist.forEach(product => {
        const item = document.createElement('div');
        item.className = 'wishlist-item';

        const img = document.createElement('img');
        img.className = 'wishlist-item-image';
        img.src = product.image;
        img.alt = product.title;

        const info = document.createElement('div');
        info.className = 'wishlist-item-info';

        const title = document.createElement('div');
        title.className = 'wishlist-item-title';
        title.textContent = product.title;

        const price = document.createElement('div');
        price.className = 'wishlist-item-price';
        price.textContent = product.price;

        info.appendChild(title);
        info.appendChild(price);

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => removeFromWishlist(product.id);

        item.appendChild(img);
        item.appendChild(info);
        item.appendChild(removeBtn);

        wishlistItems.appendChild(item);
    });
}

// Handle order form submission
function handleOrderSubmit(e) {
    e.preventDefault();

    if (wishlist.length === 0) {
        alert('Your wishlist is empty! Please add items before requesting an order.');
        return;
    }

    const name = document.getElementById('customerName').value;
    const email = document.getElementById('customerEmail').value;
    const subscribe = document.getElementById('subscribeEmails').checked;

    // Build wishlist text
    const wishlistText = wishlist.map(item => 
        `- ${item.title} (${item.price})`
    ).join('%0D%0A');

    // Build email body
    const body = `Name: ${name}%0D%0A%0D%0AEmail: ${email}%0D%0A%0D%0AWishlist:%0D%0A${wishlistText}%0D%0A%0D%0ASubscribe to emails from Sunnie Jae: ${subscribe ? 'Yes' : 'No'}`;

    // Create mailto link
    const mailtoLink = `mailto:orders@sunniejae.com?subject=SUNNIE JAE SHOP ORDER&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    // Close modal after a short delay
    setTimeout(() => {
        closeModal('wishlistModal');
        // Clear form
        document.getElementById('orderForm').reset();
        document.getElementById('subscribeEmails').checked = true;
    }, 500);
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    
    if (modalId === 'wishlistModal') {
        renderWishlist();
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
}

// Attach event listeners
function attachEventListeners() {
    // Wishlist button
    document.getElementById('wishlistBtn').addEventListener('click', () => {
        openModal('wishlistModal');
    });

    // Info button
    document.getElementById('infoBtn').addEventListener('click', () => {
        openModal('infoModal');
    });

    // Close buttons
    document.getElementById('closeWishlist').addEventListener('click', () => {
        closeModal('wishlistModal');
    });

    document.getElementById('closeInfo').addEventListener('click', () => {
        closeModal('infoModal');
    });

    // Close modals when clicking outside
    document.getElementById('wishlistModal').addEventListener('click', (e) => {
        if (e.target.id === 'wishlistModal') {
            closeModal('wishlistModal');
        }
    });

    document.getElementById('infoModal').addEventListener('click', (e) => {
        if (e.target.id === 'infoModal') {
            closeModal('infoModal');
        }
    });

    // Order form submission
    document.getElementById('orderForm').addEventListener('submit', handleOrderSubmit);
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
