const canvas = document.querySelector('#game');
const game = canvas.getContext('2d'); //Context created so we can use the Canvas
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');
const pageRefresh = document.querySelector('#restart-game')

window.addEventListener('load', setCanvasSize); //We put this Even listener in order to start the js code after the html has been loaded completely
window.addEventListener('resize', setCanvasSize);

pageRefresh.addEventListener('click', reStartGame);

function reStartGame() {
   location.reload();
}

let canvasSize;
let elementSize;
let level=0;
let lives=3;
let timeStart;
let timePlayer;
let timeInterval;
let map=[];
let mapWin=[]
let emoji=[];


const playerPosition = {
    x: undefined,
    y: undefined,
};

const giftPosition = {
    x: undefined,
    y: undefined,
}

let enemyPosition = [];

function setCanvasSize () {

    if(window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth*0.7;
    } else {
        canvasSize = window.innerHeight*0.7;
    }

    canvasSize = Number(canvasSize.toFixed(0));

    canvas.setAttribute('width', canvasSize); // window.innerWidth makes the element responsive
    canvas.setAttribute('height', canvasSize);

    elementSize = canvasSize/10;

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function startGame() {

    game.font = `${elementSize}px Verdana`;
    game.textAlign = 'end';

    map = maps[level];
    mapWin = maps[maps.length-1];


    if(!map) {
        fillWin();
        gameWin();
        return;
    }

    if(!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
        showRecord ();
    }

    showLives();

    fillCanvas();

    movePlayer();
    // for(let row=1; row<=10; row++){
    //     for(let col=1; col<=10 ; col++) {
    //         game.fillText(emojis[mapRowCols[row-1][col-1]],elementSize*col, elementSize*row)
    //     }
    // }


    // game.fillRect(0,0,100,100); //(where it starts in X, where it starts in Y, width, heigh)
    // game.clearRect(0,0,50,50); //this function help us to erase a section

    // game.font = '25px verdana'; //It help us to set font properties to the text in fillText
    // game.fillStyle = 'blue'; //It help us to give style to the text in fillText
    // game.textAlign = 'end' //It helps us to move the test in fillText acording to the position defined in X & Y
    // game.fillText('momos',50,50)
}



function fillCanvas() {
 
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
       
    enemyPosition=[];

    game.clearRect(0,0, canvasSize, canvasSize)

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
        emoji = emojis[col];

        const posX= elementSize *(colI+1)
        const posY= elementSize *(rowI+1)

        if (col=='O') {
           if(!playerPosition.x && !playerPosition.y){
            playerPosition.x = posX;
            playerPosition.y = posY;
            // console.log({playerPosition});
           }
        } else if (col=='I') {
            giftPosition.x = posX;
            giftPosition.y = posY;
            // console.log({giftPosition});
        } else if (col=='X') {
            enemyPosition.push({
                x: posX,
                y: posY,
            });

        }


        game.fillText(emoji, posX, posY);
        });
    });

}

function fillWin() {
    
    const mapRowsWin = mapWin.trim().split('\n');
    const mapRowColsWin = mapRowsWin.map(row => row.trim().split(''));
       
    enemyPosition=[];

    game.clearRect(0,0, canvasSize, canvasSize)

    mapRowColsWin.forEach((row, rowI) => {
        row.forEach((col, colI) => {
        emoji = emojisWin[col];

        const posX= elementSize *(colI+1)
        const posY= elementSize *(rowI+1)

        if (col=='O') {
           if(!playerPosition.x && !playerPosition.y){
            playerPosition.x = posX;
            playerPosition.y = posY;
            // console.log({playerPosition});
           }
        } else if (col=='I') {
            giftPosition.x = posX;
            giftPosition.y = posY;
            // console.log({giftPosition});
        } else if (col=='X') {
            enemyPosition.push({
                x: posX,
                y: posY,
            });

        }
        game.fillText(emoji, posX, posY);
        });
    });
}

