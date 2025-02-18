let gameMode = "pvp"; // Modo de juego por defecto
document.getElementById("gameMode").addEventListener("change", function() {
    gameMode = this.value;
    reset();
});

let turn = "X";
let board = ["", "", "", "", "", "", "", "", ""];

// Función para hacer un movimiento
function makeMove(index) {
    if (board[index] === "" && !checkWin()) {
        board[index] = turn;
        document.getElementById(`b${index + 1}`).innerText = turn;

        if (checkWin()) {
            p = document.getElementById("print");
            p.setAttribute("style", "color: white; display: flex; justify-content: center;");
            p.innerText = `El jugador ${turn} ha ganado`;
            disableAll();
            return;
        }

        turn = turn === "X" ? "O" : "X";

        if (gameMode === "pvc" && turn === "O") {
            setTimeout(machineMove, 100);
        } else {
            p = document.getElementById("print");
            p.setAttribute("style", "color: white; display: flex; justify-content: center;");
            p.innerText = `Turno del jugador ${turn}`;
        }
    }
}

// Movimiento de la máquina
function machineMove() {
    let emptyCells = board.map((val, index) => (val === "" ? index : null)).filter(val => val !== null);
    if (emptyCells.length > 0) {
        let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        makeMove(randomIndex);
    }
}

// Verifica si hay un ganador
function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

// Deshabilita las casillas después de ganar
function disableAll() {
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`b${i}`).onclick = null;
    }
}

// Reinicia el juego        
function reset() {
    board = ["", "", "", "", "", "", "", "", ""];
    turn = "X";
    let p = document.getElementById("print");
    p.setAttribute("style", "color: white; display: flex; justify-content: center;");
    p.innerText =    "  Turno del jugador X";
    for (let i = 1; i <= 9; i++) {
        let cell = document.getElementById(`b${i}`);
        cell.innerText = "";
        cell.onclick = function() { makeMove(i - 1); };
    }
}