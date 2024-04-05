let values = [];
let i = 0;
let j = 0;
let sorted = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    values = new Array(10);
    for (let i = 0; i < values.length; i++) {
        values[i] = random(height);
    }

    // Start sorting once setup is done
    bubbleSort();
}

async function bubbleSort() {
    for (i = 0; i < values.length; i++) {
        for (j = 0; j < values.length - i - 1; j++) {
            if (values[j] > values[j + 1]) {
                await swap(values, j, j + 1);
                sorted = false; // Set sorted to false if a swap occurs
            }
        }
    }
    sorted = true; // Set sorted to true once sorting is complete
}

async function swap(arr, a, b) {
    await sleep(100); // Adjust the speed of sorting here (milliseconds)
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function draw() {
    background(200); // Grey background
    strokeWeight(5); 
    
    for (let i = 0; i < values.length; i++) {
        stroke(255);
        line(i * 10, height, i * 10, height - values[i]);
    }

    if (sorted) {
        console.log("Sorted!");
        noLoop();
    }
}
