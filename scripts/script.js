let currentDisplay = "0";
let resultDisplay = false;

function appendToDisplay(value) {
  if (currentDisplay === "0" || resultDisplay) {
    if (value === "+" || value === "-" || value === "*" || value === ".") {
      currentDisplay += value;
    } else {
      currentDisplay = value;
    }
  } else {
    currentDisplay += value;
  }
  resultDisplay = false;
  updateDisplay();
}

function updateDisplay() {
  const displayElement = document.getElementById("display");
  displayElement.textContent = currentDisplay;
}

function calculateResult() {
    const displayToEval = currentDisplay.replace(/\÷|\×/, (char) => {
        if (char === '÷') {
            return '/';
        } else {
            return '*'
        }
    })
  try {
    const result = eval(displayToEval);
    currentDisplay += "\n=" + result.toString();
    updateDisplay();
  } catch (err) {
    currentDisplay += "\nError";
    updateDisplay();
  }
  resultDisplay = true;
}

function clearLastElement() {
  currentDisplay = currentDisplay.slice(0, -1);
  if (currentDisplay === "") {
    currentDisplay = "0";
  }
  updateDisplay();
}

function clearDisplay() {
  currentDisplay = "0";
  resultDisplay = false;
  updateDisplay();
}

window.addEventListener("resize", handleOverflow);
handleOverflow();
