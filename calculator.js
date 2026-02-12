let currentDisplay = "";
let justCalculated = false;

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".button");

function updateDisplay() {
  display.value = currentDisplay;
}

// Handle button clicks
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    const operators = ["+", "-", "*", "/"];

    if (value === "C") {
      currentDisplay = "";
      justCalculated = false;
    } else if (value === "back") {
      currentDisplay = currentDisplay.slice(0, -1);
    } else if (value === "=") {
      if (currentDisplay.trim() === "") {
        currentDisplay = "";
      } else {
        try {
          currentDisplay = eval(currentDisplay).toString();
        } catch {
          currentDisplay = "Error";
        }
      }
      justCalculated = true;
    } else {
      // Reset display if a number is pressed after calculation
      if (justCalculated && !operators.includes(value)) {
        currentDisplay = "";
        justCalculated = false;
      }

      // Prevent double operators
      const lastChar = currentDisplay.slice(-1);
      if (operators.includes(lastChar) && operators.includes(value)) {
        return;
      }

      currentDisplay += value;
      justCalculated = false;
    }

    updateDisplay();
  });
});

// Handle keyboard input
document.addEventListener("keydown", (event) => {
  const key = event.key;
  const operators = ["+", "-", "*", "/"];

  if (!isNaN(key) || key === ".") {
    if (justCalculated) {
      currentDisplay = "";
      justCalculated = false;
    }
    currentDisplay += key;
  } else if (operators.includes(key)) {
    const lastChar = currentDisplay.slice(-1);
    if (operators.includes(lastChar)) return; // prevent double operator
    currentDisplay += key;
    justCalculated = false;
  } else if (key === "Enter") {
    if (currentDisplay.trim() === "") {
      currentDisplay = "";
    } else {
      try {
        currentDisplay = eval(currentDisplay).toString();
      } catch {
        currentDisplay = "Error";
      }
    }
    justCalculated = true;
  } else if (key === "Backspace") {
    currentDisplay = currentDisplay.slice(0, -1);
  } else if (key === "Escape") {
    currentDisplay = "";
    justCalculated = false;
  }

  updateDisplay();
});
