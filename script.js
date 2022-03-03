
const gameBoard = (() => {
    let gameboard = [0,0,0,0,0,0,0,0,0];
    const getGameboard = () => {
        return gameboard;
    };
    const getTile = (position) => {
        return gameboard[position];
    };
    const setTile = (position, value) => {
        if (gameboard[position] === 0){
            gameboard[position] = value;
            return true;
        } else {
            return false;
        };
    };
    const checkWin = () => {
        let winnerValue;
        if (gameboard[0] === gameboard[1] && gameboard[1] === gameboard[2] && gameboard[0] != 0){
            winnerValue = gameboard[0];
        } else if (gameboard[3] === gameboard[4] && gameboard[4] === gameboard[5] && gameboard[3] != 0) {
            winnerValue = gameboard[3];
        } else if (gameboard[6] === gameboard[7] && gameboard[7] === gameboard[8] && gameboard[6] != 0) {
            winnerValue = gameboard[6];
        } else if (gameboard[0] === gameboard[3] && gameboard[3] === gameboard[6] && gameboard[0] != 0) {
            winnerValue = gameboard[0];
        } else if (gameboard[1] === gameboard[4] && gameboard[4] === gameboard[7] && gameboard[1] != 0) {
            winnerValue = gameboard[1];
        } else if (gameboard[2] === gameboard[5] && gameboard[5] === gameboard[8] && gameboard[2] != 0) {
            winnerValue = gameboard[2];
        } else if (gameboard[0] === gameboard[4] && gameboard[4] === gameboard[8] && gameboard[0] != 0) {
            winnerValue = gameboard[0];
        } else if (gameboard[2] === gameboard[4] && gameboard[4] === gameboard[6] && gameboard[2] != 0) {
            winnerValue = gameboard[2];
        }
        if (winnerValue){
            game.setWinner(winnerValue);
            game.gameOver();
        };
        
    };
    const resetBoard = () => {
        gameboard = [0,0,0,0,0,0,0,0,0];
    }
    

    return {getTile, setTile, getGameboard, checkWin, resetBoard};
})();

const Player = (id, value) => {
    const getID = () => id;
    const getValue = () => value;
    return {getID, getValue};
};

const game = (() => {
    let turn = 0;
    let turnsLeft = 9;
    let winner = 0;
    const resetTurns = () => {
        turnsLeft = 9;
    };
    const play = (player, position) => {
        if(gameBoard.setTile(position, player.getValue()) && turnsLeft > 0) {
            turnsLeft -= 1;
            displayController.updateTile(position, player.getValue());
            gameBoard.checkWin();
            if (turnsLeft > 0){
                switchTurn();
            }else {
                gameOver();
            }
            
        };
    };
    const setWinner = (value) => {
        winner = value;
    };
    const getWinner = () => {
        return winner;
    };
    const gameOver = () => {
        turnsLeft = 0;
        displayController.showEndStatus();
    };
    const switchTurn = () => {
        if (turn === 0) {
            turn = 1;
            if(turnsLeft > 0){
                play(player2, selectRandom());
            }
        }else {
            
            turn = 0;
        }
    };
    const getTurn = () => turn;
    const getPlayer = () => {
        if (turn === 0 ){
            return player1;
        } else {
            return player2;
        };
    };
    const selectRandom = () => {
        let value = 1;
        let random;
        while (value != 0){
            random = Math.floor(Math.random() * 9);
            value = gameBoard.getTile(random);
        }
        

        return random;
    };

    return {play, switchTurn, getTurn, getPlayer, gameOver, setWinner, getWinner, resetTurns};
})();

const displayController = (() => {
    const updateTile = (position, value) => {
        let statusBar = document.querySelector("#status-bar")
        statusBar.textContent = "      ";
        const tiles = document.querySelectorAll("div.board-tile");
        for (let i = 0; i < tiles.length; i++) {
            if (i == position){
                //console.log(tiles[i].classList[1]);
                let text = ""
                if (game.getPlayer().getValue() == 1){
                    text = "X"
                } else {
                    text = "O"
                }
                tiles[i].textContent = text;
            };
            
        }
        //console.log(tiles);
    };
    const showEndStatus = () => {
        let div = document.querySelector("#status-bar");
        let finalText;
        if (game.getWinner() == 0){
            finalText = "It's a TIE!"
        } else if (game.getWinner() == 2) {
            finalText = "AI wins!";
        } else if (game.getWinner() == 1){
            finalText = "You won!";
        }
        div.textContent = `${finalText}`;
        
        
    };
    const setupBoard = () => {

        let newGameBtn = document.querySelector("#new-game-btn");
        newGameBtn.addEventListener("click", () => {
            newGame();
        })
        let statusBar = document.querySelector("#status-bar")
        statusBar.textContent = "Click a tile";
        let container = document.querySelector("#game-board");
        container.innerHTML = "";
        for (let i = 0; i < gameBoard.getGameboard().length; i++) {
            let div = document.createElement('div');
            //div.appendChild(document.createTextNode("0"));
            div.classList.add('board-tile', `${i}`);
            div.addEventListener("click", () => {
                if (game.getTurn() === 0){
                    //div.textContent = game.getPlayer().getValue();
                    game.play(game.getPlayer(), div.classList[1]);
                    
                }
                
            });
            container.appendChild(div);
            
        };
    };
    const newGame = () => {
        gameBoard.resetBoard();
        game.resetTurns();
        setupBoard();

    }
    return {updateTile, setupBoard, showEndStatus};
})();

const player1 = Player(0, 1);
const player2 = Player(1, 2);

displayController.setupBoard();

/*
console.log(gameBoard.getTile(1));
console.log(`Turn: ${game.getTurn()}`);
game.play(player1, 1);
console.log(gameBoard.getTile(1));
console.log(`Turn: ${game.getTurn()}`);
game.play(player2, 1);
console.log(gameBoard.getTile(1));
console.log(`Turn: ${game.getTurn()}`);
*/