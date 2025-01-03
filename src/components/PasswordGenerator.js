import React, { useState } from 'react';
import { GENERATE_PASSWORD_URL } from '../config';
import './styles.css'; // Asegúrate de que este archivo esté importado en tu proyecto

const PasswordGenerator = () => {
  const [baseString, setBaseString] = useState('');
  const [keyString, setKeyString] = useState('');
  const [passwordLength, setPasswordLength] = useState(10);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  const handleFocus = (field) => {
    if (field === 'baseString' && !baseString) {
      setBaseString('');
    }
    if (field === 'keyString' && !keyString) {
      setKeyString('');
    }
  };

  const generatePassword = async () => {
    if (!baseString || !keyString || passwordLength < 10 || passwordLength > 100) {
      setError('All fields are required, and Password Length must be between 10 and 100');
      return;
    }

    setError('');
    setLoading(true);
    setCopyMessage('');

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      setCopyMessage('Password copied to clipboard!');
      setTimeout(() => setCopyMessage(''), 2000); // Limpiar el mensaje después de 2 segundos
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', padding: '20px', overflowX: 'hidden' }}>
      <div style={{ width: '80%', maxWidth: '100%', marginTop: '20px' }}>
        <h2>Password Generator</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

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
                width: 'calc(100% - 20px)',
                fontSize: '1.2em',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '1em',
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
                width: 'calc(100% - 20px)',
                fontSize: '1.2em',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '1em',
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
              min="10"
              max="100"
              required
              style={{
                width: 'calc(100% - 20px)',
                fontSize: '1.2em',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '1em',
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
                color: 'red',
                fontSize: '1.1em',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                textAlign: 'center',
              }}
            />
            <button onClick={copyToClipboard} style={{
              fontSize: '1.2em', marginLeft: '10px', backgroundColor: 'orange', color: 'white', padding: '10px', borderRadius: '5px'
            }}>
              Copy
            </button>
          </div>
        )}

        {copyMessage && <p style={{ color: 'green', marginTop: '10px' }}>{copyMessage}</p>}
      </div>
    </div>
  );
};

export default PasswordGenerator;