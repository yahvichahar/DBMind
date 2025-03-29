import React, { useState, useEffect } from 'react';
    import LoginPage from './pages/LoginPage';
    import SignupPage from './pages/SignupPage';
    import MainLayout from './pages/MainLayout';

    function App() {
      const [userEmail, setUserEmail] = useState(null);
      const [showLogin, setShowLogin] = useState(true); // Start with login page

      // Check localStorage on initial mount
      useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
          setUserEmail(storedEmail);
        }
      }, []);

      const handleLogin = (email) => {
        localStorage.setItem('userEmail', email);
        setUserEmail(email);
      };

      const handleSignup = (email) => {
        localStorage.setItem('userEmail', email);
        setUserEmail(email);
      };

      const handleLogout = () => {
        localStorage.removeItem('userEmail');
        setUserEmail(null);
        setShowLogin(true); // Go back to login page view
      };

      const switchToSignup = () => setShowLogin(false);
      const switchToLogin = () => setShowLogin(true);

      if (userEmail) {
        // User is logged in, show main application
        return <MainLayout userEmail={userEmail} onLogout={handleLogout} />;
      } else {
        // User is not logged in, show Login or Signup page
        return showLogin ? (
          <LoginPage onLogin={handleLogin} onSwitchToSignup={switchToSignup} />
        ) : (
          <SignupPage onSignup={handleSignup} onSwitchToLogin={switchToLogin} />
        );
      }
    }

    export default App;
