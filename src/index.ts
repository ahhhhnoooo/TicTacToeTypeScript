class TicTacToeGameState {
    /* 
        The board is laid out in rows of 3
        0,1,2
        3,4,5
        6,7,8 
    */
    /** The board spaces 0-8 state: '' or 'x' or 'o' */
    board: string[];
    /** The player that won the game: '' or 'x' or 'o' */
    winner: string;
    /** The current player: 'x' or 'o' */
    turn: string;
}
class TicTacToeGame {
    static onClick = (game, index): TicTacToeGameState => {
        let result: TicTacToeGameState = game;
        if (game.winner === '') {
            //Clone the game object
            result = {
                board : game.board.slice(),
                turn : game.turn,
                winner: ''
            }
            //Mark the move
            result.board[index] = game.turn;
            //Check for a winner
            result.winner = TicTacToeGame.checkWinner(result.board, game.turn);
            //If nobody won, set next turn
            if (result.winner === '') {
                result.turn = TicTacToeGame.nextTurn(game.turn);
            }
        }
        //Return the new (or existing) game object
        return result;
    }

    //Manually checking for the winner
    static checkWinner = (board, turn): string => {
        if (
            (turn === board[0] && turn === board[1] && turn === board[2]) ||
            (turn === board[3] && turn === board[4] && turn === board[5]) ||
            (turn === board[6] && turn === board[7] && turn === board[8]) ||
            (turn === board[0] && turn === board[3] && turn === board[6]) ||
            (turn === board[1] && turn === board[4] && turn === board[7]) ||
            (turn === board[2] && turn === board[5] && turn === board[8]) ||
            (turn === board[0] && turn === board[4] && turn === board[8]) ||
            (turn === board[2] && turn === board[4] && turn === board[6])) {
            console.log(turn, " WINS");
            return turn;
        } else {
            return '';
        }
    }

    //Change to the other player's turn
    static nextTurn = (turn): string => {
         return (turn === 'x') ? 'o' : 'x';
    }

    static init = (): TicTacToeGameState => {
        return {
            board: [],
            winner: '',
            turn: 'x'
        }
    }
}
class HTMLRenderer {
    game = new TicTacToeGameState();

    onClickSpace = (index, element) => {
        element.innerText = this.game.turn;
        this.game = TicTacToeGame.onClick(this.game, index); 
        if(this.game.winner){
            let gameElement = document.getElementById("game");
            let gameEndElement = document.createElement("div");
            gameEndElement.className = "end";
            gameEndElement.innerText = this.game.winner + " WINS";
            gameElement.appendChild(gameEndElement);
        }
    }

    init = () => {
        this.game = TicTacToeGame.init();
        let gameElement = document.getElementById("game");
        let gameRowElement;
        for (let index = 0; index < 9; ++index) {
            if (index % 3 === 0) {
                gameRowElement = document.createElement("div");
                gameRowElement.className = "row";
                gameElement?.appendChild(gameRowElement);
            }
            let gameCellElement = document.createElement("div");
            gameCellElement.className = "cell";
            gameRowElement.appendChild(gameCellElement);
            gameCellElement.onclick = (() => this.onClickSpace(index, gameCellElement));
        }
    }
}

let renderer = new HTMLRenderer();
renderer.init();