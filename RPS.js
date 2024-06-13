
let score =  { win : 0,  lose: 0,  tie: 0 };  

let savedScore = JSON.parse(localStorage.getItem('don'));
 if (savedScore) {
   score = savedScore;
 }

scoreMachine(); 

let autoplay = false;
let idman;
document.querySelector('.jsauto').addEventListener('click', () => {
  if (!autoplay) {
    idman = setInterval(() => {
      const playermove = movePicker();
      resultMan(playermove);
    }, 1000);
    autoplay =true;
  }

  else {
    clearInterval(idman);
    autoplay = false;
  }
 
  const apbname = document.querySelector('.jsauto');
  if (apbname.innerHTML === 'Auto Play')
  {
    apbname.innerHTML = 'Stop Playing'
  }
  else {
    apbname.innerHTML = 'Auto Play'
  }

});

document.body.addEventListener('keydown', (event) => {
 if(event.key === 'r')
 {  resultMan('rock'); }
else  if(event.key === 'p')
 {  resultMan('paper'); }
else if(event.key === 's')
 {  resultMan('scissors'); }
 
 if (event.key==='a') {
  setInterval(() => {
    const playermove = movePicker();
    resultMan(playermove);
  }, 1500);
}

if (event.key==='Escape')
  {
    score.win = 0; score.lose = 0; score.tie=0;                              
    scoreMachine(); 
    localStorage.removeItem('score');
   }
});

document.querySelector('.jsreset').addEventListener('click', ()=>{
   const confirm = document.querySelector('.jsconfirm')
   confirm.innerHTML = `Are you sure you want to reset the score?
   <button class="jsyes cssyes">Yes</button>
   <button class="jsno cssno">No</button>`

   const agree = document.querySelector('.jsyes')
  agree.addEventListener('click', () => { 
  score.win = 0; score.lose = 0; score.tie=0;                              
  scoreMachine(); 
  localStorage.removeItem('score');
  confirm.innerHTML = '';
 });

 const disagree = document.querySelector('.jsno')
 disagree.addEventListener('click', () => {
  confirm.innerHTML = ''; 
 })


  
});


function resultMan(playermove) {

 const computerMove = movePicker();
 let result = '';
 if (playermove === 'rock') {
   
   if (computerMove === 'rock') {
     result = 'Tie';

   } else if (computerMove === 'paper') {
     result = 'You lose';

   } else if (computerMove === 'scissors')
     result = 'You win';

 }
 else if (playermove === 'paper') {
   

   if (computerMove === 'rock') {
     result = 'You win';

   } else if (computerMove === 'paper') {
     result = 'Tie';

   } else if (computerMove === 'scissors')
     result = 'You lose';


 } else if (playermove === 'scissors') {
   
   if (computerMove === 'rock') {
     result = 'You lose';

   } else if (computerMove === 'paper') {
     result = 'You win';

   } else if (computerMove === 'scissors')
     result = 'Tie';
 }

 if (result === 'You win')
 {
   score.win += 1;
 } 
 else if (result === 'You lose')
 {
 score.lose += 1;
 }else if (result === 'Tie')
 {
 score.tie += 1;
 }

 document.querySelector('.js-battle')
     .innerHTML = `You-
<img class="moves" src="${playermove}-emoji.png">
<img class="moves" src="${computerMove}-emoji.png">
-Computer`;

document.querySelector('.js-result')
  .innerHTML = `${result}`;

  scoreMachine();
  
 let jsonString = JSON.stringify(score);
 localStorage.setItem('don', jsonString);

}


document.querySelector('.jsrock')
.addEventListener('click', () => {
 resultMan('rock');
});
document.querySelector('.jspaper')
.addEventListener('click', () => {
 resultMan('paper');
});
document.querySelector('.jsscissors')
.addEventListener('click', () => {
 resultMan('scissors');
});




function scoreMachine()
{
document.querySelector('.js-score')
.innerHTML = `Wins: ${score.win} Losses: ${score.lose} Ties: ${score.tie}`;
let jsonString = JSON.stringify(score);
 localStorage.setItem('don', jsonString);

}


function movePicker() {
 const god = Math.random();

 let computer = '';

 if (god >= 0 && god < 1 / 3) {
   computer = 'rock';

 } else if (god >= 1 / 3 && god <= 2 / 3) {
   computer = 'paper';

 } else if (god >= 2 / 3 && god <= 1) {
   computer = 'scissors';
 }
 return computer;
}