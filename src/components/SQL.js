import React, { useState, useEffect } from 'react';

// Fetch tables data from the server
const fetchTablesData = async (setTables, setLoading) => {
  try {
    const response = await fetch('https://portfolio-api-server.onrender.com/tables');
    if (response.ok) {
      const data = await response.json();
      setTables(data);
    } else {
      console.error('Error fetching tables');
    }
  } catch (error) {
    console.error('Error fetching tables:', error);
  } finally {
    setLoading(false);
  }
};

// Submit the SQL query and fetch the results
const handleQuerySubmission = async (query, setQueryResults, setTableColumnsDetails) => {
  if (!query.trim()) {
    console.error("Query is empty!");
    return;
  }

  try {
    const response = await fetch('https://portfolio-api-server.onrender.com/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.data) && data.data.length > 0) {
        setQueryResults(data.data);
        if (data.table_columns_details) {
          setTableColumnsDetails(data.table_columns_details);
        }
      } else {
        setQueryResults([]);
        console.log("No results returned");
      }
    } else {
      console.error('Error executing query');
    }
  } catch (error) {
    console.error('Error executing query:', error);
  }
};

// Render the tables and columns dynamically
const renderTables = (tables) => {
  if (Object.keys(tables).length === 0) {
    return <p>No tables available</p>;
  }

  return (
    <table border="1" style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
      <thead>
        <tr>
          <th>Table Name</th>
          <th>Columns</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(tables).map(([tableName, columns], index) => (
          <tr key={index}>
            <td>{tableName}</td>
            <td>
              {columns.map((col, idx) => (
                <span key={idx}>{col.column_name}{idx < columns.length - 1 ? ', ' : ''}</span>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Render the query results in a table
const renderQueryResults = (queryResults, tableColumnsDetails) => {
  if (queryResults.length === 0) {
    return <p>No results to display</p>;
  }

  return (
    <table border="1" style={{ width: '100%', textAlign: 'left', marginTop: '20px' }}>
      <thead>
        <tr>
          {Object.keys(tableColumnsDetails).map((tableName, index) => (
            tableColumnsDetails[tableName].map((column, colIndex) => (
              <th key={`${index}-${colIndex}`}>{column[1]}</th>
            ))
          ))}
        </tr>
      </thead>
      <tbody>
        {queryResults.map((row, index) => (
          <tr key={index}>
            {row.map((value, idx) => (
              <td key={idx}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function SQL() {
  const [tables, setTables] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [query, setQuery] = useState(''); 
  const [queryResults, setQueryResults] = useState([]); 
  const [tableColumnsDetails, setTableColumnsDetails] = useState({}); 

  useEffect(() => {
    fetchTablesData(setTables, setLoading);
  }, []);

  const handleQuerySubmit = () => {
    handleQuerySubmission(query, setQueryResults, setTableColumnsDetails);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Tables in Current Database</h1>
      <div>{renderTables(tables)}</div>

      <h1>Enter Your SQL Query</h1>
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', width: '100%' }}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your SQL query"
          style={{ width: '100%', minHeight: '100px', resize: 'vertical', marginBottom: '10px', fontSize: '16px' }}
        />
        <button
          onClick={handleQuerySubmit}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer', 
            borderRadius: '5px', 
            marginTop: '10px',
          }}
        >
          Execute Query
        </button>
      </div>

      <div>{renderQueryResults(queryResults, tableColumnsDetails)}</div>
    </div>
  );
}

export default SQL;