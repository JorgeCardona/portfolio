import React, { useState } from 'react';
import axios from 'axios';

const ChatGPT = () => {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: inputText }]
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setResponseText(response.data.choices[0].message.content);
      setErrorText(''); // Clear any previous error message
    } catch (error) {
      console.error('Error fetching response from ChatGPT:', error);
      setErrorText(error.response ? error.response.data.error.message : 'There was an error processing your request.');
      setResponseText(''); // Clear previous response
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Chat with GPT</h2>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type your message here..."
        rows="4"
        style={{ width: '100%', padding: '10px', fontSize: '16px' }}
      />
      <button onClick={handleSendMessage} style={{ marginTop: '10px', padding: '10px', fontSize: '16px' }}>
        Send
      </button>
      <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
        <strong>Response from GPT:</strong>
        <p>{responseText}</p>
      </div>
      {errorText && (
        <div style={{ color: 'red' }}>
          <strong>Error:</strong>
          <p>{errorText}</p>
        </div>
      )}
    </div>
  );
};

export default ChatGPT;