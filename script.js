// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// Form submission to Google Sheets
const quoteForm = document.getElementById('quoteForm');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');

if (quoteForm && submitBtn && successMessage) {
  quoteForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(quoteForm);
    const data = Object.fromEntries(formData);
    data.timestamp = new Date().toLocaleString();

    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      const response = await fetch('https://script.google.com/macros/s/AKfycbwNbjRnbzJ3p-KzVc51QxVP9Yc1P0J_05226aIJeNoK3X0La0qlB8TYxCZcyxh7EUvg-A/exec', {
        method: 'POST',
        body: JSON.stringify(data)
      });

      if (!response.ok && response.type !== 'opaque') {
        throw new Error(`Request failed with status ${response.status}`);
      }

      successMessage.textContent = 'Thank you! Your request has been sent successfully.';
      successMessage.style.display = 'block';
      quoteForm.reset();
      submitBtn.textContent = 'Send Message';
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 5000);
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending message. Please try again or email us directly.');
      submitBtn.textContent = 'Send Message';
    } finally {
      submitBtn.disabled = false;
    }
  });
}
