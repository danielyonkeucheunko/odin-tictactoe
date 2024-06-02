const gameboard = (function () {
    const boardArr = [
        Cell(),
        Cell(),
        Cell(),
        Cell(),
        Cell(),
        Cell(),
        Cell(),
        Cell(),
        Cell(),
    ];

    const getGameboard = () => {
        return boardArr;
    };

    const print = () => {
        return (
            `${boardArr[0].getValue()} | ${boardArr[1].getValue()} | ${boardArr[2].getValue()}\n` +
            `---------\n` +
            `${boardArr[3].getValue()} | ${boardArr[4].getValue()} | ${boardArr[5].getValue()}\n` +
            `---------\n` +
            `${boardArr[6].getValue()} | ${boardArr[7].getValue()} | ${boardArr[8].getValue()}\n`
        );
    };

    const reset = () => {
        for (let i = 0; i < 9; i++) {
            boardArr[i].setValue(" ");
        }
    };

    return { getGameboard, print, reset };
})();

function Cell() {
    let value = " ";

    const getValue = () => {
        return value;
    };

    const setValue = (val) => {
        value = val;
    };

    return { getValue, setValue };
}

function Player(name, letter) {
    return { name, letter };
}

const GameLogic = (function (
    player1 = Player("Player1", "X"),
    player2 = Player("Player2", "O")
) {
    let winner = " ";
    let currentMove = player2.letter;
    let draw = false;

    const checkWinners = () => {
        const board = gameboard.getGameboard();

        // Check Horizontals
        if (
            board[0].getValue() === board[1].getValue() &&
            board[1].getValue() === board[2].getValue()
        ) {
            winner = board[0].getValue();
        } else if (
            board[3].getValue() === board[4].getValue() &&
            board[4].getValue() === board[5].getValue()
        ) {
            winner = board[3].getValue();
        } else if (
            board[6].getValue() === board[7].getValue() &&
            board[7].getValue() === board[8].getValue()
        ) {
            winner = board[6].getValue();
        } else if (
            board[0].getValue() === board[3].getValue() && // Check Verticals
            board[3].getValue() === board[6].getValue()
        ) {
            winner = board[0].getValue();
        } else if (
            board[1].getValue() === board[4].getValue() &&
            board[4].getValue() === board[7].getValue()
        ) {
            winner = board[1].getValue();
        } else if (
            board[2].getValue() === board[5].getValue() &&
            board[5].getValue() === board[8].getValue()
        ) {
            winner = board[2].getValue();
        } else if (
            board[0].getValue() === board[4].getValue() && // Check Diagonals
            board[4].getValue() === board[8].getValue()
        ) {
            winner = board[0].getValue();
        } else if (
            board[2].getValue() === board[4].getValue() &&
            board[4].getValue() === board[6].getValue()
        ) {
            winner = board[2].getValue();
        }
    };

    const checkDraw = () => {
        for (let i = 0; i < 9; i++) {
            if (gameboard.getGameboard()[i].getValue() === " ") {
                draw = false;
                return;
            }
        }
        draw = true;
    };

    const makeMove = (index) => {
        if (
            gameboard.getGameboard()[index].getValue() === " " &&
            winner === " " &&
            draw == false
        ) {
            gameboard.getGameboard()[index].setValue(currentMove);

            checkWinners();
            checkDraw();
            Renderer.render();

            console.log(gameboard.print());
            if (winner !== " ") {
                Renderer.displayWinner(currentMove);
            } else if (draw && winner === " ") {
                Renderer.displayDraw();
            }
            currentMove =
                currentMove === player2.letter
                    ? player1.letter
                    : player2.letter;
        }
    };

    const reset = () => {
        gameboard.reset();
        Renderer.reset();
        Renderer.resetOutcome();
        winner = " ";
        currentMove = player2.letter;
        draw = false;
    };

    return { reset, makeMove };
})();

const Renderer = (function () {
    document.documentElement
        .querySelectorAll("button[index]")
        .forEach((button) => {
            button.addEventListener("click", (event) => {
                let index = parseInt(event.target.getAttribute("index"));
                GameLogic.makeMove(index);
            });
        });

    document.documentElement
        .querySelector(".resetButton")
        .addEventListener("click", GameLogic.reset);

    const render = () => {
        for (let i = 0; i < 9; i++) {
            document.documentElement.querySelector(
                `button[index="${i}"]`
            ).textContent = gameboard.getGameboard()[i].getValue();
        }
    };

    const reset = () => {
        for (let i = 0; i < 9; i++) {
            document.documentElement.querySelector(
                `button[index="${i}"]`
            ).textContent = "";
        }
    };

    const displayWinner = (winner) => {
        document.documentElement.querySelector(
            ".outcome"
        ).textContent = `${winner} has won!`;
    };

    const displayDraw = () => {
        document.documentElement.querySelector(".outcome").textContent = "DRAW";
    };

    const resetOutcome = () => {
        document.documentElement.querySelector(".outcome").textContent = "";
    };

    return { render, reset, displayDraw, displayWinner, resetOutcome };
})();
