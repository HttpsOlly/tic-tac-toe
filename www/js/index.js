/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
// document.addEventListener('deviceready', onDeviceReady, false);

// function onDeviceReady() {
//     // Cordova is now initialized. Have fun!

//     console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
//     document.getElementById('deviceready').classList.add('ready');
// }


window.addEventListener('DOMContentLoaded', () => {
    const playerDisplay = document.querySelector(".display-turn")

    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let isGameActive = true;

    const winningMessage = () => `Player ${currentPlayer} wins! 🥳`;
    const tiedMessage = () => `Game tied!`;
    const playerTurn = () => `Player ${currentPlayer}'s turn...`;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    playerDisplay.innerHTML = playerTurn();
    console.log(playerTurn());

    function cellPlayed(clickedCell, clickedCellIndex) {
        gameBoard[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = currentPlayer;
    }

    function changePlayer() {
        if (currentPlayer === "X") {
            currentPlayer = "O";
        } else {
            currentPlayer = "X";
        }

        playerDisplay.innerHTML = playerTurn();
    }

    function determineResult() {
        let someoneHasWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];

            let firstCell = gameBoard[winCondition[0]];
            let secondCell = gameBoard[winCondition[1]];
            let thirdCell = gameBoard[winCondition[2]];

            if (firstCell === "" || secondCell === "" || thirdCell === "") {
                continue;
            }

            if (firstCell === secondCell && secondCell === thirdCell) {
                someoneHasWon = true;
                break;
            }
        }

        if (someoneHasWon) {
            winningCells = document.querySelectorAll(`.classname${currentPlayer}`);

            for (prop of winningCells) {
                prop.style.backgroundColor = "gold";
            }

            playerDisplay.innerHTML = winningMessage();
            isGameActive = false;
            return prop;
        }

        if (!gameBoard.includes("")) {
            var gameTied = true;
        }

        if (gameTied) {
            playerDisplay.innerHTML = tiedMessage();
            isGameActive = false;
            return;
        }

        changePlayer();
    }

    function cellClicked(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        clickedCell.classList.add(`classname${currentPlayer}`);
        const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));

        if (gameBoard[clickedCellIndex] !== "" || !isGameActive) {
            return false;
        }

        cellPlayed(clickedCell, clickedCellIndex);
        determineResult();
    }

    function restartGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        isGameActive = true;
        currentPlayer = "X";

        var allCells = document.querySelectorAll('.grid > div');

        for (prop of allCells) {
            if (prop.classList.contains(`classnameX`)) {
                prop.classList.remove(`classnameX`)
            } else {
                prop.classList.remove(`classnameO`)
            }
            prop.style.backgroundColor = null;
        }

        playerDisplay.innerHTML = playerTurn();
        document.querySelectorAll(".tile").forEach(cell => cell.innerHTML = "");
    }

    document.querySelectorAll(".tile").forEach(cell => cell.addEventListener("click", cellClicked));
    document.getElementById("reset-button").addEventListener("click", restartGame);
})