const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
let currentValue = '0';
let storedValue = '';
let currentOperator = null;
let shouldResetDisplay = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        switch(true) {
            case button.classList.contains('number'):
                handleNumber(value);
                break;
            case button.classList.contains('operator'):
                handleOperator(value);
                break;
            case button.id === 'clear':
                clearCalculator();
                break;
            case button.id === 'decimal':
                handleDecimal();
                break;
            case button.id === 'equals':
                calculateResult();
                break;
        }
    });
});

function handleNumber(num) {
    if (shouldResetDisplay) {
        currentValue = '0';
        shouldResetDisplay = false;
    }

    if (currentValue === '0') {
        currentValue = num;
    } else {
        currentValue += num;
    }
    display.textContent = currentValue;
}

function handleOperator(op) {
    if (currentOperator !== null) {
        calculateResult();
    }
    
    storedValue = currentValue;
    currentOperator = op;
    shouldResetDisplay = true;
}

function calculateResult() {
    if (storedValue === '' || currentOperator === null) return;

    const prev = parseFloat(storedValue);
    const current = parseFloat(currentValue);
    let result;

    switch(currentOperator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
    }

    currentValue = result.toString();
    display.textContent = currentValue;
    storedValue = '';
    currentOperator = null;
    shouldResetDisplay = true;
}

function clearCalculator() {
    currentValue = '0';
    storedValue = '';
    currentOperator = null;
    shouldResetDisplay = false;
    display.textContent = currentValue;
}

function handleDecimal() {
    if (shouldResetDisplay) {
        currentValue = '0';
        shouldResetDisplay = false;
    }

    if (!currentValue.includes('.')) {
        currentValue += '.';
        display.textContent = currentValue;
    }
}