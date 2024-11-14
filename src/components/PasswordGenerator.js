import React, { useState } from 'react';
import { GENERATE_PASSWORD_URL } from '../config';

const PasswordGenerator = () => {
  const [baseString, setBaseString] = useState('');
  const [keyString, setKeyString] = useState('');
  const [passwordLength, setPasswordLength] = useState(10);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFocus = (field) => {
    // When the field is focused, clear the previous input value.
    if (field === 'baseString' && !baseString) {
      setBaseString('');
    }
    if (field === 'keyString' && !keyString) {
      setKeyString('');
    }
  };

  const generatePassword = async () => {
    // Validate inputs
    if (!baseString || !keyString || passwordLength < 10 || passwordLength > 100) {
      setError('All fields are required, and Password Length must be between 10 and 100');
      return;
    }

    setError(''); // Clear any previous error
    setLoading(true);

    // Prepare the data to send
    const requestData = {
      base_string: baseString,
      key_string: keyString,
      password_length: passwordLength,
    };

    try {
      const response = await fetch(GENERATE_PASSWORD_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        setPassword(data.password);
      } else {
        console.error('Error generating password');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setLoading(false);
  };

  // Function to copy the password to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      alert('Password copied to clipboard!');
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', padding: '20px' }}>
      <div style={{ width: '80%', maxWidth: '100%', marginTop: '20px' }}>
        <h2>Password Generator</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error if any */}

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '2em', marginBottom: '2em' }}>
          <div style={{ flex: 2 }}>
            <label htmlFor="baseString">Base String:</label>
            <input
              type="text"
              id="baseString"
              value={baseString}
              onChange={(e) => setBaseString(e.target.value)}
              onFocus={() => handleFocus('baseString')}
              required
              minLength="1"
              style={{
                marginLeft: '0.5em',
                width: '100%',
                fontSize: '1.2em',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '1em',  // Added margin for spacing between input boxes
              }}
            />
          </div>

          <div style={{ flex: 2 }}>
            <label htmlFor="keyString">Key String:</label>
            <input
              type="text"
              id="keyString"
              value={keyString}
              onChange={(e) => setKeyString(e.target.value)}
              onFocus={() => handleFocus('keyString')}
              required
              minLength="1"
              style={{
                marginLeft: '0.5em',
                width: '100%',
                fontSize: '1.2em',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '1em',  // Added margin for spacing between input boxes
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label htmlFor="passwordLength">Password Length:</label>
            <input
              type="number"
              id="passwordLength"
              value={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
              min="20"
              max="100"
              required
              style={{
                marginLeft: '0.5em',
                width: '100%',
                fontSize: '1.2em',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '1em',  // Added margin for spacing between input boxes
              }}
            />
          </div>
        </div>

        <button onClick={generatePassword} disabled={loading} style={{
          marginBottom: '1em', fontSize: '1.2em', backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px'
        }}>
          {loading ? 'Generating...' : 'Generate Password'}
        </button>

        {password && (
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <h3 style={{ color: 'blue', marginRight: '10px' }}>Generated Password:</h3>
            <input
              type="text"
              value={password}
              readOnly
              style={{
                flex: 1,
                backgroundColor: '#f0f0f0',
                border: '1px solid #ccc',
                padding: '10px',
                color: 'red',  // Red color for the password
                fontSize: '1.1em',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                textAlign: 'center',  // Center the text inside the box
              }}
            />
            <button onClick={copyToClipboard} style={{
              fontSize: '1.2em', marginLeft: '10px', backgroundColor: 'orange', color: 'white', padding: '10px', borderRadius: '5px'
            }}>
              Copy
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordGenerator;