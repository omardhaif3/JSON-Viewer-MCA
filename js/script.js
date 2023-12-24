document.addEventListener('DOMContentLoaded', function() {
  const fileInput = document.getElementById('fileInput');
  const dataBlocksContainer = document.getElementById('dataBlocks');
  const errorElement = document.getElementById('error');

  fileInput.addEventListener('change', handleFileSelect);
  document.getElementById('addBlock').addEventListener('click', addBlock);
  document.getElementById('deleteBlock').addEventListener('click', deleteBlock);
  document.getElementById('saveFile').addEventListener('click', saveFile);

  let jsonData = null;

  function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
      const content = event.target.result;
      try {
        jsonData = JSON.parse(content);
        displayJSON(jsonData);
      } catch (error) {
        displayError('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  }

  function displayJSON(data) {
    dataBlocksContainer.innerHTML = '';
    if (!data) return;

    // Displaying the JSON data
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const block = document.createElement('div');
        block.classList.add('data-block');
        block.textContent = `${key}: ${JSON.stringify(data[key])}`;
        dataBlocksContainer.appendChild(block);
      }
    }
  }

  function displayError(message) {
    errorElement.textContent = message;
  }

  function addBlock() {
    if (!jsonData) {
      displayError('Please load a JSON file first');
      return;
    }

    // Logic to add a new block
    const newKey = prompt('Enter new key:');
    const newValue = prompt('Enter value for the key:');
    if (newKey && newValue) {
      jsonData[newKey] = newValue;
      displayJSON(jsonData);
    } else {
      displayError('Invalid input');
    }
  }

  function deleteBlock() {
    if (!jsonData) {
      displayError('Please load a JSON file first');
      return;
    }

    // Logic to delete a block
    const keyToDelete = prompt('Enter key to delete:');
    if (keyToDelete && jsonData.hasOwnProperty(keyToDelete)) {
      delete jsonData[keyToDelete];
      displayJSON(jsonData);
    } else {
      displayError('Key not found');
    }
  }

  function saveFile() {
    if (!jsonData) {
      displayError('No data to save');
      return;
    }

    // Logic to save the JSON file
    const jsonDataString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonDataString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'modified_data.json';
    document.body.appendChild(link);
    link.click();

    setTimeout(function() {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
});