function fillLose() {
    
    const mapRowsLose = map.trim().split('\n');
    const mapRowColsLose = mapRowsLose.map(row => row.trim().split(''));
       
    enemyPosition=[];

    game.clearRect(0,0, canvasSize, canvasSize)

    mapRowColsLose.forEach((row, rowI) => {
        row.forEach((col, colI) => {
        emoji = emojisLose[col];

        const posX= elementSize *(colI+1)
        const posY= elementSize *(rowI+1)

        if (col=='O') {
           if(!playerPosition.x && !playerPosition.y){
            playerPosition.x = posX;
            playerPosition.y = posY;
            // console.log({playerPosition});
           }
        } else if (col=='I') {
            giftPosition.x = posX;
            giftPosition.y = posY;
            // console.log({giftPosition});
        } else if (col=='X') {
            enemyPosition.push({
                x: posX,
                y: posY,
            });

        }
        game.fillText(emoji, posX, posY);
        });
    });
}


function movePlayer () {
    const giftCollisionX = playerPosition.x.toFixed(1) == giftPosition.x.toFixed(1);
    const giftCollisionY = playerPosition.y.toFixed(1) == giftPosition.y.toFixed(1);
    const giftCollision = giftCollisionX && giftCollisionY;

    if(giftCollision) {
        console.log('subiste de nivel');
        levelWin();
    }

    const enemyCollision = enemyPosition.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(1) == playerPosition.x.toFixed(1);
        const enemyCollisionY = enemy.y.toFixed(1) == playerPosition.y.toFixed(1);
        return enemyCollisionX && enemyCollisionY;
    })

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);

    if(enemyCollision) {

        lives--;
        game.fillText(emojis['BOMB_COLLISION'], playerPosition.x, playerPosition.y);
        
        if(lives<=0){
            setTimeout(fillLose,500);
            setTimeout(levelFail,1000);
            return
        }else {
            setTimeout(levelFail,500);
            return
        }
       

    }

   }


function levelWin() {
    console.log('Subiste de nivel')
    level++;
    startGame();
}


function levelFail() {
    
    if(lives<=0){
        
        level=0;
        lives=3;
        timeStart = undefined;
    }
    playerPosition.x= undefined;
    playerPosition.y= undefined;
    
    startGame();
    }


function gameWin() {

    clearInterval(timeInterval);

    const recordTime = localStorage.getItem('record_time');
    const playerTime = Date.now()- timeStart;

    if(recordTime){
        if (recordTime >= playerTime){
            localStorage.setItem('record_time', playerTime);
            pResult.innerHTML='Superaste el record';
        } else {
            pResult.innerHTML = 'No superaste el record';
        }
    } else {
        localStorage.setItem('record_time', playerTime)
        pResult.innerHTML = '¿Primera vez? Ok, ahora trata de mejorar el tiempo'
    }

    console.log({recordTime, playerTime});

    }

    


// function winner() {

//     game.clearRect(0,0, canvasSize, canvasSize)
//      // game.fillText('Felicidades, has ganado', posX, posY);

// }


function showLives() {
    const heartsArray = Array(lives).fill(emojis['HEART']);
    spanLives.innerHTML = "";
    heartsArray.forEach(heart => spanLives.append(heart))
}

function showTime () {
    spanTime.innerHTML = Date.now() - timeStart;
}

function showRecord () {
spanRecord.innerHTML = localStorage.getItem('record_time');
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys (event) {
    if(event.key == 'ArrowUp') {
        moveUp();
    } else if(event.key == 'ArrowLeft') {
        moveLeft();
    } else  if(event.key == 'ArrowRight') {
        moveRight();
    } else if(event.key == 'ArrowDown') {
        moveDown();
    }
}

function moveUp() {
    console.log('Me quiero mover hacia arriba');
    if((playerPosition.y - elementSize) < elementSize){
        console.log('OUT')
    }else {
        playerPosition.y -= elementSize;
        startGame();
    }

}

function moveLeft() {
    console.log('Me quiero mover hacia la izquierda')
    if((playerPosition.x - elementSize) < elementSize){
        console.log('OUT')
    }else {
        playerPosition.x -= elementSize;
        startGame();
    }
}

function moveRight() {
    console.log('Me quiero mover hacia la derecha')
    if((playerPosition.x + elementSize) > canvasSize){
        console.log('OUT')
    }else {
        playerPosition.x += elementSize;
        startGame();
    }
}

function moveDown() {
    console.log('Me quiero mover hacia abajo')
    if((playerPosition.y + elementSize) > canvasSize){
        console.log('OUT')
    }else {
        playerPosition.y += elementSize;
        startGame();
    }
}
