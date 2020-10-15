const mainContainer = document.getElementById("main-container")
const equationField = document.getElementById("equation-field")
const solveButton = document.getElementById("solve-button")
const solutionDisplay = document.getElementById("solution-display")

function customEval(operator, first, second){
    let answer = "";
    
    switch(operator){
        case "+" :
            answer = first + second;
            break;
        case "-" :
            answer = first - second;
            break;
        case "/" :
            answer = first / second;
            break;
        case "*" :
            answer = first * second;
            break;
    }
    
    return answer;
}

solveButton.addEventListener('click', function(){
    const resultDiv = document.createElement('div');
    let problemString = equationField.value.replace(/\s/g, '');
    let expectedOperators = ["+", "-", "/", "*"];
    let operator = null;
    
    // Loop through string
    // Check if problem string includes one of the expected operators
    for(let i = 0; i < problemString.length; i++){
        let current = problemString[i];
        // Set found operator to current character
        if(expectedOperators.indexOf(current) > -1){
            operator = current;
            break;
        }
    }
    
    // Split string into an array, values separated by operator
    if(operator) problemString = problemString.split(operator);

    let first = parseInt(problemString[0]);
    let second = parseInt(problemString[1]);
    let answer = customEval(operator, first, second);
    
    // Clear contents on each click
    solutionDisplay.innerHTML = ``;
    
    solutionDisplay.appendChild(resultDiv);
    resultDiv.className += 'equation-component';
    
    resultDiv.textContent = answer;
});

/*
Part 1 (Calculation): 
    +Your first goal is to solve a simple text-based
        math problem entered in the input field
    +The problem can be add/sub/multiply/divide
    +Here are few examples: 
        "3 + 3" -> 6
        "10 - 3" -> 7
        "44 / 2" -> 22
        "2 * 8" -> 16 
    +When the 'Solve' button is clicked
        -Create a new div with the
            class 'equation-component'
            its text value should be the solution
            to the input equation
        -This element should be added as a child of 
            the `solutionDisplay` div

    Note: You can assume there will always only be 2 values, 
        both whole integers, and always a space between each 
        integer and the operator as in the above examples


Part 2 (Flex Display): 
    Then, you'll Flex your Flexbox skills!
    + Vertically stack the contents of the mainContainer
    + Center the content horizontally
    + Display all components of the equation 
        in the solutionDisplay using a horizontal Flexbox
        with `space around` each component
    
Skills: 
    Event Listeners, String Manipulation, Array Manipulation, 
Arithmetic, DOM Manipulation, Flexbox



STRETCH GOALS:
    +Accept and solve more complex problems with more than 2 inputs
    +Signal the different types of components (operator/value/solution) with different colors
    +Accept strings without spaces
    +Can you improve the overall design?
*/