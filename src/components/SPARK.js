import React, { useEffect, useState } from 'react';

function SPARK() {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    // Fetch the HTML file from the GitHub raw URL
    fetch('https://raw.githubusercontent.com/JorgeCardona/dockerhub-datascience-mlops/refs/heads/main/Notebooks/Lake_House/Delta_Spark.html')
      .then(response => response.text()) // Convert the response to text
      .then(data => setHtmlContent(data)) // Store the HTML content in the state
      .catch(error => console.error("Error fetching HTML file: ", error));
  }, []);

  return (
    <div>
      {/* Render the raw HTML content with inline styles to left align */}
      <div 
        dangerouslySetInnerHTML={{ __html: htmlContent }} 
        style={{ textAlign: "left" }} 
      />
    </div>
  );
}

export default SPARK;