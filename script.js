"use strict";
let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector(".display");

// Event button click ----------------------------
function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer;
}

// event Symbol input ----------------------------
function handleSymbol(symbol) {
  switch (symbol) {
    case "AC":
      buffer = "0";
      runningTotal = 0;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }

      flushOperator(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "-":
    case "÷":
    case "×":
      handleMath(symbol);
      break;
  }
}

// event Math handler-----------------------------
function handleMath(symbol) {
  if (buffer === 0) {
    return;
  }
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperator(intBuffer);
  }
  previousOperator = symbol;
  buffer = "0";
}

function flushOperator(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "÷") {
    runningTotal /= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  }
}

function handleNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

// event bobbling ---------------------------
function init() {
  document.querySelector(".keypad").addEventListener("click", function (e) {
    buttonClick(e.target.innerText);
  });
}

init();

console.log(buffer);
