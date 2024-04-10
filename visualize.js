let values = [];
let sortingAlgorithm = 'Bubble Sort';
let sortingFinished = false;
let animationSpeed = 10; // Adjust as needed

function setup() {
    createCanvas(min(windowWidth, 500), 500);

    let numElements = floor(width / 10);
    values = new Array(numElements);
    for (let i = 0; i < values.length; i++) {
        values[i] = random(height);
    }

    let algorithmSelector = createSelect();
    algorithmSelector.position(3 * windowWidth / 4, windowHeight / 12);
    algorithmSelector.option('Bubble Sort');
    algorithmSelector.option('Selection Sort');
    algorithmSelector.option('Insertion Sort');
    algorithmSelector.option('Merge Sort');
    algorithmSelector.option('Quick Sort');

    algorithmSelector.changed(() => {
        sortingAlgorithm = algorithmSelector.value();
        values = new Array(numElements);
        for (let i = 0; i < values.length; i++) {
            values[i] = random(height);
        }
        sortingFinished = false;
        loop();
    });

    let startButton = createButton('Start Sorting');
    startButton.position(3 * windowWidth / 4, windowHeight / 12 - 25);
    startButton.mousePressed(() => {
        if (sortingAlgorithm) {
            startSorting();
        }
    });
}

async function startSorting() {
    sortingFinished = false;
    
    if (sortingAlgorithm === 'Bubble Sort') {
        await bubbleSort(values);
    } else if (sortingAlgorithm === 'Selection Sort') {
        await selectionSort(values);
    } else if (sortingAlgorithm === 'Insertion Sort') {
        await insertionSort(values);
    } else if (sortingAlgorithm === 'Merge Sort') {
        await mergeSort(values);
    } else if (sortingAlgorithm === 'Quick Sort') {
        await quickSort(values);
    } 
    sortingFinished = true;
    noLoop();
}

async function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                await swap(arr, j, j + 1);
            }
        }
    }
}

async function selectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        await swap(arr, i, minIndex);
    }
}

async function insertionSort(arr) {
    let n = arr.length;
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            await swap(arr, j + 1, j);
            j--;
        }
        arr[j + 1] = key;
    }
}

// Merge Sort
async function mergeSort(a) {
    // create copy of the array 
    copy = a.slice()
    // asynchronous sort the copy
    await mergeSortSlice(copy, 0, copy.length);
    return;
}

async function mergeSortSlice(a, start, end) {
    if (end-start <= 1)
        return;
    
    var mid = Math.round((end+start) / 2);

    // wait till divides are sort 
    await mergeSortSlice(a, start, mid);
    await mergeSortSlice(a, mid, end);

     // merge divides
    let i = start, j = mid;
    while (i < end && j < end) {
        if (a[i] > a[j]) {
            let t = a[j]; a.splice(j, 1); a.splice(i, 0, t);
            j ++;
        }
        i ++;
        if (i==j) j ++;

        // copy back the current state of the sorting
        values = a.slice();
        
        // slow down
        await sleep(animationSpeed);
    }
}

async function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        let partitionIndex = await partition(arr, left, right);
        await quickSort(arr, left, partitionIndex - 1);
        await quickSort(arr, partitionIndex + 1, right);
    }
    return arr;
}

async function partition(arr, left, right) {
    let pivot = arr[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
            i++;
            await swap(arr, i, j);
        }
    }
    await swap(arr, i + 1, right);
    return i + 1;
}


async function swap(arr, a, b) {
    await sleep(animationSpeed);
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function draw() {
    background(100);
    for (let i = 0; i < values.length; i++) {
        let x = i * 10;
        let y = height - values[i];
        let w = 10;
        let h = values[i];
        fill(255);
        rect(x, y, w, h);
    }

    if (sortingFinished) {
        noLoop();
    }
}