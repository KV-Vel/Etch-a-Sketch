const body = document.querySelector('body');
const container = document.querySelector('.container');
const clearBtn = document.querySelector('.clear-btn');
const functionsDiv = document.querySelector('.functions');
const darkeningModeBtn = document.querySelector('.darkening');
const eraserBtn = document.querySelector('.eraser');
const inputColor = document.querySelector('#color-change');
const inputRange = document.querySelector('#size-grid');
const output = document.querySelector('.out');
const rainbowModeBtn = document.querySelector('.rainbow');
const childContainer = document.querySelectorAll('.child-container');
//Equals to inputColor btn value so that after erase color would save 
let color = inputColor.value; 
document.addEventListener ('DOMContentLoaded', createGrid);
//Variable to control event listener for Rainbow color mode
let allow;

//Canceling drag and drop to prevent block icon to appear during drawing with left mouse pressed
document.body.addEventListener('dragstart', event => {
    event.preventDefault();
  });
  document.body.addEventListener('drop', event => {
    event.preventDefault();
  });

function calculateGrid () {
    let gridSize = inputRange.value;
    //Size of the 'canvas'
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

container.addEventListener('mousedown', (e) => {
    // Makes first div black on mousedown
    draw(e)
    container.addEventListener('mouseover', draw);
}) 

container.addEventListener('mouseup', () => {
    container.removeEventListener('mouseover', draw);
})

body.addEventListener('mouseout', (e) => {
    if(e.target.className != 'child-container') {
        container.removeEventListener('mouseover', draw);
    }
})

function draw (e) {
    
    let targetBlock = e.target;                                  
    if (targetBlock.className == 'child-container') {
        targetBlock.style.cssText += `background: ${color};`;
    }
}

eraserBtn.addEventListener('click', erase);

function erase (e) {
    if (e.target.className === 'btn eraser' && darkeningModeBtn.style.backgroundColor != 'black') {
        e.target.classList.toggle('active');
        // Removing active rainbow mode class if eraser is turned ON
        e.target.textContent = 'Eraser is ON';    
        color = '#ffffff';
        rainbowModeBtn.className = 'btn rainbow';
    } else {
        e.target.textContent = 'Eraser is OFF';
        e.target.className = 'btn eraser';
        color = inputColor.value;        
    }
}

clearBtn.addEventListener('click', clear)

function clear () {
    const divBlock = document.querySelectorAll('.child-container');
    divBlock.forEach ((element) => {
        element.style.cssText += 'background: #ffffff';
        color = inputColor.value;
    })
    if (eraserBtn.textContent === 'Eraser is ON') {
        color = '#ffffff';
    }
}

inputColor.addEventListener('input', getColor);

function getColor (e) {
    //Check if eraser button not clicked while choosing color.
    if (eraserBtn.textContent === 'Eraser is ON') { 
        eraserBtn.className = 'btn eraser';
        eraserBtn.textContent = 'Eraser is OFF';
        color = e.target.value; //Retrive color from input[color]
    } else {
        color = e.target.value;
    }
}

inputRange.addEventListener('input', showGridSize);

function showGridSize () {
    let size = inputRange.value;
    //To make it look (16 x 16)
    output.textContent = `${size} x ${size}`;
}

inputRange.addEventListener('change', () => {
    while(container.firstChild) {
        container.removeChild(container.lastChild);
    }
    createGrid()
})

rainbowModeBtn.addEventListener('click', getControl);

function getRandomColor () {
        /* Getting 3 random RGB */
        let arrayOfRgb = [];
        for (let i = 1; i<=3; i++) {
            let rand = Math.floor(Math.random() * 255) + 1;
            arrayOfRgb.push(rand);
        }
        let [R, G, B] = arrayOfRgb;
        color = `rgb(${R}, ${G}, ${B})`;
        
        /* When rainbowmode activated it generates new color on each div(Cell) */
        if (allow === true && eraserBtn.textContent === 'Eraser is OFF' && darkeningModeBtn.style.backgroundColor != 'black') {
            container.addEventListener('click', getRandomColor); 
            container.addEventListener('mousemove', getRandomColor);
            rainbowModeBtn.className = 'btn rainbow rainbow-active'; //Setting css style when button is active
        } 
        else if (eraserBtn.textContent === 'Eraser is ON') {
            container.removeEventListener('click', getRandomColor);
            container.removeEventListener('mousemove', getRandomColor);
            color = '#ffffff';
        } 
        else {
            container.removeEventListener('click', getRandomColor);
            container.removeEventListener('mousemove', getRandomColor);
            color = inputColor.value;
        }
        
}

function getControl () {
    if (rainbowModeBtn.className === 'btn rainbow') {
        allow = true;
        getRandomColor()
    } else {
        allow = false;
        rainbowModeBtn.className = 'btn rainbow';
    }
}

darkeningModeBtn.addEventListener('click', darkeningEffect)
function darkeningEffect () {
    if (darkeningModeBtn.style.backgroundColor === 'black') {
        darkeningModeBtn.style.cssText += 'background-color: #561166;';
        container.removeEventListener('click', retrieveRgb);
        container.removeEventListener('mouseover', retrieveRgb);
        color = inputColor.value;
    }
    else if (rainbowModeBtn.className === 'btn rainbow' && eraserBtn.textContent === 'Eraser is OFF') {
        darkeningModeBtn.style.cssText += 'background-color: black;';
        container.addEventListener('click', retrieveRgb);
        container.addEventListener('mouseover', retrieveRgb);
    } 
}

function retrieveRgb (e) {
    if (e.target.style.background === '') {
        e.target.style.background = 'rgb(255,255,255)';
        rgb(255,255,255); // Otherwise blank cells = ''
    } else {
        let result = []
        result = e.target.style.background.substring(4, e.target.style.background.length -1).split(',');
        rgb(result[0],result[1], result[2])
    }
}

function rgb(r,g,b) {
   color = `rgb(${r-15}, ${g-15}, ${b-15})`;
}