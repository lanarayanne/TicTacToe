// import Player from "./Player";
// import Cell from "./Cell";
import Winner from "./TicTacToe/Winner.js";
import CellState from "./TicTacToe/CellState.js";
import Player from "./TicTacToe/Player.js";

export default class TicTacToe {
    constructor(player) {
        this.turn = player;
        this.rows = 3;
        this.cols = 3;
        this.board = [];

        for (let i = 0; i < this.rows; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.board[i][j] = CellState.EMPTY;
            }
        }

        console.log(this.board);
    }

    getBoard() {
        return this.board;
    }

    getTurn() {
        return this.turn;
    }

    inLimit(value, limit) {
        return (value >= 0 && value < limit);
    }

    onBoard({ x, y }) {
        return (this.inLimit(x, this.rows) && this.inLimit(y, this.cols)); //so retorna true se x e y forem true
    }

    move(cell) {
        let { x, y } = cell;
        if (!this.onBoard(cell)) {
            throw new Error("Cell is not on board");
        }
        if (this.board[x][y] !== CellState.EMPTY) {
            throw new Error("Cell is not empty");
        }

        if (this.turn === Player.PLAYER1) {
            this.board[x][y] = CellState.PLAYER1;
            this.turn = Player.PLAYER2;
        } else {
            this.board[x][y] = CellState.PLAYER2;
            this.turn = Player.PLAYER1;
        }
        console.log(this.endOfGame());
        return this.endOfGame();
    }

    endOfGame() {
        const board = this.board;
        let moves = 0;

        for (let i = 0; i < 3; i++) {
            if (board[i][0] !== CellState.EMPTY && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return board[i][0] === CellState.PLAYER1 ? Winner.PLAYER1 : Winner.PLAYER2;
            }
            if (board[0][i] !== CellState.EMPTY && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                return board[0][i] === CellState.PLAYER1 ? Winner.PLAYER1 : Winner.PLAYER2;
            }
        }

        if (board[0][0] !== CellState.EMPTY && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return board[0][0] === CellState.PLAYER1 ? Winner.PLAYER1 : Winner.PLAYER2;
        }

        if (board[0][2] !== CellState.EMPTY && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            return board[0][2] === CellState.PLAYER1 ? Winner.PLAYER1 : Winner.PLAYER2;
        }

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] !== CellState.EMPTY) {
                    moves++;
                }
            }
        }

        if (moves === 9) {
            return Winner.DRAW;
        }

        return Winner.NONE;
    }
}
