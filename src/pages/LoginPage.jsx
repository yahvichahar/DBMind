import React, { useState } from 'react';

    function LoginPage({ onLogin, onSwitchToSignup }) {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');

      const handleSubmit = (event) => {
        event.preventDefault();
        setError(''); // Clear previous errors

        // Basic validation simulation
        if (!email || !password) {
          setError('Please enter both email and password.');
          return;
        }
        if (password) { // Simulate successful login if password is not empty
          onLogin(email);
        } else {
          setError('Invalid email or password (simulation).');
        }
      };

      return (
        <div className="auth-container">
          <form onSubmit={handleSubmit} className="auth-form">
            <h2>Login</h2>
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
            <p className="auth-switch">
              Don't have an account? <span onClick={onSwitchToSignup}>Sign Up</span>
            </p>
          </form>
        </div>
      );
    }

    export default LoginPage;
