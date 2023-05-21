// DOM elements
const consoleElement = document.getElementById('console');

// Command handling
function handleCommand(command) {
  const [action, ...args] = command.split(' ');

  switch (action) {
    case '/open':
      const projectId = args[0];
      // Open project logic
      // You can dynamically create project details and append them to the consoleElement
      break;
    case '/contact':
      // Open contact form logic
      break;
    case '/toggle':
      const toggleId = args[0];
      // Toggle element logic
      break;
    default:
      printToConsole('Command not recognized.');
      break;
  }
}

// Command output
function printToConsole(output) {
  const outputElement = document.createElement('div');
  outputElement.textContent = output;
  consoleElement.appendChild(outputElement);
  consoleElement.scrollTop = consoleElement.scrollHeight; // Auto-scroll to the bottom
}

// Command input handling
function handleInput(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const command = event.target.value;
    event.target.value = '';
    printToConsole(`> ${command}`);
    handleCommand(command);
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  const inputElement = document.createElement('input');
  inputElement.type = 'text';
  inputElement.addEventListener('keydown', handleInput);
  consoleElement.appendChild(inputElement);
  inputElement.focus();
});
