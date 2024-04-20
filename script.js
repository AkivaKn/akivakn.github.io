let currentDisplay = "0";
let resultDisplay = false;
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function appendToDisplay(value) {
  if (
    value === "+" ||
    value === "-" ||
    value === "×" ||
    value === "." ||
    value === "÷"
  ) {
    if (numbers.includes(currentDisplay.slice(-1))) {
      currentDisplay += value;
    } else {
      currentDisplay = currentDisplay.slice(0, -1) + value;
    }
  } else {
    if (currentDisplay === "0" || resultDisplay) {
      currentDisplay = value;
    } else {
      currentDisplay += value;
    }
  }
  resultDisplay = false;
  updateDisplay();
}

function updateDisplay() {
  const displayElement = document.getElementById("display");
  if (
    /[÷×\-+]/.test(currentDisplay.slice(-1)) ||
    resultDisplay ||
    !/[÷×\-+]/.test(currentDisplay)
  ) {
    displayElement.textContent = currentDisplay;
  } else {
    const displayToEval = currentDisplay.replace(/\÷|\×/g, (char) => {
      if (char === "÷") {
        return "/";
      } else {
        return "*";
      }
    });
    const result = eval(displayToEval);
    displayElement.innerHTML = currentDisplay + "<br>" + result.toString();
  }
}

function calculateResult() {
  const displayToEval = currentDisplay.replace(/\÷|\×/, (char) => {
    if (char === "÷") {
      return "/";
    } else {
      return "*";
    }
  });
  try {
    const result = eval(displayToEval);
    currentDisplay = result.toString();
    resultDisplay = true;
    updateDisplay();
  } catch (err) {
    currentDisplay += "\nError";
    updateDisplay();
  }
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
