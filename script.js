const gameBoard = (() => {
    let board = [];
    const choice = (a,b) => {
        board[b] = a;
        win();
    };

    const winning = (x) => {
        if(x == 'X')
            displayController.winGame(player1.winner());
        else
            displayController.winGame(player2.winner());

        displayController.resetButton();
    };

    const win = () => {
        if (board[0] == board[1] && board[0] == board[2] && board[0] != undefined){
            winning(board[0]);
        }
        else if (board[3] == board[4] && board[3] == board[5] && board[3] != undefined){
            winning(board[3]);
        } 
        else if (board[6] == board[7] && board[6] == board[8] && board[6] != undefined){
            winning(board[6]);
        }
        else if (board[0] == board[3] && board[0] == board[6] && board[0] != undefined){
            winning(board[0]);
        }
        else if (board[1] == board[4] && board[1] == board[7] && board[1] != undefined){
            winning(board[1]);
        } 
        else if (board[2] == board[5] && board[2] == board[8] && board[2] != undefined){
            winning(board[2]);
        }
        else if (board[0] == board[4] && board[0] == board[8] && board[0] != undefined){
            winning(board[0]);
        }
        else if (board[2] == board[4] && board[2] == board[6] && board[2] != undefined){
            winning(board[2]);
        }
        else if (board.filter(x => x != undefined).length == 9){
            displayController.tieGame();
            displayController.resetButton();
        }
    };

    return { choice, board };
})();

const displayController = (() => {
    const square = document.getElementsByClassName('square');
    const bar = document.getElementById('bar');
    const resButton = document.createElement('button');
    const div = document.createElement('div');

    let turn = 0;
    let mark
    
    const computerPlay = () => {
        let id 
        do{
            id = Math.floor( Math.random() * Math.floor(9) );
        }while(gameBoard.board[id] != undefined);

        document.getElementById(id).click()
    };

    Array.from(square).map(x => x.addEventListener('click', () => {
        if (bar.innerHTML == '') {
            if (x.innerHTML == '') {
                if (turn % 2 == 0)
                   mark = 'X';
                else
                    mark = 'O';
                gameBoard.choice(mark, x.id);
                x.innerHTML = mark;
                turn++;

                if (turn % 2 == 0)
                   computerPlay();
            };
        }
    }));

    const resetButton = () => {
        resButton.setAttribute('type', 'reset');
        resButton.setAttribute('id', 'rButton');
        resButton.innerHTML = 'Reset';
        bar.appendChild(resButton);
        resetBoard();
    };

    const resetBoard = () => {
        const rButton = document.getElementById('rButton');
        rButton.addEventListener('click', () => {
            Array.from(square).map(x => x.innerHTML = '');
            rButton.remove();
            div.remove();
            gameBoard.board.length = 0;
            turn = 0;
            computerPlay();
        });
    };

    const winGame = (x) => {
        div.innerHTML = x;
        bar.appendChild(div);
    };

    const tieGame = () => {
        div.innerHTML = 'Tie Game!';
        bar.appendChild(div);
    };

    return { resetButton, winGame, tieGame , computerPlay }
})();

const players = (name) => {
    const winner = () => name + ' Wins!';
    return { name, winner };
};

const promptName = (() => {
    let player2Name
    do{
        player2Name = prompt('Your Name:', 'Name');
    }while(player2Name == null || player2Name == '');

    return{ player2Name }
})();

const player1 = players('Computer');
const player2 = players(promptName.player2Name);

displayController.computerPlay();