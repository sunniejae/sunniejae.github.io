document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('emailForm');
  const emailInput = document.getElementById('emailInput');
  const subscribeOptIn = document.getElementById('subscribeOptIn');

  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const optedIn = subscribeOptIn.checked;

    // Basic validation
    if (!email || !email.includes('@')) {
      errorMessage.style.display = 'block';
      successMessage.style.display = 'none';
      return;
    }

    errorMessage.style.display = 'none';

    // Build payload (safe for backend / EmailJS later)
    const submission = {
      email: email,
      marketingOptIn: optedIn
    };

    console.log('Email submission:', submission);

    // OPTIONAL: store locally for now
    const stored = JSON.parse(localStorage.getItem('sunnieJaeEmails')) || [];
    stored.push(submission);
    localStorage.setItem('sunnieJaeEmails', JSON.stringify(stored));

    // Success feedback
    successMessage.style.display = 'block';
    form.reset();
  });
});
