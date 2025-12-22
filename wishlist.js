/* ================= WISHLIST ================= */

let wishlist = [];

// Add item to wishlist
function addToWishlist(item){
  if(!wishlist.includes(item)){
    wishlist.push(item);
    document.getElementById('wishlistCount').textContent = wishlist.length;
  }
}

// Open/close wishlist modal
function openWishlist(){
  updateWishlist();
  document.getElementById('wishlistModal').style.display = 'flex';
}
function closeWishlist(){
  document.getElementById('wishlistModal').style.display = 'none';
}

// Render wishlist items
function updateWishlist(){
  const ul = document.getElementById('wishlistItems');
  ul.innerHTML = '';
  wishlist.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
}

// Send wishlist via email
function requestOrder(){
  const name = document.getElementById('userName').value.trim();
  const email = document.getElementById('userEmail').value.trim();
  if(!name || !email || wishlist.length === 0){
    alert('Please enter name, email, and add items.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)){
    alert('Please enter a valid email.');
    return;
  }

  const subject = encodeURIComponent('LE SSERAFIM Wishlist Order');
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nItems:\n- ${wishlist.join('\n- ')}`);
  window.location.href = `mailto:orders@sunniejae.com?subject=${subject}&body=${body}`;
}
