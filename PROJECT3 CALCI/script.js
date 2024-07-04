class Calculator {
  constructor(previousoperandText, currentoperandText) {
    this.previousoperandText = previousoperandText;
    this.currentoperandText = currentoperandText;
    this.clear(); // default will be a clear display
  }

  clear() { // this will clear display area
    this.currentoperand = '';
    this.previousoperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentoperand = this.currentoperand.toString().slice(0, -1); // remove the last character
  }

  appendNumber(number) {
    if (number === '.' && this.currentoperand.includes('.')) return; // if dot(.) is already in the string then it will not execute code hence no change in output
    this.currentoperand = this.currentoperand.toString() + number.toString(); // output by concatenating by converting it to string for multiple digits
  }

  chooseOperation(operation) {
    if (this.currentoperand === '') return;
    if (this.previousoperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousoperand = this.currentoperand+operation;
    this.currentoperand = '';
  }

  compute() {
    let answer;
    const prev = parseFloat(this.previousoperand);
    const current = parseFloat(this.currentoperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        answer = prev + current;
        break;
      case '-':
        answer = prev - current;
        break;
      case '*':
        answer = prev * current;
        break;
      case '/':
        answer = prev / current;
        break;
      default:
        return;
    }
    this.currentoperand = answer;
    this.operation = undefined;
    this.previousoperand = '';
  }

  updateDisplay() {
    this.currentoperandText.innerText = this.currentoperand;
    this.previousoperandText.innerText = this.previousoperand;
  }
}

const currentoperandText = document.getElementById('current-operand');
const previousoperandText = document.getElementById('previous-operand');
const equalBtn = document.getElementById('equal');
const allclearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const dotBtn = document.getElementById('dot');
const numberBtn = document.querySelectorAll('.numb');
const operationBtn = document.querySelectorAll('.operation');

const calculator = new Calculator(previousoperandText, currentoperandText);

numberBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationBtn.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalBtn.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
});

allclearBtn.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtn.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
});
