// --- Part 2: JavaScript Functions — Scope, Parameters & Return Values ---

// 🎯 Global Scope Demonstration: Variable visible everywhere
let globalMessage = "I am a variable defined in the global scope.";
let globalCounter = 0;

/**
 * Calculates the area of a rectangle.
 * @param {number} width - The width of the rectangle.
 * @param {number} height - The height of the rectangle.
 * @returns {number} The calculated area.
 */
function calculateArea(width, height) {
    // 🎯 Local Scope: Variable is only accessible inside this function
    const unit = "sq. units"; 
    const area = width * height;
    
    // Demonstrate accessing global scope from local scope
    console.log("Local function can see:", globalMessage); 
    console.log("Calculating area with local unit:", unit);

    // 🎯 Goal: Return a useful value
    return area;
}

/**
 * Performs string manipulation based on the specified operation.
 * @param {string} input - The input string to manipulate.
 * @param {string} operation - The operation to perform ('uppercase', 'lowercase', 'capitalize').
 * @returns {string} The manipulated string.
 */
function manipulateString(input, operation) {
    let result;
    
    switch(operation) {
        case 'uppercase':
            result = input.toUpperCase();
            break;
        case 'lowercase':
            result = input.toLowerCase();
            break;
        case 'capitalize':
            result = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
            break;
        default:
            result = input;
    }
    
    return result;
}

/**
 * Performs mathematical operations on two numbers.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @param {string} operation - The operation to perform ('add', 'subtract', 'multiply', 'divide').
 * @returns {number|string} The result of the operation or an error message.
 */
function performMathOperation(a, b, operation) {
    let result;
    
    switch(operation) {
        case 'add':
            result = a + b;
            break;
        case 'subtract':
            result = a - b;
            break;
        case 'multiply':
            result = a * b;
            break;
        case 'divide':
            result = b !== 0 ? a / b : 'Error: Division by zero';
            break;
        default:
            result = 'Invalid operation';
    }
    
    return result;
}

/**
 * A reusable function to update a text element on the page.
 * @param {string} elementId - The ID of the HTML element to update.
 * @param {string} content - The new content to place inside the element.
 * @returns {boolean} True if the update was successful, false otherwise.
 */
function updateDOMText(elementId, content) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = content;
        return true;
    }
    // 🎯 Goal: Return a boolean status value
    return false;
}

/**
 * Updates the global counter and displays it in the output.
 */
function updateGlobalCounter() {
    globalCounter++;
    console.log(`Global function call counter: ${globalCounter}`);
}

// Event listeners for Part 2
document.getElementById('calculate-btn').addEventListener('click', function() {
    // Define parameters for the function call
    const rectWidth = 10;
    const rectHeight = 7;
    
    // Call the function and store the returned value
    const resultArea = calculateArea(rectWidth, rectHeight); 

    // Display the result on the page
    updateDOMText('area-result', `${resultArea}`);
    
    // Display the global scope check
    updateDOMText('global-check', globalMessage);
    
    console.log(`\n--- Scope Check ---`);
    console.log(`Global variable is: ${globalMessage}`);
    
    // Trying to access the local variable 'unit' here would cause an error
    // console.log(unit); // ReferenceError: unit is not defined
    console.log(`The variable 'unit' is local to calculateArea() and is NOT accessible here.`);
    
    updateGlobalCounter();
});

document.getElementById('string-btn').addEventListener('click', function() {
    const originalString = "Hello JavaScript World";
    const formatted = manipulateString(originalString, 'uppercase');
    updateDOMText('string-result', `"${originalString}" → "${formatted}"`);
    updateGlobalCounter();
});

document.getElementById('math-btn').addEventListener('click', function() {
    const result = performMathOperation(15, 3, 'multiply');
    updateDOMText('math-result', `15 × 3 = ${result}`);
    updateGlobalCounter();
});


// --- Part 3: Combining CSS Animations with JavaScript ---

const targetBox = document.getElementById('target-box');
const triggerBtn = document.getElementById('trigger-animation-btn');
const flipCard = document.getElementById('flip-card');
const flipCardBtn = document.getElementById('flip-card-btn');
const loader = document.getElementById('loader');
const startLoaderBtn = document.getElementById('start-loader-btn');
const stopLoaderBtn = document.getElementById('stop-loader-btn');

/**
 * Toggles a CSS class on an element to start/stop an animation.
 * @param {HTMLElement} element - The DOM element to modify.
 * @param {string} className - The CSS class to toggle.
 */
function toggleAnimationClass(element, className) {
    element.classList.toggle(className);
    
    // Add logic to reset/cleanup after the transition is done
    if (element.classList.contains(className)) {
         // After the transition ends, remove the class to allow re-triggering
        element.addEventListener('transitionend', function handler() {
            element.classList.remove(className);
            element.removeEventListener('transitionend', handler);
            updateDOMText('target-box', 'Click Again!');
        });
        updateDOMText('target-box', 'Animating...');
    }
}

/**
 * Toggles the flip state of a card element.
 * @param {HTMLElement} cardElement - The card element to flip.
 */
function toggleCardFlip(cardElement) {
    cardElement.classList.toggle('flipped');
}

/**
 * Controls the visibility of a loader element.
 * @param {HTMLElement} loaderElement - The loader element to control.
 * @param {string} action - The action to perform ('start' or 'stop').
 */
function controlLoader(loaderElement, action) {
    if (action === 'start') {
        loaderElement.style.display = 'block';
    } else {
        loaderElement.style.display = 'none';
    }
}

// 🎯 Goal: Use JavaScript to add/remove classes to trigger CSS effects
triggerBtn.addEventListener('click', () => {
    // Uses the reusable function to trigger the 'active' class
    toggleAnimationClass(targetBox, 'active');
});

flipCardBtn.addEventListener('click', () => {
    toggleCardFlip(flipCard);
});

startLoaderBtn.addEventListener('click', () => {
    controlLoader(loader, 'start');
});

stopLoaderBtn.addEventListener('click', () => {
    controlLoader(loader, 'stop');
});


// Modal Logic
const modalBackdrop = document.getElementById('my-modal');
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const closeModalX = document.querySelector('.close-btn');

/**
 * Controls the visibility of the modal.
 * @param {string} action - The action to perform ('open' or 'close').
 */
function controlModal(action) {
    if (action === 'open') {
        modalBackdrop.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
        modalBackdrop.classList.remove('show');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}

openModalBtn.addEventListener('click', () => {
    controlModal('open');
});

closeModalBtn.addEventListener('click', () => {
    controlModal('close');
});

closeModalX.addEventListener('click', () => {
    controlModal('close');
});

// Close modal when clicking outside the content
modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
        controlModal('close');
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('show')) {
        controlModal('close');
    }
});

// Initialize page with some animations
document.addEventListener('DOMContentLoaded', () => {
    console.log("Page loaded successfully!");
    console.log("Global message:", globalMessage);
    
    // Trigger the fade animation after a short delay
    setTimeout(() => {
        const fadeBox = document.querySelector('.fade-box');
        if (fadeBox) {
            fadeBox.style.animationPlayState = 'running';
        }
    }, 300);
});