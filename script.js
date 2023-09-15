const divContainer = document.querySelector('.div-container');
const containerRange = document.getElementById('container-range');
const gridValueElement = document.querySelector('.grid-value');
const scoreElement = document.querySelector('.score');
const maxScoreElement = document.querySelector('.max-score');



let value = containerRange.value;
let divArray = [];
let score = 0;
let maxScore = 0;
let randomDivNo;


function createRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const color = `rgb(${red}, ${blue}, ${green})`;
  return color;
}


function updateDivArray(noOfBoxes) {
  noOfBoxes *= noOfBoxes;
  const div = document.createElement('div');
  div.classList.add('grid-box');

  for(let i = 0; i < noOfBoxes; i++) {
    divArray.push(div);
  }
  return divArray;
}

function createGrid(noOfBoxes) {
  divContainer.style.gridTemplateColumns = `repeat(${noOfBoxes}, 1fr)`;
  divContainer.style.gridTemplateRows = `repeat(${noOfBoxes}, 1fr)`;
     divArray.map((div) => {
       div.style.background = createRandomColor();
     });

     divContainer.innerHTML = divArray.map((div) => { return div.outerHTML; }).join('');


    randomDivNo = Math.floor(Math.random() * divArray.length);
    const randomDivs = document.querySelectorAll('section div');
    randomDivs[randomDivNo].classList.add('different-box');
    
    return randomDivNo;

  
}

function initialValues() {
  divArray = [];
  updateDivArray(value);
  createGrid(value);
  divContainer.classList.remove('shake-div-container');
  containerRange.disabled = false;

}

initialValues();

containerRange.addEventListener('change', (e) => {
  value = e.target.value;
  gridValueElement.innerHTML = value;
  initialValues();
});


divContainer.addEventListener('click', (e) => {
  const randomDivs = document.querySelectorAll('section div');
  const correctBox = randomDivs[randomDivNo];

  if(e.target.classList.contains('different-box')) {
    value++;
    score++;
    scoreElement.innerHTML = score;
    initialValues();
    containerRange.disabled = true;
  } else {
    if(maxScore < score) maxScore = score;
    maxScoreElement.innerHTML = maxScore;
    value = gridValueElement.innerHTML;
    score = 0;
    scoreElement.innerHTML = score;
    correctBox.style.border = '5px solid red';
    divContainer.classList.add('shake-div-container');
    setTimeout(initialValues, 1000);
  }
});
