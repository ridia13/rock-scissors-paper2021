'use strict';
const $body = document.querySelector('body');
const $computer = document.querySelector("#js-computer");
const $form = document.querySelector("form"),
  $rock = $form.querySelector(".js-rock"),
  $scissors = $form.querySelector(".js-scissors"),
  $paper = $form.querySelector(".js-paper");
const $score = document.querySelector(".js-score");
const emoticon = { //객체 : 공통점 -이모지
  rock: '✊🏻',
  scissors: '✌🏻',
  paper: '🖐🏻'
}
const scoreTable = {//hand 점수표
  rock: 0,
  scissors: 1,
  paper: 2
};

let computerChoice = 'rock';
let comHand = 0;
let userHand = 0;
let resultHand = 0;
let score = 0;
let user = 0;
let com = 0;

const changeChoice = (current) => {
  computerChoice = `${current}`;
  $computer.textContent = emoticon[`${current}`];
}

const shuffle = () => {
  if (computerChoice === 'rock') {
    changeChoice(`scissors`);
  } else if (computerChoice === 'scissors') {
    changeChoice(`paper`);
  } else if (computerChoice === 'paper') {
    changeChoice(`rock`);
  }
}

let intervalId = setInterval(shuffle, 50); //comHand 섞기

const paintResult = (resultHand) => {//승부 결과
  if (resultHand === 0) {
    $score.textContent = `DRAW🙂 총 ${score}점`;
  }else if([-1,2].includes(resultHand)){
    score++;
    user++;
    $score.textContent = `WIN🎉 총 ${score}점`;
  }else if([-2,1].includes(resultHand)){
    score--;
    com++;
    $score.textContent = `LOSE😓 총 ${score}점`;
  }
}

let clickAble = true; //flag변수

const matchCount = () => {//5판 3선 승제
  const $msg = document.createElement('div');
  const $msg2 = document.createElement('div');
  $body.append($msg, $msg2);
  if(user >= 3){
    $msg.textContent = `User Win🎉 (${user} : ${com})`;
  }else if(com >= 3){
    $msg.textContent = `Computer Win🎉 (${user} : ${com})`;
  }
  else{
    setTimeout(() => { //1초 후 다시 돌리기
      clearInterval(intervalId); //섞기 멈춤
      intervalId = setInterval(shuffle, 50);
      clickAble = true;
    }, 1500);
  }
}

const clickBtn = (event) => {
  event.preventDefault();
  const targetId = event.target.id;

  if (clickAble) {//클릭 가능하다면
    clickAble = false;
    clearInterval(intervalId); //섞기 멈춤
    userHand = scoreTable[`${targetId}`];
    comHand = scoreTable[`${computerChoice}`];
    resultHand = userHand - comHand;
    paintResult(resultHand);
    matchCount();//5선 3승
  }
}

function init() {
  $rock.addEventListener('click', clickBtn);
  $scissors.addEventListener('click', clickBtn);
  $paper.addEventListener('click', clickBtn);
}
init();