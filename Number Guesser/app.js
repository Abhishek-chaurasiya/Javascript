
//Game values
let min=1;
let max=10;
let winningNum=getRandomNum(min,max);
let guessesLeft=3;

//Ui elements
const game=document.querySelector('#game');
const minNum=document.querySelector('.min-num');
const maxNUm=document.querySelector('.max-num');
const guessBtn=document.querySelector('#guess-btn');
const guessInput=document.querySelector('#guess-input');
const message=document.querySelector('.message');

//assign ui min and max
minNum.textContent=min;
maxNUm.textContent=max;

//play again event listener
game.addEventListener('mousedown',function(e){
  if(e.target.className==='play-again'){
    window.location.reload();
  }

});

//listen for guess

guessBtn.addEventListener('click',function(){

    let guess=parseInt(guessInput.value);
    if(isNaN(guess) || guess<min || guess>max){
        setMessage(`Please enter a number between ${min} and ${max}`,'red');
    }
    if(guess===winningNum){
        
       gameover(true,`${winningNum} is correct, You win!.`);
    }
    else{
        //wrong number
        guessesLeft-=1;
        
        if(guessesLeft===0){
            gameover(false,`Game Over,you lost .The correct number was ${winningNum}`);
        }
        else{
            guessInput.style.borderColor='red';
            guessInput.value='';
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`,'red');
         
        }
    }

});

//game over
function gameover(won,msg){
   let color;
   color=(won===true)?'green':'red';
    //disable input
   guessInput.disabled=true;
   //change border color
   guessInput.style.borderColor=color;
   guessInput.style.color=color;

   setMessage(msg,color);

   //play again
   guessBtn.value='Play-Again';
   guessBtn.className+='play-again'; 
}

//get winning number
function getRandomNum(min,max){
      let val=Math.floor(Math.random()*(max-min+1)+min);
      return val;
     
}


//set message
function setMessage(msg,color){
    message.style.color=color;
    message.textContent=msg;
}