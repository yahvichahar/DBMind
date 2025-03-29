/* No changes */
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault(); errorMessage.style.display = 'none';
      const email = emailInput.value; const password = passwordInput.value;
      if (password) { console.log('Simulating successful login for:', email); localStorage.setItem('userEmail', email); window.location.href = 'index.html'; }
      else { console.log('Simulating failed login'); errorMessage.textContent = 'Invalid email or password (simulation: password cannot be empty).'; errorMessage.style.display = 'block'; }
    });
