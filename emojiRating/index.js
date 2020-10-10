/*
DESCRIPTION:
You job is to enable users to give a rating between 1 (bad) and 5 (great), 
and then display that rating in the form of an emoji. The users should give 
their ratings by pressing a key on their keyboards (the numbers 1 to 5). 
Here's the numbers' corresponding emojis:

5 = 😁
3 = 🙂
3 = 😐
2 = ☹️
1 = 🤬

DETAILED INSTRUCTIONS
1. Listen for keyboard events when the box has focus
2. Figure out which key the user pressed
3. If it's between 1 and 5, display an emoji in the box!

*/

const box = document.getElementById("box")
const text = document.getElementById("text")

box.addEventListener("focus", function(){
    text.textContent = "Type a number between 1 and 5"
})

box.addEventListener("focusout", function(){
    text.textContent = "Click here to give your rating"
})


// Write your code here 👇
function whichEmoji(char){
    let res;
    
    switch(char){
        case 1:
            res = '🤬';
            break;
        case 2:
            res = '☹️';
            break;
        case 3:
            res = '😐';
            break;
        case 4:
            res = '🙂';
            break;
        case 5:
            res = '😁';
            break;
    }
    
    return res;
}

function displayEmoji(event){
    let char = event.code
    char = parseInt(char.replace(/Digit/, ''));
    
    if(char > 0 && char < 6){
        text.textContent = whichEmoji(char);
    }
}

box.addEventListener('keydown', displayEmoji);
