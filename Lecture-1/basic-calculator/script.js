// TODO :
// - Make Efficient and remove redudant code
// - Handle decimal value
// - Handle Digit enter after last digit is 0 


const display = document.getElementById('display');

// define initial value 
display.value = '0'

// Track result status, whether it's shown or not
let isResult = false;

// Check for events
document.querySelectorAll('.btn').forEach(
    button => {
        button.onclick = () => { // Fix: Corrected typo from "onlcick" to "onclick"
            // Check if the pressed button is "Clear" button
            if (button.innerText === 'C') {
                display.value = '0'; // Clear the display
                isResult = false; // Reset result flag
            }

            // Check if the pressed button is evaluate expression button
            else if (button.innerText === '=') {
                try {
                    // Evaluate the expression in the display
                    display.value = eval(display.value);
                    isResult = true; // Set result flag after evaluation
                } catch (error) {
                    // Show error if eval fails
                    display.value = `Error :/`;
                    isResult = false;
                }
            }

            // Check for backspace
            else if (button.innerText === "backspace") { 
                if (isResult){
                    display.value = '0';
                }
                else {
                    display.value = display.value.slice(0, -1); // Remove last character

                }
            }

            // Check for digits or expressions
            else {
                const operators = ['+', '-', '/', '*']; // List of operators

                // If the result is shown and a button is pressed, decide what to do
                if (isResult) { 
                    // If the button is not an operator, start a new calculation
                    if (operators.includes(button.innerText)) {
                        display.value += button.innerText;
                        isResult = false; // Reset result flag
                    }
                    else {
                        display.value = button.innerText;
                        isResult = false;
                    }
                }
                else { 
                    if (display.value === '0' && !operators.includes(button.innerText)){
                        display.value = button.innerText;
                    }
                    else{
                        if (display.value.charAt(display.value.length - 1) === '0'){
                            if (button.innerText === '.'){
                                display.value += button.value;
                            }
                            else{
                                return ;
                            }
                        }
                        else if (display.value.charAt(display.value.length - 1) === '.' && button.innerText == '.'){
                            return;
                        }
                        else {
                            display.value += button.innerText; // Add the value of the button to the display
                        }
                    }
                }
            }
        };
    }
);
