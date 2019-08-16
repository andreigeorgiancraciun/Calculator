const calculate = (n1, operator, n2) => {

    if (operator === 'add') return (parseFloat(n1) + parseFloat(n2)).toFixed(2).replace(/\.?0+$/, "");
    if (operator === 'subtract') return (parseFloat(n1) - parseFloat(n2)).toFixed(2).replace(/\.?0+$/, "");
    if (operator === 'multiply') return (parseFloat(n1) * parseFloat(n2)).toFixed(2).replace(/\.?0+$/, "");
    if (operator === 'divide')return (parseFloat(n1) / parseFloat(n2)).toFixed(2).replace(/\.?0+$/, "");

}
        
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator_keys');
const display = document.querySelector('.calculator_display');

keys.addEventListener('click', e => {
   
    if (e.target.matches('button')) {

        const key = e.target; // return the button that is clicked
        const action = key.dataset.action; // check the data action in HTML / undefined for numbers  
        const keyContent = key.textContent; // return text of event (5, 8, + etc)
        const displayedNum = display.textContent; // return text of current display
        const previousKeyType = calculator.dataset.previousKeyType; //in order to store the prev key type
       
                
        Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed')); 
        
        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = keyContent; //replace 
              } else {
                display.textContent = displayedNum + keyContent; // concatenate 
              }
              calculator.dataset.previousKeyType = 'number';
        }
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
          ) {

            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;
                        
              //It's sufficient to check for firstValue and operator because secondValue always exists
            if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
              const calcValue = calculate(firstValue, operator, secondValue);
              display.textContent = calcValue;
              // Update calculated value as firstValue
              calculator.dataset.firstValue = calcValue;
              
            } else {
              calculator.dataset.firstValue = displayedNum;
            }

            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator'; 
            calculator.dataset.operator = action; // store operator as a string 
            
          }

        if (action === 'decimal') {
          if (!displayedNum.includes('.')) {
            display.textContent = displayedNum + '.'
          } 
          if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
            display.textContent = '0.';
          }
          calculator.dataset.previousKeyType = 'decimal';
          }
          
          //clears everything and resets the calculator to its initial state
        if (action === 'clear') {
          if (key.textContent === 'AC') {
            calculator.dataset.firstValue = '';
            calculator.dataset.modValue = '';
            calculator.dataset.operator = '';
            calculator.dataset.previousKeyType = '';
          } else {
            key.textContent = 'AC';
          }
          
        display.textContent = 0;
          calculator.dataset.previousKeyType = 'clear';
          }

          //clears the current entry. It keeps previous numbers in memory.
        if (action !== 'clear') {
           const clearButton = calculator.querySelector('[data-action=clear]');
           clearButton.textContent = 'CE';
         }
          
        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            let secondValue = displayedNum;
            
            if (firstValue) {
              if (previousKeyType === 'calculate') {
                firstValue = displayedNum;
                secondValue = calculator.dataset.modValue;
              }
              
              display.textContent = calculate(firstValue, operator, secondValue);
            }

            // Set modValue attribute
            calculator.dataset.modValue = secondValue;
            calculator.dataset.previousKeyType = 'calculate';
          }

        
    }
})



