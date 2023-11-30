const container = document.querySelector('.container');
const clearBtn = document.querySelector('.clear-btn');
const functionsDiv = document.querySelector('.functions');
const eraserBtn = document.querySelector('.eraser');
const inputColor = document.querySelector('#color-change');
const inputRange = document.querySelector('#size-grid');
const output = document.querySelector('.out');
let erasePermission = 'OFF';
let color = 'black';
document.addEventListener ('DOMContentLoaded', createGrid);


//Canceling drag and drop to prevent block icon to appear during drawing
document.body.addEventListener('dragstart', event => {
    event.preventDefault();
  });
  document.body.addEventListener('drop', event => {
    event.preventDefault();
  });

function calculateGrid () {
    let gridSize = inputRange.value;
    const containerSize = 700; 
    let result = containerSize / gridSize;
    const divBlock = document.querySelectorAll('.child-container');
    divBlock.forEach ((element) => {
        element.style.cssText = 
        `height: ${result}px;
         width: ${result}px;`
    })
}

function createGrid () {
    for (let horizontalDivs = 1; horizontalDivs<=inputRange.value; horizontalDivs++){
        for (let verticalDivs = 1; verticalDivs<=inputRange.value; verticalDivs++) {
            const childContainer = document.createElement('div');               
            childContainer.classList.add('child-container');
            childContainer.setAttribute('draggable', false);
            container.appendChild(childContainer);
        }
    }
    calculateGrid()
    showGridSize()
}

// Makes first div black on mousedown
container.addEventListener('mousedown', (e) => {
    let enableDraw = true;
    let targetBlock = e.target;
    if (targetBlock.className == 'child-container' && enableDraw === true) {
        targetBlock.style.cssText += `background: ${color};`;
    }

    container.addEventListener('mouseover', (e) => {
    let targetBlock = e.target;                                  
    if (targetBlock.className == 'child-container' && enableDraw === true) {
        targetBlock.style.cssText += `background: ${color};`;
    }
    })

    container.addEventListener('mouseup', () => {
        enableDraw = false;
    })
});
//TO DO: when mouse leaves container stop drawing

eraserBtn.addEventListener('click', erase);

function erase (e) {
    if (e.target.classList.toggle('active')) {
        e.target.textContent = 'Eraser is ON';
        color = `#ffffff`;
    } else {
        e.target.textContent = 'Eraser is OFF';
        e.target.classList.toggle('eraser');
        color = `#000`;
    }
}

clearBtn.addEventListener('click', clear)

function clear () {
    const divBlock = document.querySelectorAll('.child-container');
    divBlock.forEach ((element) => {
        element.style.cssText += 'background: white';
    })
}

inputColor.addEventListener('input', getColor);

function getColor (e) {color = e.target.value;}

inputRange.addEventListener('input', showGridSize);

function showGridSize () {
    let size = inputRange.value;
    output.textContent = `${size} x ${size}`; //To make it look (16 x 16)
}

inputRange.addEventListener('change', createGrid)

