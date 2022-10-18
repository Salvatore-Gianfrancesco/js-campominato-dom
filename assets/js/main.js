const containerEl = document.querySelector(".container");
const gridEl = document.querySelector(".grid");
const buttonEl = document.querySelector("button");
const checkEl = document.querySelector(".check")

/* Button that generates the grid */
buttonEl.addEventListener("click", function () {
    const checkedDifficulty = Number(document.querySelector(".form-check-input:checked").value);
    // console.log(checkedDifficulty);

    let bombList = [];
    while (bombList.length !== 16) {
        const num = generateRandom(1, checkedDifficulty + 1);

        if (!bombList.includes(num)) {
            bombList.push(num);
        }
    }
    // console.log(bombList);
    bombList = sortArray(bombList);
    console.log(bombList);

    gridCreation(checkedDifficulty);

    containerEl.classList.remove("d-none");
    // buttonEl.classList.add("d-none");
    checkEl.classList.add("d-none");

    const cellList = document.getElementsByClassName("cell");
    // console.log(cellList);
    // console.log(cellList[48]);
    // console.log(cellList[80]);
    // console.log(cellList[99]);

    /* Background toggler */
    for (let i = 0; i < cellList.length; i++) {
        const cellEl = cellList[i];

        if (bombList.includes(i + 1)) {
            addBgClass(cellEl, "pale_red", i + 1);
        } else {
            addBgClass(cellEl, "light_blue", i + 1);
        }
    }
});


/* FUNCTIONS */

function gridCreation(difficulty) {
    for (let i = 0; i < difficulty; i++) {
        const cellEl = document.createElement("div");
        cellEl.classList.add("cell");
        cellEl.innerText = i + 1;

        gridEl.insertAdjacentElement("beforeend", cellEl);
        // console.log(cellEl);

        const cellPerRow = Math.sqrt(difficulty);
        // console.log(cellPerRow);
        cellEl.classList.add(`w_${cellPerRow}`);
    }
}

function addBgClass(element, color, index) {
    element.addEventListener("click", function () {
        element.classList.add(color);
        console.log(index);
    });
}

function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function sortArray(arr) {
    arr.sort((a, b) => a - b);
    return arr;
}