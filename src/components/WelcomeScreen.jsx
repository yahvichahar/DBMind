import React from 'react';

    function WelcomeScreen({ onExampleClick, disabled }) {
      const examples = [
        { prompt: "Give me an example schema about employees", text: '"Give me an example schema about employees" →' },
        { prompt: "How to create a view in MySQL?", text: '"How to create a view in MySQL?" →' },
      ];

      return (
        <div className="welcome-screen">
          <div className="category-column">
            <div className="category-title">🌞 Examples</div>
            {examples.map(ex => (
               <button
                 key={ex.prompt}
                 className="example-button"
                 onClick={() => onExampleClick(ex.prompt)}
                 disabled={disabled}
               >
                 {ex.text}
               </button>
            ))}
          </div>
          <div className="category-column">
            <div className="category-title">⚡ Capabilities</div>
            <div className="info-box">Remembers what user said earlier in the conversation</div>
            <div className="info-box">Allows user to provide follow-up corrections</div>
          </div>
          <div className="category-column">
            <div className="category-title">🙂 Limitations</div>
            <div className="info-box">May occasionally generate incorrect information</div>
            <div className="info-box">May occasionally produce harmful instructions or biased content</div>
          </div>
        </div>
      );
    }

    export default WelcomeScreen;
