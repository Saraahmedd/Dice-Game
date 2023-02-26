'use strict';
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const curr1 = document.querySelector('.current-score1');
const curr2 = document.querySelector('.current-score2');
const tot1 = document.querySelector('.total-score1');
const tot2 = document.querySelector('.total-score2');

const btnRoll = document.querySelector('.roll');
const btnHold = document.querySelector('.hold');
const btnNew = document.querySelector('.new');
const btnStart = document.querySelector('.start-game');

let player = 1;
let myDice;
let playing=false;

const setNames = function(){
    if(document.querySelector('.first-player').value){
        document.querySelector('.name1').textContent= document.querySelector('.first-player').value;
    }
    if(document.querySelector('.second-player').value){
        document.querySelector('.name2').textContent= document.querySelector('.second-player').value;
    }
    document.querySelector('.input-screen').classList.add('hidden');
    playing=true;
}
const checkWinner = function(){
    if(player===1){
        if(Number(tot1.textContent)>=100){
            player1.classList.add('player-winner');
            playing= false;
        }
        else{
            playing= true;
        }
    }
    else{
        if(Number(tot2.textContent)>=100){
            player2.classList.add('player-winner');
            playing= false;
        }
        else{
            playing= true;
        }
    }
}

const highlightPlayer = function(){
    if(player===1){
        document.querySelector('.player1').style.backgroundColor = 'rgba(255, 255, 255, 0.587)';
        document.querySelector('.player2').style.backgroundColor = 'rgba(255, 255, 255, 0.39)';
    }
    else{
        document.querySelector('.player2').style.backgroundColor = 'rgba(255, 255, 255, 0.587)';
        document.querySelector('.player1').style.backgroundColor = 'rgba(255, 255, 255, 0.39)';
    }
}
const updateTotal = function(){
    if(player===1){
        tot1.textContent = Number(tot1.textContent)+Number(curr1.textContent);
        curr1.textContent=0;
    }
    else{
        tot2.textContent = Number(tot2.textContent)+Number(curr2.textContent);
        curr2.textContent =0;
    }
}
const endTurn = function(){
    if(playing){
        updateTotal();
        checkWinner();
        if(playing){
            if(player===1){
                player=2;
            }
            else{
                player=1;
            }
            highlightPlayer();
        }
    }
}
const updateCurrent = function(score){
    if(player===1){
        if(score===1){
            curr1.textContent = '0';
            endTurn();
        }
        else{
            curr1.textContent = Number(curr1.textContent)+score;
        }
    }
    else{
        if(score===1){
            curr2.textContent = '0';
            endTurn();
        }
        else{
            curr2.textContent = Number(curr2.textContent)+score;
        }
    }
}

const rollDice = function(){
    if(playing){
        if(myDice){
            myDice.classList.add('hidden');
        }
        let dice = Math.trunc(Math.random()*6)+1;
        myDice=document.querySelector(`.dice-${dice}`);
        myDice.classList.remove('hidden');
        updateCurrent(dice);
    }
}

const resetGame = function(){
    if(myDice){
        myDice.classList.add('hidden');
    }
    document.querySelector('.input-screen').classList.remove('hidden');
    tot1.textContent=0;
    tot2.textContent=0;
    if(player1.classList.contains('player-winner')){
        player1.classList.remove('player-winner');
    }
    if(player2.classList.contains('player-winner')){
        player2.classList.remove('player-winner');
    }
    player=1;
    highlightPlayer();
}

btnStart.addEventListener('click',setNames);
btnRoll.addEventListener('click',rollDice);
btnHold.addEventListener('click',endTurn);
btnNew.addEventListener('click',resetGame);


