// get the dom
const display = document.getElementById('display');

// initalized the display value and isResult flag
display.value = '0';
let isResult = false;

// define constant operator
const isOperator = (value) => {
    return ['+', '-', '/', '*'].includes(value);
};

// reset dispaly
const resetDisplay = () => {
    display.value = '0';
    isResult = false;
};

// Evaluate Expression
const evaluateExpression = () =>{
    try {
        display.value = eval(display.value);
        isResult = true;
    } catch (error) {
        display.value = 'Error :/';
        isResult = false;
    }
};

// handleBackspace logic
const handleBackspace = () =>{
    let expressionLength = display.value.length;
    display.value = isResult ? '0' : display.value.slice(0, expressionLength - 1);
    isResult = false;
};

// handling decimal values
const handleDecimal = (value) => {
    if (!isResult){
        const lastSegment = display.value.split(/[\+\-\*\/]/).pop();
        if (!lastSegment.includes('.')){
            display.value += value;
        }
    }
};

// append digits
const appendDigits = (value) => {
    let expressionLength = display.value.length;
    let lastChar = display.value.charAt(expressionLength - 1);

    if (display.value === '0' && !isOperator(value)){
        display.value = value;
    } else {
        if (isOperator(lastChar) && isOperator(value)){
            return;
        } else {
            display.value += value;
        }
    }
};

// start with calculator logic
document.querySelectorAll('.btn').forEach( button => {
    button.onclick = () =>{
        if (button.innerText === 'C') resetDisplay();
        else if (button.innerText === '=') evaluateExpression();
        else if (button.innerText === 'backspace') handleBackspace();
        else if (button.innerText === '.') handleDecimal(button.innerText);
        else if (isResult) { 
            isResult = false;
            isOperator(button.innerText) ? appendDigits(button.innerText) : display.value = button.innerText;
        } else {
            appendDigits(button.innerText);
        }
    };
});
