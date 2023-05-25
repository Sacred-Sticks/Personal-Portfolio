const consoleElement = document.getElementById('console');
const commands = ["overview", "projects", "open", "contact", "socials"];
const projects = ["kickstarter", "blacksite-theta", "where-silence-survives"]
const overview = document.getElementById('overview');
const contact = document.getElementById('contact');
const socials = document.getElementById('socials');
const kickstarter = document.getElementById('p.kickstarter');
const blacksiteTheta = document.getElementById('p.blacksite-theta');
const whereSilenceSurvives = document.getElementById('p.where-silence-survives');
const buttons = document.querySelectorAll('.window-closer');
const panelMap = new Map();
const projectMap = new Map();
var panels;
var inputElement;

function handleCommand(command) {
  const [action, ...args] = command.split(' ');
  var commandRecognized = false;

  commands.forEach(option => {
    if (action === `/${option}`) {
    commandRecognized = true;
      if (option === commands[1])
      {
        printAllProjects();
        return;
      }
      const value = GetTarget(option, args);
      if (!value)
        return;

      value.classList.remove('hidden');
      inputElement.disabled = true;
      return;
    }
  });

  if (!commandRecognized)
    printToConsole('Command Not Recognized');
}

function GetTarget(option, args) {
  if (option === commands[2])
  {
    if (projectMap.has(args[0]))
      return projectMap.get(args[0]);
    else {
      printToConsole(`${args[0]} could not be found`);
      return;
    }
  }
  else {
    return panelMap.get(option);
  }
}

function printToConsole(output) {
  const outputElement = document.createElement('div');
  outputElement.classList.add('row');
  outputElement.textContent = output;
  consoleElement.prepend(outputElement);
}

function printAllProjects() {
  var index = 0;

  function writeNextLine() {
    if (index == projects.length)
      return;
    printToConsole(projects[index]);
    index++;
    setTimeout(writeNextLine, 500);
  }

  writeNextLine();
}

function handleInput(event) {
  if (event.key !== 'Enter')
    return;
  event.preventDefault();
  const command = event.target.value;
  if (command === '')
    return;
  event.target.value = '';
  printToConsole(`> ${command}`);
  inputElement.blur();
  setTimeout(() => {
    handleCommand(command);
  }, 500);
}

function assignCommandListener() {
  inputElement = document.getElementById('commandInput');
  inputElement.addEventListener('keydown', handleInput);
  inputElement.focus();
}

function showCommands() {
  const commandListParent = document.getElementById('commandList');
  commands.forEach(command => {
    const commandRow = document.createElement('div');
    commandRow.classList.add('row');
    const commandElement = document.createElement('div');
    commandElement.classList.add('text-center');
    commandElement.classList.add('text-secondary')
    commandElement.classList.add('py-2');
    commandElement.classList.add('text-truncate');
    commandElement.textContent = "/" + command;
    commandRow.appendChild(commandElement);
    commandListParent.appendChild(commandRow);
  });
}

function assignPanels() {
  panels = [overview, contact, socials, kickstarter];
  panelMap.set(commands[0], overview);
  panelMap.set(commands[3], contact);
  panelMap.set(commands[4], socials);
  panelMap.set(`${commands[2]} kickstarter`, kickstarter);
}

function assignProjects() {
  projectMap.set(projects[0], kickstarter);
  projectMap.set(projects[1], blacksiteTheta);
  projectMap.set(projects[2], whereSilenceSurvives);
}

function assignButtons() {
  buttons.forEach(button => {
    button.onclick = function() {
      button.parentElement.parentElement.parentElement.parentElement.classList.add('hidden');
      inputElement.disabled = false;
      inputElement.focus();
      console.log('pressed');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  assignCommandListener();
  assignPanels();
  assignProjects();
  showCommands();
  assignButtons();
});
