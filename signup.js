/* No changes */
    const signupForm = document.getElementById('signup-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const errorMessage = document.getElementById('error-message');
    signupForm.addEventListener('submit', (event) => {
      event.preventDefault(); errorMessage.style.display = 'none';
      const email = emailInput.value; const password = passwordInput.value; const confirmPassword = confirmPasswordInput.value;
      if (password !== confirmPassword) { errorMessage.textContent = 'Passwords do not match.'; errorMessage.style.display = 'block'; return; }
      if (password.length < 6) { errorMessage.textContent = 'Password must be at least 6 characters long.'; errorMessage.style.display = 'block'; return; }
      console.log('Simulating successful signup for:', email); localStorage.setItem('userEmail', email); window.location.href = 'index.html';
    });
