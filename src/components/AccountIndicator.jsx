import React, { useState, useEffect, useRef } from 'react';

    function AccountIndicator({ userEmail, onLogout }) {
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
      const dropdownRef = useRef(null); // Ref to detect outside clicks

      const getInitials = (email) => {
        if (!email) return '??';
        const emailParts = email.split('@');
        let initials = emailParts[0][0] || '?';
        if (emailParts.length > 1 && emailParts[1][0]) {
          initials += emailParts[1][0];
        }
        return initials.toUpperCase();
      };

      const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };

      // Close dropdown if clicked outside
      useEffect(() => {
        function handleClickOutside(event) {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [dropdownRef]);


      return (
        <div className="account-indicator" onClick={toggleDropdown} ref={dropdownRef}>
          <span className="account-initials">{getInitials(userEmail)}</span>
          {isDropdownOpen && (
            <div className="account-dropdown-content">
              <div className="account-email-display" title={userEmail}>{userEmail}</div>
              <hr />
              <button onClick={onLogout} className="logout-button">Logout</button>
            </div>
          )}
        </div>
      );
    }

    export default AccountIndicator;
