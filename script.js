

const player = sign => {
    
    const getSign = () => {
        return sign;
    }
    return{getSign};
};

const gameBoard = (() => {

    let board = ["", "", "", "", "", "", "", "", ""];
    
    const setBox = (index, toSet) => {
        board[index] = toSet;
    };

    const getBox = (index) => {
        return board[index];
    };

    return {setBox, getBox};
})();

const displayController = (() => {
    const player1 = player("X");
    const player2 = player("O");
    let whoseTurn = player1;
    let playerWon = false;
    const winCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    const boxes = document.querySelectorAll('.box');
    let message = document.querySelector('.current-instance-message');
    const changeTurn = () => {
        if(whoseTurn === player1){ whoseTurn = player2; }
        else{ whoseTurn = player1; }
    }

    const checkWin = (turn) => {
        for(let i = 0; i < winCombinations.length; i++){
            if(gameBoard.getBox(winCombinations[i][0])===turn.getSign()&&
            gameBoard.getBox(winCombinations[i][1])===turn.getSign()&&
            gameBoard.getBox(winCombinations[i][2])===turn.getSign()){
                playerWon = true;
                message.innerHTML = "Player " + turn.getSign() + " Has Won The Game!";
            }
        }
    }

    const restartGame = () => {
        for(let i = 0; i < 9; i++){
            gameBoard.setBox(i,"");
            boxes[i].innerHTML = "";
            playerWon = false;
            whoseTurn = player1;
        }
        message.innerHTML = "Player X Goes First";
    }

    const move = (dataIndex, turn) => {
        if(gameBoard.getBox(dataIndex) != "" || playerWon === true){ return;}
        boxes[dataIndex].innerHTML = turn.getSign();
        gameBoard.setBox(dataIndex, turn.getSign());
        changeTurn();
        message.innerHTML = "Player " + whoseTurn.getSign() + " Turn";
        checkWin(turn);
    };

    boxes.forEach(element => element.addEventListener("click",()=>{move(parseInt(element.dataset.index), whoseTurn);} ));

    const restartBtn = document.querySelector('.restart').addEventListener('click', ()=>{restartGame();});

})();
