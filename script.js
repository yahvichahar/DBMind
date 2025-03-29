// --- DOM Elements ---
    const connectionPanel = document.getElementById('connection-panel');
    const connectButton = document.getElementById('connect-button');
    const connectionStatus = document.getElementById('connection-status');
    const connInputs = {
        name: document.getElementById('conn-name'), host: document.getElementById('conn-host'), port: document.getElementById('conn-port'), user: document.getElementById('conn-user'), password: document.getElementById('conn-password'), database: document.getElementById('conn-database')
    };
    const chatContainer = document.getElementById('chat-container');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const welcomeScreen = document.getElementById('welcome-screen');
    const exampleButtons = document.querySelectorAll('.example-button');

    // Account Indicator Elements
    const accountIndicator = document.getElementById('account-indicator');
    const accountInitials = document.getElementById('account-initials');
    const accountDropdown = document.getElementById('account-dropdown');
    const accountEmailDisplay = document.getElementById('account-email');
    const logoutButton = document.getElementById('logout-button');

    // --- Mock Data (Keep from previous step) ---
    const mockSchema = { /* ... */ }; const mockData = { /* ... */ }; // Keep mock data

    // --- Authentication Check ---
    let currentUserEmail = localStorage.getItem('userEmail');

    if (!currentUserEmail) {
      window.location.href = 'login.html';
    } else {
      setupAccountIndicator(currentUserEmail);
    }
    // --- End Authentication Check ---


    // --- Chat Functions (Keep from previous step) ---
    function addMessage(sender, content, isHtml = false) {
        if (welcomeScreen.style.display !== 'none') {
            welcomeScreen.style.display = 'none';
            chatMessages.classList.add('has-messages');
        }
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
        const messageSpan = document.createElement('span');
        if (isHtml) { messageSpan.innerHTML = content; }
        else { messageSpan.textContent = content; }
        messageDiv.appendChild(messageSpan);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
     }
    function formatResultsToTable(results) { /* ... same as before ... */ }
    function formatSchemaToText(tableName, columns) { /* ... same as before ... */ }
    function processWithSimulatedAI(userText) { /* ... same as before ... */ }
    function handleUserInput() { /* ... same as before ... */ }
    // --- End Chat Functions ---


    // --- Account Indicator Logic ---
    function setupAccountIndicator(email) {
        accountEmailDisplay.textContent = email;
        const emailParts = email.split('@');
        let initials = emailParts[0][0] || '?';
        if (emailParts.length > 1 && emailParts[1][0]) {
            initials += emailParts[1][0];
        }
        accountInitials.textContent = initials.toUpperCase();
        accountIndicator.style.display = 'flex';

        accountIndicator.addEventListener('click', (event) => {
            event.stopPropagation();
            accountDropdown.style.display = accountDropdown.style.display === 'block' ? 'none' : 'block';
        });

        window.addEventListener('click', (event) => {
            if (!accountIndicator.contains(event.target)) {
                accountDropdown.style.display = 'none';
            }
        });
    }

    function logout() {
        localStorage.removeItem('userEmail'); // Clear the stored email
        window.location.href = 'login.html'; // Redirect to login page
    }
    // --- End Account Indicator Logic ---


    // --- Connection Logic ---
    function simulateConnection() {
        const dbName = connInputs.database.value.trim();
        const userName = connInputs.user.value.trim();
        if (!dbName || !userName) { /* ... error handling ... */ return; }

        connectionStatus.textContent = 'Status: Connecting...';
        connectionStatus.className = '';
        connectButton.disabled = true;
        Object.values(connInputs).forEach(input => input.disabled = true);

        setTimeout(() => {
            const displayStatusName = connInputs.name.value.trim() || dbName;
            connectionStatus.textContent = `Status: Connected to ${displayStatusName}`;
            connectionStatus.className = 'connected';

            chatContainer.classList.remove('disabled');
            userInput.disabled = false;
            sendButton.disabled = false;
            exampleButtons.forEach(button => button.disabled = false);
            userInput.placeholder = 'Ask me about SQL...';

            welcomeScreen.style.display = 'none';
            chatMessages.classList.add('has-messages');
            addMessage('bot', 'Connection successful! How can I help you with SQL?');
            userInput.focus();

        }, 1500);
    }

    // --- Event Listeners ---
    connectButton.addEventListener('click', simulateConnection);
    sendButton.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', (event) => { if (event.key === 'Enter') { handleUserInput(); } });
    exampleButtons.forEach(button => {
         button.addEventListener('click', () => {
            if (!userInput.disabled) {
                const promptText = button.getAttribute('data-prompt');
                userInput.value = promptText;
                userInput.focus();
            }
        });
        button.disabled = true;
     });
    logoutButton.addEventListener('click', logout); // Listener is correctly attached

    // --- Initial State ---
    // Handled by Auth Check
