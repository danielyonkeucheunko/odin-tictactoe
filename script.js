const gameboard = (function () {
    const boardArr = [
        [Cell(), Cell(), Cell()],
        [Cell(), Cell(), Cell()],
        [Cell(), Cell(), Cell()],
    ];

    const getGameboard = () => {
        return boardArr;
    };

    const print = () => {
        return (
            `${boardArr[0][0].getValue()} | ${boardArr[0][1].getValue()} | ${boardArr[0][2].getValue()}\n` +
            `---------\n` +
            `${boardArr[1][0].getValue()} | ${boardArr[1][1].getValue()} | ${boardArr[1][2].getValue()}\n` +
            `---------\n` +
            `${boardArr[2][0].getValue()} | ${boardArr[2][1].getValue()} | ${boardArr[2][2].getValue()}\n`
        );
    };

    const reset = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                boardArr[i][j].setValue(" ");
            }
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

        if (
            board[0][0].getValue() === board[0][1].getValue() && // Check Horizontals
            board[0][1].getValue() === board[0][2].getValue()
        ) {
            winner = board[0][0].getValue();
        } else if (
            board[1][0].getValue() === board[1][1].getValue() &&
            board[1][1].getValue() === board[1][2].getValue()
        ) {
            winner = board[1][0].getValue();
        } else if (
            board[2][0].getValue() === board[2][1].getValue() &&
            board[2][1].getValue() === board[2][2].getValue()
        ) {
            winner = board[2][0].getValue();
        } else if (
            board[0][0].getValue() === board[1][0].getValue() && // Check Verticals
            board[1][0].getValue() === board[2][0].getValue()
        ) {
            winner = board[0][0].getValue();
        } else if (
            board[0][1].getValue() === board[1][1].getValue() &&
            board[1][1].getValue() === board[2][1].getValue()
        ) {
            winner = board[0][1].getValue();
        } else if (
            board[0][2].getValue() === board[1][2].getValue() &&
            board[1][2].getValue() === board[2][2].getValue()
        ) {
            winner = board[0][2].getValue();
        } else if (
            board[0][0].getValue() === board[1][1].getValue() && // Check Diagonals
            board[1][1].getValue() === board[2][2].getValue()
        ) {
            winner = board[0][0].getValue();
        } else if (
            board[0][2].getValue() === board[1][1].getValue() &&
            board[1][1].getValue() === board[2][0].getValue()
        ) {
            winner = board[0][2].getValue();
        }
    };

    const makeMove = (letter) => {
        let row = parseInt(prompt("Enter the row you would like to play in?"));
        let column = parseInt(
            prompt("Enter the column you would like to play in?")
        );
        while (gameboard.getGameboard()[row][column].getValue() !== " ") {
            alert("Invalid. Try Again!");
            row = parseInt(prompt("Enter the row you would like to play in?"));
            column = parseInt(
                prompt("Enter the column you would like to play in?")
            );
        }

        gameboard.getGameboard()[row][column].setValue(letter);
    };

    const checkDraw = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameboard.getGameboard()[i][j].getValue() === " ") {
                    draw = false;
                    return;
                }
            }
        }
        draw = true;
    };

    const run = () => {
        while (winner === " " && draw === false) {
            currentMove =
                currentMove === player2.letter
                    ? player1.letter
                    : player2.letter;
            makeMove(currentMove);
            checkWinners();
            checkDraw();
            console.log(gameboard.print());
        }

        winner !== " "
            ? console.log(`${currentMove} has Won!`)
            : console.log("DRAW");
    };

    const reset = () => {
        gameboard.reset();
        winner = " ";
        currentMove = player2.letter;
        draw = false;
    };

    const startUp = () => {
        reset();
        run();
    };

    return { startUp };
})();
