const container = document.querySelector('.container');
const clearBtn = document.querySelector('.clear-btn');
const functionsDiv = document.querySelector('.functions');
const eraserBtn = document.querySelector('.eraser');
const inputColor = document.querySelector('#color-change');
const inputRange = document.querySelector('#size-grid');
const output = document.querySelector('.out');
const rainbowModeBtn = document.querySelector('.rainbow');
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

eraserBtn.addEventListener('click', erase);

function erase (e) {
    if (e.target.className === 'btn eraser') {
        e.target.classList.toggle('active');
        // Removing active rainbow mode class if eraser is turned ON
        e.target.textContent = 'Eraser is ON';    
        color = 'white';
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
        element.style.cssText += 'background: white';
        color = inputColor.value;
    })
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

inputRange.addEventListener('change', createGrid)

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
        if (allow === true && eraserBtn.textContent === 'Eraser is OFF') {
            container.addEventListener('mousemove', getRandomColor);
            rainbowModeBtn.className = 'btn rainbow rainbow-active'; //Setting css style when button is active
        } else if (eraserBtn.textContent === 'Eraser is ON') {
            container.removeEventListener('mousemove', getRandomColor);
            color = 'white';
        } else {
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


//TO DO: when mouse leaves container stop drawing
