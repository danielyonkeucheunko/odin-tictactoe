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

    const makeMove = (letter) => {
        let cell = parseInt(
            prompt("Enter the cell you would like to play in?")
        );

        while (gameboard.getGameboard()[cell].getValue() !== " ") {
            alert("Invalid. Try Again!");
            cell = parseInt(
                prompt("Enter the cell you would like to play in?")
            );
        }

        gameboard.getGameboard()[cell].setValue(letter);
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
