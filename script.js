let currentDisplay = "0";
let resultDisplay = false;

function appendToDisplay(value) {
  if (currentDisplay === "0" || resultDisplay) {
    if (
      value === "+" ||
      value === "-" ||
      value === "×" ||
      value === "." ||
      value === "÷"
    ) {
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
  if (/[÷×\-+]/.test(currentDisplay.slice(-1)) || resultDisplay || !/[÷×\-+]/.test(currentDisplay)) {
    displayElement.textContent = currentDisplay;
  } else {
    const displayToEval = currentDisplay.replace(/\÷|\×/, (char) => {
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

