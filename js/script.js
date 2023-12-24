document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = function(event) {
      const content = event.target.result;
      try {
        const data = JSON.parse(content);
        displayJSON(data);
      } catch (error) {
        displayError('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  });
  
  function displayJSON(data) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';
  
    const formattedData = JSON.stringify(data, null, 2);
    const formattedHTML = `<pre>${formattedData}</pre>`;
    outputDiv.innerHTML = formattedHTML;
  }
  
  function displayError(message) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `<p id="error">${message}</p>`;
  }
  