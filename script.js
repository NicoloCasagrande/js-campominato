"use strict";
const playBoard = document.querySelector('.board');

const playButton = document.querySelector('button');
const playDifficult = document.querySelector('select');
const points = document.querySelector('.punteggio');

let difficult = "easy";
let maxNumber = 100;
startGame(difficult);

function startGame(difficult){
    playBoard.innerHTML = "";
    let punteggio = 0;
    points.innerHTML = punteggio;
    let sconfitta = false;

    if(difficult === "easy"){
        maxNumber = 100;
    }else if(difficult === "medium"){
        maxNumber = 81;
    }else{
        maxNumber = 49;
    }
    const bombs = bombCreation(maxNumber);
    let numSelected = [];

    for (let i = 1; i <= maxNumber; i++) {
        const playNumber = document.createElement("div");
        playNumber.innerHTML = i;
        playNumber.classList.add('board__number');

        playNumber.addEventListener("click", function(){
                // this.removeEventListener("click", function(){});
            if(sconfitta === true){
                playNumber.removeEventListener("click", function(){});
            }else{
                if(bombs.includes(i)){
                    this.classList.add('bomb');
                    alert(`Hai perso con un punteggio di: ${punteggio}`);
                    sconfitta = true;
                    loseGame(bombs);
                }else{
                    if(playNumber.classList.contains('selected')){
                        playNumber.removeEventListener("click", function(){});
                    }else{
                        punteggio += 1;
                        points.innerHTML = punteggio;
                        this.classList.add('selected');
                        if(punteggio === maxNumber - 16){
                            alert(`Hai vinto con un punteggio di: ${punteggio}`);
                            playBoard.innerHTML = "";
                        }
                    }
                }
            }  
        });

        if(difficult === "easy"){
            playNumber.style.width = "calc(100%/10)";
            playNumber.style.height = "calc(100%/10)";
        }else if(difficult === "medium"){
            playNumber.style.width = "calc(100%/9)";
            playNumber.style.height = "calc(100%/9)";
        }else{
            playNumber.style.width = "calc(100%/7)";
            playNumber.style.height = "calc(100%/7)";
        }
        playBoard.append(playNumber);
    }
    console.log(bombs);
}

playButton.addEventListener("click", function(){
    difficult = playDifficult.value;
    startGame(difficult);
});

function bombCreation(maxNumber){
    let bombPosition = [];
    while(bombPosition.length < 16){
        const randomNumber = msMathRandom(maxNumber);
        if(!bombPosition.includes(randomNumber)){
            bombPosition.push(randomNumber);
        }
    }
    return bombPosition;
}

function msMathRandom(nMax){
    const result = Math.floor(Math.random() * nMax) + 1;
    return result;
}

function loseGame(bombsArray){
    for (let i = 0; i < bombsArray.length; i++) {
        const element = bombsArray[i];
        const bombsDiv = document.querySelector(`.board__number:nth-child(${element})`);
        bombsDiv.classList.add('bomb');
    }
}



// creo la tabella con tutti i numeri





// console.log(this);
// this.classList.add();