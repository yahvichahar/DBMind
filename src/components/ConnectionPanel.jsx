import React, { useState, useEffect } from 'react';

    function ConnectionPanel({ onConnect, status, error }) {
      const [connName, setConnName] = useState('');
      const [host, setHost] = useState('localhost');
      const [port, setPort] = useState('5432');
      const [user, setUser] = useState('');
      const [password, setPassword] = useState('');
      const [database, setDatabase] = useState('');

      const isConnecting = status === 'connecting';
      const isConnected = status === 'connected';

      const handleSubmit = (event) => {
        event.preventDefault();
        if (!isConnecting && !isConnected) {
             onConnect({ name: connName, host, port, user, password, database });
        }
      };

      const getStatusClass = () => {
          if (status === 'connected') return 'connected';
          if (status === 'error') return 'error';
          if (status === 'connecting') return 'connecting';
          return '';
      }

      const getStatusText = () => {
          if (status === 'connected') return `Connected to ${connName || database || 'DB'}`;
          if (status === 'error') return `Error: ${error || 'Connection Failed'}`;
          if (status === 'connecting') return 'Connecting...';
          return 'Disconnected';
      }

      return (
        <div className="connection-panel">
          <h2>Database Connection</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="conn-name">Name:</label>
              <input type="text" id="conn-name" placeholder="e.g., My Local DB" value={connName} onChange={e => setConnName(e.target.value)} disabled={isConnecting || isConnected} />
            </div>
            <div className="form-group">
              <label htmlFor="conn-host">Host:</label>
              <input type="text" id="conn-host" value={host} onChange={e => setHost(e.target.value)} disabled={isConnecting || isConnected} />
            </div>
            <div className="form-group">
              <label htmlFor="conn-port">Port:</label>
              <input type="number" id="conn-port" value={port} onChange={e => setPort(e.target.value)} disabled={isConnecting || isConnected} />
            </div>
            <div className="form-group">
              <label htmlFor="conn-user">User:</label>
              <input type="text" id="conn-user" placeholder="db_user" value={user} onChange={e => setUser(e.target.value)} required disabled={isConnecting || isConnected} />
            </div>
            <div className="form-group">
              <label htmlFor="conn-password">Password:</label>
              <input type="password" id="conn-password" value={password} onChange={e => setPassword(e.target.value)} disabled={isConnecting || isConnected} />
            </div>
            <div className="form-group">
              <label htmlFor="conn-database">Database:</label>
              <input type="text" id="conn-database" placeholder="my_database" value={database} onChange={e => setDatabase(e.target.value)} required disabled={isConnecting || isConnected} />
            </div>
            <button type="submit" className="connect-button" disabled={isConnecting || isConnected}>
              {isConnected ? 'Connected' : (isConnecting ? 'Connecting...' : 'Connect')}
            </button>
          </form>
          <div className={`connection-status ${getStatusClass()}`}>
            Status: {getStatusText()}
          </div>
        </div>
      );
    }

    export default ConnectionPanel;
