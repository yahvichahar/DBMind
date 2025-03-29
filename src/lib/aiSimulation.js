// --- AI Simulation & Data Formatting Logic ---
    // Extracted from the original script.js and adapted for React

    function formatResultsToTable(results) {
      if (!results || results.length === 0) {
        return "No results found.";
      }
      const headers = Object.keys(results[0]);
      const colWidths = headers.map(header => header.length);
      results.forEach(row => {
        headers.forEach((header, i) => {
          const value = String(row[header] ?? ''); // Handle null/undefined
          if (value.length > colWidths[i]) { colWidths[i] = value.length; }
        });
      });
      let tableString = headers.map((header, i) => header.padEnd(colWidths[i])).join(' | ') + '\n';
      tableString += headers.map((_, i) => '-'.repeat(colWidths[i])).join('-|-') + '\n';
      results.forEach(row => {
        tableString += headers.map((header, i) => String(row[header] ?? '').padEnd(colWidths[i])).join(' | ') + '\n';
      });
      return tableString.trim();
    }

     function formatSchemaToText(tableName, columns) {
        let response = `Structure for table "${tableName}":\n`;
        response += "------------------------------------\n";
        response += "Column        | Type            | Constraints\n";
        response += "------------------------------------\n";
        columns.forEach(col => {
            const name = col.column.padEnd(13);
            const type = col.type.padEnd(15);
            const constraints = col.constraints || '';
            response += `${name} | ${type} | ${constraints}\n`;
        });
        response += "------------------------------------";
        return response;
    }

    // Main simulation function - takes text and mock data, returns response object
    export function processWithSimulatedAI(userText, mockSchema, mockData) {
      const lowerText = userText.toLowerCase();
      let generatedSql = null;
      let results = null;
      let message = "Sorry, I couldn't understand that request. Try 'show tables' or 'describe [table_name]'.";
      let isHtmlResponse = false; // Flag if response contains HTML (SQL block)

      try {
        // Describe table
        if (lowerText.startsWith('describe ') || lowerText.startsWith('show structure of ') || lowerText.includes('schema about employees')) {
            let tableName = 'users'; // Default or guess
             if (lowerText.startsWith('describe ') || lowerText.startsWith('show structure of ')) { const parts = lowerText.split(' '); tableName = parts[parts.length - 1]; }
             else if (lowerText.includes('employees')) { tableName = 'users'; generatedSql = `DESCRIBE users; -- Simulating schema for employees`; }

            if (mockSchema[tableName]) {
                message = formatSchemaToText(tableName, mockSchema[tableName]);
                if (!generatedSql) generatedSql = `DESCRIBE ${tableName};`;
            } else { message = `Table "${tableName}" not found.`; }
        }
        // Show tables
        else if (lowerText === 'show tables' || lowerText === 'list tables') {
            const tableNames = Object.keys(mockSchema);
            message = `Available tables:\n- ${tableNames.join('\n- ')}`;
            generatedSql = `SHOW TABLES;`;
        }
        // Create View Example
        else if (lowerText.includes('create a view') && lowerText.includes('mysql')) {
             generatedSql = `CREATE VIEW UserEmails AS\nSELECT user_id, email\nFROM users\nWHERE email IS NOT NULL;`;
             message = `Okay, here's an example of how you might create a view in MySQL to show user IDs and emails. Remember to adapt it to your specific needs.`;
        }
        // Show all users
        else if (lowerText.includes('show all users') || lowerText.includes('list all users')) {
            generatedSql = `SELECT user_id, username, email FROM users;`;
            results = mockData.users.map(({ user_id, username, email }) => ({ user_id, username, email }));
            message = formatResultsToTable(results);
        }
        // Show all products
        else if (lowerText.includes('show all products') || lowerText.includes('list all products')) {
            generatedSql = `SELECT product_id, name, price, stock FROM products;`;
            results = mockData.products;
            message = formatResultsToTable(results);
        }
         // Find products by price
        else if (lowerText.includes('product') && (lowerText.includes('under') || lowerText.includes('<') || lowerText.includes('cheaper than'))) {
            const match = lowerText.match(/(\d+(\.\d+)?)/);
            if (match) {
                const priceLimit = parseFloat(match[0]);
                generatedSql = `SELECT product_id, name, price FROM products WHERE price < ${priceLimit.toFixed(2)};`;
                results = mockData.products.filter(p => p.price < priceLimit).map(({ product_id, name, price }) => ({ product_id, name, price }));
                message = formatResultsToTable(results);
            } else { message = "Please specify a price limit (e.g., 'products under 50')."; }
        }
        // Find user by username
        else if (lowerText.startsWith('find user ') || lowerText.startsWith('get user ')) {
             const username = userText.substring(userText.indexOf(' ')+1).trim();
             // IMPORTANT: Escape user input in real SQL! This is just simulation.
             const safeUsername = username.replace(/'/g, "''");
             generatedSql = `SELECT user_id, username, email FROM users WHERE username = '${safeUsername}';`;
             results = mockData.users.filter(u => u.username.toLowerCase() === username.toLowerCase());
             message = formatResultsToTable(results);
        }
        // Basic greetings
        else if (lowerText.includes('hello') || lowerText.includes('hi')) {
            message = `Hello there! How can I help with SQL today?`;
        }

      } catch (error) {
          console.error("Simulation Error:", error);
          message = "An error occurred while processing your request.";
      }

      // --- Format Response ---
      let responseContent = message;
      if (generatedSql) {
        // Use HTML for SQL block + message
        // Basic escaping for the SQL string itself before putting in HTML
        const escapedSql = generatedSql.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        responseContent = `<div class="sql-query">${escapedSql}</div>\n${message}`;
        isHtmlResponse = true;
      }

      return {
          content: responseContent,
          isHtml: isHtmlResponse
      };
    }
