const containerEl = document.querySelector(".container");
const gridEl = document.querySelector(".grid");
const buttonEl = document.querySelector("button");
const checkEl = document.querySelector(".check")

/* Button that generates the grid */
buttonEl.addEventListener("click", function () {
    const checkedDifficulty = document.querySelector(".form-check-input:checked").value;
    // console.log(checkedDifficulty);

    gridCreation(checkedDifficulty);

    containerEl.classList.remove("d-none");
    buttonEl.classList.add("d-none");
    checkEl.classList.add("d-none");

    const cellList = document.getElementsByClassName("cell");
    // console.log(cellList);
    // console.log(cellList[48]);
    // console.log(cellList[80]);
    // console.log(cellList[99]);

    /* Background toggler */
    for (let i = 0; i < cellList.length; i++) {
        const cellEl = cellList[i];
        cellEl.addEventListener("click", function () {
            cellEl.classList.add("light_blue");
            console.log(i + 1);

            const resultClick = document.querySelector(".col-2 > div");
            resultClick.innerHTML = i + 1;
        });
    }
});


/* FUNCTIONS */

function gridCreation(difficulty) {
    let maxValue;
    switch (difficulty) {
        case "hard":
            maxValue = 100;
            break;
        case "medium":
            maxValue = 81;
            break;
        case "easy":
            maxValue = 49;
            break;
    }

    for (let i = 0; i < maxValue; i++) {
        const cellEl = document.createElement("div");
        cellEl.classList.add("cell");
        addWidthClass(cellEl, difficulty);
        cellEl.innerText = i + 1;

        gridEl.insertAdjacentElement("beforeend", cellEl);
        // console.log(cellEl);
    }
}

function addWidthClass(cell, difficulty) {
    switch (difficulty) {
        case "hard":
            cell.classList.add("w_10");
            break;
        case "medium":
            cell.classList.add("w_9");
            break;
        case "easy":
            cell.classList.add("w_7");
    }
}