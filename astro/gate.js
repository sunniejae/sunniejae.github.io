const STORED_HASH =
  "81c4d66f638dcab2657a7544fab9ae6dd226c1e8d1de463e0d7a60893327dc45";
async function unlock() {
    const input = document.getElementById('password').value;
    const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    if(hashHex === STORED_HASH) {
        document.getElementById('gate').style.display = 'none';
        document.getElementById('content').style.display = 'block';

        // Optionally unlock the tarot overlay automatically
        document.querySelectorAll('.member-lock .member-overlay').forEach(el => el.style.display = 'none');
    } else {
        alert('Incorrect password. Try again!');
    }
}
