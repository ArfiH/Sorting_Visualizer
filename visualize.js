let values = []; 
let i = 0;
let j = 0;
let sorted = false;
let swappingIndexes = [];
let animationSpeed = 100;

function setup() {
    createCanvas(min(windowWidth, 700), 500);

    let numElements = floor(width / 50); // Calculate number of elements based on canvas width
    // Initialize the values array each set to a random height
    values = new Array(numElements);
    for (let i = 0; i < values.length; i++) {
        values[i] = random(height);
    }

    // Start sorting once setup is done
    bubbleSort();
}

// Bubble sort algorithm
async function bubbleSort() {
    // Nested loops to compare and swap elements
    for (i = 0; i < values.length; i++) {
        for (j = 0; j < values.length - i - 1; j++) {
            // Highlight the bars being compared
            swappingIndexes = [j, j + 1];

            await sleep(animationSpeed); // Pause for visualization (adjust the speed of sorting here)
            // If current element is greater than next element, swap them

            if (values[j] > values[j + 1]) {
                await swap(values, j, j + 1);
                sorted = false; // Set sorted to false if a swap occurs
            }
            // Clear the highlight after swapping
            swappingIndexes = [];
        }
    }
    sorted = true; // Set sorted to true once sorting is complete
}

// Function to swap two elements in the array
async function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

// Utility function to pause execution for a given number of milliseconds
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function draw() {
    // Set the background color to black
    background(100);
    // Calculate the width of each bar based on the canvas width and the number of elements
    let barWidth = width / values.length;

    // Draw bars for each element in the array
    for (let i = 0; i < values.length; i++) {
        let x = i * barWidth; // Calculate the x-coordinate of the bar
        let y = height - values[i]; // Calculate the y-coordinate of the top of the bar
        let barHeight = values[i]; // Height of the bar
        // Set the fill color based on whether the bar is being swapped
        if (swappingIndexes.includes(i)) {
            fill(255, 0, 0); // Red color for bars being swapped
        } else {
            fill(255); // White color for other bars
        }
        rect(x, y, barWidth, barHeight); // Draw the bar
    }

    // If the array is sorted, print "Sorted!" to the console and stop the loop
    if (sorted) {
        for (let i = 0; i < values.length; i++) {
            let x = i * barWidth; // Calculate the x-coordinate of the bar
            let y = height - values[i]; // Calculate the y-coordinate of the top of the bar
            let barHeight = values[i]; // Height of the bar
            let gradient = map(values[i], 0, height, 0, 1);
            let from = color(20);
            let to = color(250);
            let gradientColor = lerpColor(from, to, gradient);
            fill(gradientColor);
            rect(x, y, barWidth, barHeight); // Draw the bar
        }   
        console.log("Sorted!");
        noLoop();
    }
}
