import React, { useState, useCallback } from 'react';
    import AccountIndicator from '../components/AccountIndicator';
    import ConnectionPanel from '../components/ConnectionPanel';
    import ChatContainer from '../components/ChatContainer';

    // Keep mock data outside component for persistence across renders
    const mockSchema = {
        users: [ { column: 'user_id', type: 'INT', constraints: 'PK' }, { column: 'username', type: 'VARCHAR(50)', constraints: 'UNIQUE' }, { column: 'email', type: 'VARCHAR(100)', constraints: 'UNIQUE' }, { column: 'created_at', type: 'TIMESTAMP', constraints: '' } ],
        products: [ { column: 'product_id', type: 'INT', constraints: 'PK' }, { column: 'name', type: 'VARCHAR(100)', constraints: '' }, { column: 'price', type: 'DECIMAL(10, 2)', constraints: '' }, { column: 'stock', type: 'INT', constraints: '' } ],
        orders: [ { column: 'order_id', type: 'INT', constraints: 'PK' }, { column: 'user_id', type: 'INT', constraints: 'FK(users)' }, { column: 'order_date', type: 'TIMESTAMP', constraints: '' }, { column: 'total_amount', type: 'DECIMAL(12, 2)', constraints: '' } ]
    };
    const mockData = {
        users: [ { user_id: 1, username: 'alice_k', email: 'alice@example.com', created_at: '2023-01-15 10:00:00' }, { user_id: 2, username: 'bob_the_dev', email: 'bob@example.dev', created_at: '2023-02-20 11:30:00' }, { user_id: 3, username: 'charlie_c', email: 'charlie@sample.net', created_at: '2023-03-25 14:15:00' } ],
        products: [ { product_id: 101, name: 'Laptop Pro', price: 1200.00, stock: 50 }, { product_id: 102, name: 'Wireless Mouse', price: 25.50, stock: 200 }, { product_id: 103, name: 'Keyboard Lite', price: 45.00, stock: 150 }, { product_id: 104, name: 'Webcam HD', price: 60.00, stock: 80 }, { product_id: 105, name: 'Monitor 24"', price: 199.99, stock: 30 } ],
        orders: [ { order_id: 501, user_id: 1, order_date: '2023-10-01 09:30:00', total_amount: 1225.50 }, { order_id: 502, user_id: 3, order_date: '2023-10-05 11:00:00', total_amount: 45.00 }, { order_id: 503, user_id: 1, order_date: '2023-10-06 15:00:00', total_amount: 60.00 }, { order_id: 504, user_id: 2, order_date: '2023-10-10 16:45:00', total_amount: 225.49 } ]
    };


    function MainLayout({ userEmail, onLogout }) {
      const [connectionDetails, setConnectionDetails] = useState(null); // Store { name, host, ... }
      const [connectionStatus, setConnectionStatus] = useState('disconnected'); // 'disconnected', 'connecting', 'connected', 'error'
      const [connectionError, setConnectionError] = useState('');

      const handleConnect = useCallback((details) => {
        setConnectionStatus('connecting');
        setConnectionError('');
        console.log("Attempting connection with:", details);

        // Simulate connection delay
        setTimeout(() => {
          // Simulate success/failure (basic validation)
          if (details.database && details.user) {
            setConnectionDetails(details);
            setConnectionStatus('connected');
            console.log("Connection successful");
          } else {
            setConnectionStatus('error');
            setConnectionError('Database and User are required.');
            console.log("Connection failed");
          }
        }, 1500);
      }, []); // Empty dependency array means this function is created once

      return (
        <div className="app-container">
          <AccountIndicator userEmail={userEmail} onLogout={onLogout} />
          <ConnectionPanel
            onConnect={handleConnect}
            status={connectionStatus}
            error={connectionError}
          />
          <ChatContainer
            isConnected={connectionStatus === 'connected'}
            mockSchema={mockSchema} // Pass mock data down
            mockData={mockData}     // Pass mock data down
          />
        </div>
      );
    }

    export default MainLayout;
