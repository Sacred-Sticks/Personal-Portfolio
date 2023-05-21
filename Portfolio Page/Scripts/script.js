const consoleElement = document.getElementById('console');
const commands = ["overview", "projects", "open", "contact", "socials"];
var inputElement;

function handleCommand(command) {
  const [action, ...args] = command.split(' ');
  var commandRecognized = false;

  commands.forEach(option => {
    if (action === `/${option}`) {
      printOverview();
        commandRecognized = true;
      return;
    }
  });

  if (!commandRecognized)
    printToConsole('Command Not Recognized', 0);
}

function printToConsole(output, paddingLevel) {
  const outputElement = document.createElement('div');
  outputElement.classList.add('row');
  outputElement.classList.add(`py-${paddingLevel}`);
  outputElement.textContent = output;
  consoleElement.prepend(outputElement);
}

function printAllToConsole(outputLines, delay) {
  let index = 0;

  function printNextLine() {
    if (index < outputLines.length) {
      printToConsole(outputLines[index], 2);
      index++;
      setTimeout(printNextLine, delay);
    }
  }

  printNextLine();
}

function handleInput(event) {
  if (event.key !== 'Enter')
    return;
  event.preventDefault();
  const command = event.target.value;
  if (command === '')
    return;
  event.target.value = '';
  printToConsole(`> ${command}`, 0);
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
    commandElement.classList.add('text-primary')
    commandElement.classList.add('py-2');
    commandElement.textContent = "/" + command;
    commandRow.appendChild(commandElement);
    commandListParent.appendChild(commandRow);
  });
}

function printOverview() {
  const textToPrint = ["Lucas Ackman",
  "Software Engineer | Game Developer",
  "Hi, I'm Lucas Ackman, a software engineer and game developer specializing in "
  + "mathematical programming. Despite being born with a physical disability that "
  + "requires crutches for mobility, my love for computers and math led me to the "
  + "fascinating world of programming.",
  "Throughout my journey, I've completed several noteworthy projects:",
  "Kickstarter: Developed a Unity package that kickstarts projects by providing "
  + "an input manager and scriptable objects for efficient code decoupling. This "
  + "project allowed me to delve into the SOLID design principles and strengthen "
  + "my architectural skills.",
  "Blacksite Theta: Created a captivating puzzle-platformer game as a university "
  + "capstone project, where I embraced functional programming techniques.",
  "Where Silence Survives: Designed a groundbreaking virtual reality game, "
  + "challenging conventions by exploring the concept of blindness and echolocation.",
  "During my studies at the University of Wisconsin-Whitewater, I acquired proficiency "
  + "in C#, C++, Java, and the implementation of advanced systems like artificial "
  + "intelligence and pathfinding using various data structures. I've also realized "
  + "the immense power of functional programming and how it can transform the "
  + "gaming experience into something truly unique.",
  "With my personal background, having spent much of my childhood immersed in video "
  + "games, I'm driven by the desire to bring joy to others through my creations. "
  + "I aim to create games that not only entertain but also subtly educate players, "
  + "providing a seamless blend of enjoyment and learning.",
  "My approach to development revolves around adhering to the SOLID design principles, "
  + "enabling efficient bug identification and resolution. Additionally, I possess "
  + "a unique perspective on accessibility, particularly for games incorporating "
  + "physicality components, as I can provide insights on gameplay experiences "
  + "from my own disabled perspective.",
  "If you believe I could be a valuable addition to your team, please don't "
  + "hesitate to reach out to me via the contact form!"];

  printAllToConsole(textToPrint.reverse(), 250);
}

document.addEventListener('DOMContentLoaded', () => {
  assignCommandListener();
  showCommands();
});
