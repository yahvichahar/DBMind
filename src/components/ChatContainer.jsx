import React, { useState, useRef, useEffect } from 'react';
    import WelcomeScreen from './WelcomeScreen';
    import ChatMessage from './ChatMessage';
    import { processWithSimulatedAI } from '../lib/aiSimulation'; // Import simulation logic

    function ChatContainer({ isConnected, mockSchema, mockData }) {
      const [messages, setMessages] = useState([]);
      const [userInput, setUserInput] = useState('');
      const messagesEndRef = useRef(null); // To scroll to bottom

      const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      };

      useEffect(scrollToBottom, [messages]); // Scroll whenever messages change

      const addMessage = (sender, content, isHtml = false) => {
        setMessages(prev => [...prev, { sender, content, isHtml, id: Date.now() + Math.random() }]);
      };

      const handleSendMessage = () => {
        const text = userInput.trim();
        if (text === '' || !isConnected) return;

        addMessage('user', text);
        setUserInput('');

        // Simulate bot response
        setTimeout(() => {
          const aiResponse = processWithSimulatedAI(text, mockSchema, mockData); // Pass mock data
          addMessage('bot', aiResponse.content, aiResponse.isHtml);
        }, 800 + Math.random() * 700);
      };

      const handleExampleClick = (prompt) => {
          if (isConnected) {
              setUserInput(prompt);
              // Optionally send the message immediately
              // handleSendMessage(); // Uncomment if you want clicking example to send it
          }
      }

      const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault(); // Prevent newline on enter
          handleSendMessage();
        }
      };

      const showWelcome = !isConnected || messages.length === 0;

      return (
        <div className={`chat-container ${!isConnected ? 'disabled' : ''}`}>
          <div className="chat-header">DBMind</div>
          <div className={`chat-messages ${showWelcome ? 'is-empty' : ''}`}>
            {showWelcome ? (
              <WelcomeScreen onExampleClick={handleExampleClick} disabled={!isConnected} />
            ) : (
              messages.map(msg => <ChatMessage key={msg.id} {...msg} />)
            )}
            <div ref={messagesEndRef} /> {/* Invisible element to scroll to */}
          </div>
          <div className="chat-input-area">
            <input
              type="text"
              placeholder={isConnected ? 'Ask me about SQL...' : 'Connect first...'}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={!isConnected}
            />
            <button onClick={handleSendMessage} disabled={!isConnected || userInput.trim() === ''}>
              Send
            </button>
          </div>
        </div>
      );
    }

    export default ChatContainer;
