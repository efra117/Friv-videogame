const canvas = document.querySelector('#game');
const game = canvas.getContext('2d'); //Context created so qe can use the Canvas

window.addEventListener('load', startGame); //We put this Even listener in order to start the js code after the html has been loaded completely
window.addEventListener('resize', startGame);

function startGame() {  

    let canvasSize;

    if(window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth*0.75;
    } else {
        canvasSize = window.innerHeight*0.75;
    }
    canvas.setAttribute('width', canvasSize); // window.innerWidth makes the element responsive
    canvas.setAttribute('height', canvasSize);
    
    const elementSize = canvasSize/10;

    console.log({canvasSize, elementSize})

    game.font = `${elementSize}px verdana`;
    game.fillText(emojis['X'],100, 100)
    
   


    // game.fillRect(0,0,100,100); //(where it starts in X, where it starts in Y, width, heigh)
    // game.clearRect(0,0,50,50); //this function help us to erase a section
   
    // game.font = '25px verdana'; //It help us to set font properties to the text in fillText
    // game.fillStyle = 'blue'; //It help us to give style to the text in fillText
    // game.textAlign = 'end' //It helps us to move the test in fillText acording to the position defined in X & Y
    // game.fillText('momos',50,50)


}