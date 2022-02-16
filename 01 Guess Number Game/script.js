'use strict'


const rndmNmb = function () {
    return Math.trunc(Math.random() * 20) + 1;
}
let secretNumber = rndmNmb();
let score = 5;
let highscore = 0;
const againBtn = document.querySelector('.again');
document.querySelector('.score').textContent = score;
document.querySelector('.number').textContent = secretNumber;



//Comparison button logic
document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);
    document.querySelector('body').style.backgroundColor = '#242424';


    //No number
    if (!guess) {
        document.querySelector('.message').textContent = `Not a number!`;
        document.querySelector('body').style.backgroundColor = '#af392a';
    }
    //Win , same number
    else if (secretNumber === guess) {
        document.querySelector('.message').textContent = `Correct number!`;
        document.querySelector('body').style.backgroundColor = '#2aaf62';

        //Highscore
        if (score > highscore) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }

    }
    //Lose , wrong number
    else if (secretNumber !== guess) {
        if (score > 1) {
            secretNumber > guess ? document.querySelector('.message').textContent = `Too low!` : document.querySelector('.message').textContent = `Too high!`;
            score--;
            document.querySelector('.score').textContent = score;
        }
        //Game over 
        else {
            document.querySelector('.message').textContent = `Game over`;
            document.querySelector('.score').textContent = 0;
        }
    }



})
//Reset button 
againBtn.addEventListener('click', function () {
    document.querySelector('.score').textContent = score = 5;
    document.querySelector('.number').textContent = secretNumber = rndmNmb();
    document.querySelector('.message').textContent = `New game`;
    document.querySelector('body').style.backgroundColor = '#242424';
    document.querySelector('.guess').value = '';
})