// shop.js

let wishlist = [];

// --- WISHLIST FUNCTIONS ---
function toggleWishlist(collectionId) {
    const collectionElem = document.querySelector(`[data-collection="${collectionId}"]`);
    const name = collectionElem.querySelector('h2').textContent;
    const select = collectionElem.querySelector('select');
    const version = select.value === 'ot5' ? 'OT5 Version' : select.value.charAt(0).toUpperCase() + select.value.slice(1);
    const emoji = select.value === 'ot5' ? '' : memberData[select.value].emoji;

    const product = {
        id: collectionId,
        name,
        version: version,
        emoji
    };

    const index = wishlist.findIndex(p => p.id === collectionId);
    if(index > -1) {
        wishlist.splice(index,1);
    } else {
        wishlist.push(product);
    }

    renderWishlist();
}

function renderWishlist() {
    let container = document.getElementById('wishlist-container');
    if(!container){
        container = document.createElement('div');
        container.id = 'wishlist-container';
        container.style.position = 'fixed';
        container.style.bottom = '20px';
        container.style.right = '20px';
        container.style.backgroundColor = 'rgba(0,0,0,0.8)';
        container.style.color = 'white';
        container.style.padding = '1rem';
        container.style.borderRadius = '1rem';
        container.style.maxWidth = '300px';
        container.style.zIndex = '1000';

        const title = document.createElement('h3');
        title.textContent = 'Wishlist';
        container.appendChild(title);

        const list = document.createElement('ul');
        list.id = 'wishlist-list';
        container.appendChild(list);

        const requestBtn = document.createElement('button');
        requestBtn.textContent = 'Request Order';
        requestBtn.style.marginTop = '0.5rem';
        requestBtn.style.padding = '0.5rem';
        requestBtn.style.border = 'none';
        requestBtn.style.borderRadius = '0.5rem';
        requestBtn.style.cursor = 'pointer';
        requestBtn.onclick = requestOrder;
        container.appendChild(requestBtn);

        document.body.appendChild(container);
    }

    const listElem = document.getElementById('wishlist-list');
    listElem.innerHTML = '';

    wishlist.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.emoji ? `${item.emoji} ${item.name} (${item.version})` : `${item.name} (${item.version})`;
        listElem.appendChild(li);
    });
}

function requestOrder() {
    if(wishlist.length === 0){
        alert('Your wishlist is empty!');
        return;
    }

    const name = prompt('Enter your name:');
    const email = prompt('Enter your email:');

    if(!name || !email){
        alert('Name and email are required.');
        return;
    }

    let message = `Wishlist from ${name} (${email}):\n\n`;
    wishlist.forEach(item => {
        message += `${item.emoji ? item.emoji + ' ' : ''}${item.name} - ${item.version}\n`;
    });

    // Open email client
    const mailto = `mailto:youremail@example.com?subject=Wishlist Request&body=${encodeURIComponent(message)}`;
    window.location.href = mailto;

    // Clear wishlist
    wishlist = [];
    renderWishlist();
}

// --- ADD WISHLIST BUTTONS TO COLLECTIONS ---
document.querySelectorAll('.collection').forEach(coll => {
    const btn = document.createElement('button');
    btn.textContent = 'Add to Wishlist';
    btn.style.marginTop = '1rem';
    btn.style.padding = '0.5rem';
    btn.style.border = 'none';
    btn.style.borderRadius = '0.5rem';
    btn.style.cursor = 'pointer';
    btn.onclick = () => toggleWishlist(coll.dataset.collection);
    coll.querySelector('.collection-info').appendChild(btn);
});

// --- OPTIONAL: Persist wishlist in localStorage ---
// Uncomment if you want wishlist to persist across page reloads
/*
if(localStorage.getItem('wishlist')){
    wishlist = JSON.parse(localStorage.getItem('wishlist'));
    renderWishlist();
}
window.addEventListener('beforeunload',()=>{
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
});
*/
