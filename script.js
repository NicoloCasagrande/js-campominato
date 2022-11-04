"use strict";
const playBoard = document.querySelector('.board');

const playButton = document.querySelector('button');
const playDifficult = document.querySelector('select');
const points = document.querySelector('.punteggio');

let difficult = "easy";
let maxNumber = 100;
startGame(difficult);

function startGame(difficult){
    // svuotiamo il contenitore delle celle
    playBoard.innerHTML = "";
    // creo la variabile che terrà il punteggio della partita inizializzandolo a 0 e la stampo in uno span
    let punteggio = 0;
    points.innerHTML = punteggio;
    // creo una variabile che verifica se abbiamo già perso
    let sconfitta = false;

    // verifico la difficoltà inserita, all'inizio è inizializzata a easy(100 celle)
    if(difficult === "easy"){
        maxNumber = 100;
    }else if(difficult === "medium"){
        maxNumber = 81;
    }else{
        maxNumber = 49;
    }
    // creo l'array contenente le posizioni delle bombe
    const bombs = bombCreation(maxNumber);
    let numSelected = [];

    // popolo la board con tutti i numeri fino a 100/81/49 a seconda della difficoltà
    for (let i = 1; i <= maxNumber; i++) {
        const playNumber = document.createElement("div");
        playNumber.innerHTML = i;
        playNumber.classList.add('board__number');
        // creo l'evento click delle celle verificando da prima se abbiamo già preso una bomba e nel caso sia vero rimuovo l'eventlistener
        playNumber.addEventListener("click", function(){
            if(sconfitta === true){
                playNumber.removeEventListener("click", function(){});
            }else{
                // verifico se la casella cliccata è una bomba se è vero applico la classe bomba e tramite una funzione applico la stessa classe a tutte le bombe, cambio la variabile sconfitta in true in modo che vengano rimossi poi tutti gli EventListner
                if(bombs.includes(i)){
                    this.classList.add('bomb');
                    alert(`Hai perso con un punteggio di: ${punteggio}`);
                    sconfitta = true;
                    loseGame(bombs);
                }else{
                    if(playNumber.classList.contains('selected')){
                        playNumber.removeEventListener("click", function(){});
                    }else{
                        // verico se la casella non è già stata cliccata e in caso aumento il punteggio e aggiungo la classe numSelected, inoltre verifico se si ha vinto facendo numero celle totali - numero bombCreation, se il punteggio è uguale si vince
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

        // a seconda della difficoltà applico una larghezza definita alle celle in modo che occupino in ogni caso la nostra board che è 500px x 500px
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

// creo un event che fa partire una nuova partita in base alla difficoltà scelta
playButton.addEventListener("click", function(){
    difficult = playDifficult.value;
    startGame(difficult);
});

// funzione che crea l'array con le bombe
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

// funzione che genera un numero casuale da 1 a numMax
function msMathRandom(nMax){
    const result = Math.floor(Math.random() * nMax) + 1;
    return result;
}

// funzione che applica la classe bomb a tutte le celle conmtenute nell'array delle bombe
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