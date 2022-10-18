const containerEl = document.querySelector(".container");
const gridEl = document.querySelector(".grid");
const buttonEl = document.querySelector("button");
const checkEl = document.querySelector(".check");
const scoreEl = document.querySelector(".score");
const resultEl = document.querySelector(".game_result");
const restartEl = document.querySelector(".restart");

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

    gridCreation(checkedDifficulty, bombList);

    containerEl.classList.remove("d-none");
    buttonEl.classList.add("d-none");
    checkEl.classList.add("d-none");

    const cellList = document.getElementsByClassName("cell");
    // console.log(cellList);
    // console.log(cellList[48]);
    // console.log(cellList[80]);
    // console.log(cellList[99]);

    let counter = 0;
    let endGame = false;

    /* Background toggler */
    for (let i = 0; i < cellList.length; i++) {
        const cellEl = cellList[i];

        if (bombList.includes(i + 1)) {
            /* pressed a bomb */
            cellEl.addEventListener("click", function () {
                if (!cellEl.classList.contains("pale_red") && !endGame) {
                    cellEl.classList.add("pale_red");
                    console.log("Bomb: ", i + 1);

                    const bombs = document.getElementsByClassName("bomb");
                    // console.log(bombs);
                    for (let j = 0; j < bombs.length; j++) {
                        const bomb = bombs[j];
                        bomb.classList.add("pale_red");
                    }

                    resultEl.innerHTML = "Hai vinto!!";
                    endGame = true;
                    restartEl.classList.remove("d-none");
                }
            });
        } else {
            /* pressed a cell */
            cellEl.addEventListener("click", function () {
                if (!cellEl.classList.contains("light_blue") && !endGame) {
                    cellEl.classList.add("light_blue");
                    console.log(i + 1);

                    counter++;
                    if (counter < checkedDifficulty - 16) {
                        scoreEl.innerHTML = counter;
                    } else {
                        resultEl.innerHTML = "Hai vinto!!";
                        scoreEl.innerHTML = counter;
                        endGame = true;
                        restartEl.classList.remove("d-none");
                    }
                }
            });
        }
    }
});


/* FUNCTIONS */

function gridCreation(difficulty, bombList) {
    for (let i = 0; i < difficulty; i++) {
        const cellEl = document.createElement("div");
        cellEl.classList.add("cell");
        cellEl.innerText = i + 1;

        gridEl.insertAdjacentElement("beforeend", cellEl);
        // console.log(cellEl);

        const cellPerRow = Math.sqrt(difficulty);
        // console.log(cellPerRow);
        cellEl.classList.add(`w_${cellPerRow}`);

        if (bombList.includes(i + 1)) {
            cellEl.classList.add("bomb");
        }
    }
}

function generateRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function sortArray(arr) {
    arr.sort((a, b) => a - b);
    return arr;
}