const display = document.getElementById('display')

// define the event handler
const buttons = document.querySelectorAll('.btn')
buttons.forEach( button => {
    button.onclick = () => {
        // check if the clicked button is 'C' - clear button or not
        if (button.innerText === 'C') display.value = '';
        else if (button.innerText === '=') display.value = eval(display.value);
        else {
            display.value += button.innerText;
        };
    };
});