import React from 'react';

    function ChatMessage({ sender, content, isHtml }) {
      const className = `message ${sender === 'user' ? 'user-message' : 'bot-message'}`;

      return (
        <div className={className}>
          {isHtml ? (
            // WARNING: Only use dangerouslySetInnerHTML if you trust the source
            // or have sanitized the HTML content beforehand.
            // In this simulation, we assume the generated SQL/Table is safe.
            <span dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            <span>{content}</span>
          )}
        </div>
      );
    }

    export default ChatMessage;
