let values = []; // Array to store the values to be sorted
let i = 0; // Index variable used in sorting loops
let j = 0; // Index variable used in sorting loops
let sorted = false; // Flag to indicate if the array is sorted
let swappingIndexes = []; // Array to store indexes of bars being swapped

function setup() {
    // Create a canvas with size 500x500
    createCanvas(500, 500);
    // Initialize the values array with 11 elements, each set to a random height
    values = new Array(11);
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
            await sleep(100); // Pause for visualization (adjust the speed of sorting here)
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
    background(0);
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
        console.log("Sorted!");
        noLoop();
    }
}
