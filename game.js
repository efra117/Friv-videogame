const canvas = document.querySelector('#game');
const game = canvas.getContext('2d'); //Context created so qe can use the Canvas

window.addEventListener('load', setCanvasSize); //We put this Even listener in order to start the js code after the html has been loaded completely
window.addEventListener('resize', setCanvasSize);

let canvasSize;
let elementSize;

function startGame() {  

    console.log({canvasSize, elementSize})

    game.font = `${elementSize}px Verdana`;
    game.textAlign = 'end';

    const map = maps[1];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapRowCols});

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
        const emoji = emojis[col];
        const posX= elementSize *(colI+1)
        const posY= elementSize *(rowI+1)
        game.fillText(emoji, posX, posY);
        })
    });


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