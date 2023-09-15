const canvas = document.querySelector('#game');
const game = canvas.getContext('2d'); //Context created so qe can use the Canvas
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');

window.addEventListener('load', setCanvasSize); //We put this Even listener in order to start the js code after the html has been loaded completely
window.addEventListener('resize', setCanvasSize);

let canvasSize;
let elementSize;
let level=0;
let lives=3;
const playerPosition = {
    x: undefined,
    y: undefined,
};

const giftPosition = {
    x: undefined,
    y:undefined,
}

let enemyPosition = [];

function setCanvasSize () {

    if(window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth*0.75;
    } else {
        canvasSize = window.innerHeight*0.75;
    }
    canvas.setAttribute('width', canvasSize); // window.innerWidth makes the element responsive
    canvas.setAttribute('height', canvasSize);
    
    elementSize = canvasSize/10;

    startGame();
}

function startGame() {  

    console.log({canvasSize, elementSize})

    game.font = `${elementSize}px Verdana`;
    game.textAlign = 'end';

    const map = maps[level];

    if(!map) {
        gameWin();
        return
    }


    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapRowCols});

    showLives();

    enemyPosition=[];

    game.clearRect(0,0, canvasSize, canvasSize)

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
        const emoji = emojis[col];
        const posX= elementSize *(colI+1)
        const posY= elementSize *(rowI+1)

        if (col=='O') {
           if(!playerPosition.x && !playerPosition.y){
            playerPosition.x = posX;
            playerPosition.y = posY;
            console.log({playerPosition});
           }
        } else if (col=='I') {
            giftPosition.x = posX;
            giftPosition.y = posY;
            console.log({giftPosition});
        } else if (col=='X') {
            enemyPosition.push({
                x: posX,
                y: posY,
            });
            
        }


        game.fillText(emoji, posX, posY);
        });
    }); 

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

function movePlayer () {
    const giftCollisionX = playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2);
    const giftCollisionY = playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2);
    const giftCollision = giftCollisionX && giftCollisionY;

    if(giftCollision) {
        console.log('subiste de nivel');
        levelWin();
    }

    const enemyCollision = enemyPosition.find( enemy => {
        const enemyCollisionX = enemy.x.toFixed(2) == playerPosition.x.toFixed(2);
        const enemyCollisionY = enemy.y.toFixed(2) == playerPosition.y.toFixed(2);
        return enemyCollisionX && enemyCollisionY;
    })

    if(enemyCollision) {
        levelFail();
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
   }

function levelWin() {
    console.log('Subiste de nivel')
    level++;
    startGame();
}




function levelFail() {
    lives--;

    if(lives<=0){
        console.log('Chocaste con una bomba');
        level=0;
        lives=3;
    }
    playerPosition.x= undefined;
    playerPosition.y= undefined;
    startGame();
    }


function gameWin() {

    }

function showLives() {
    const heartsArray = Array(lives).fill(emojis['HEART']);
    spanLives.innerHTML = "";
    heartsArray.forEach(heart => spanLives.append(heart))
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
