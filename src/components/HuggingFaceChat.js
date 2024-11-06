import React, { useState } from 'react';
import axios from 'axios';

const HuggingFaceChat = () => {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = async () => {
    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/gpt2',
        { inputs: inputText },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setResponseText(response.data[0].generated_text);
    } catch (error) {
      console.error('Error fetching response from Hugging Face:', error);
      // Imprime el mensaje de error recibido
      setResponseText(`Error: ${error.response ? error.response.data : error.message}`);
    }
  };

  return (
    <div>
      <h2>Chat with Hugging Face</h2>
      <textarea value={inputText} onChange={handleInputChange} />
      <button onClick={handleSendMessage}> Send</button>
      <p>{responseText}</p>
    </div>
  );
};

export default HuggingFaceChat;