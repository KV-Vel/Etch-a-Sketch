const container = document.querySelector('.container');
const clearBtn = document.querySelector('.clear-btn');
const functionsDiv = document.querySelector('.functions');
let gridSize = 32;
let containerSize = 700; 

document.addEventListener ('DOMContentLoaded', createGrid);


//Canceling drag and drop to prevent block icon to appear during drawing
document.body.addEventListener('dragstart', event => {
    event.preventDefault();
  });
  document.body.addEventListener('drop', event => {
    event.preventDefault();
  });

function calculateGrid () {
    const divBlock = document.querySelectorAll('.child-container');
    let result = containerSize / gridSize;
    divBlock.forEach ((element) => {
        element.style.cssText = 
        `height: ${result}px;
         width: ${result}px;`
    })
}

function createGrid () {
    for (let horizontalDivs = 1; horizontalDivs<=gridSize; horizontalDivs++){
        for (let verticalDivs = 1; verticalDivs<=gridSize; verticalDivs++) {
            const childContainer = document.createElement('div');               
            childContainer.classList.add('child-container');
            childContainer.setAttribute('draggable', false);
            container.appendChild(childContainer);
        }
    }
    calculateGrid()
}

// Makes first div black on mousedown
container.addEventListener('mousedown', (e) => {
    let enableDraw = true;
    let targetBlock = e.target;
    if (targetBlock.className == 'child-container' && enableDraw === true) {
        targetBlock.style.cssText += 'background: black;';
    }

    container.addEventListener('mouseover', (e) => {
    let targetBlock = e.target;                                  
    if (targetBlock.className == 'child-container' && enableDraw === true) {
        targetBlock.style.cssText += 'background: black;';
    }
    })

    container.addEventListener('mouseup', () => {
        enableDraw = false;
    })
});
//TO DO: when mouse leaves container stop drawing

clearBtn.addEventListener('click', clear)

function clear () {
    const divBlock = document.querySelectorAll('.child-container');
    divBlock.forEach ((element) => {
        element.style.cssText += 'background: white'
    })
}