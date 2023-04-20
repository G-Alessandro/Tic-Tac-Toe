const playerOne = {
  name: 'player1',
  marker: 'X',
  point: '',
};

const playerTwo = {
  name: 'player2',
  marker: 'X',
  point: '',
};

const functionModule = (() => {
  const gameBoard = document.getElementById('gameBoard');
  const restartBtn = document.getElementById('restartBtn');
  const selectDiv = gameBoard.querySelectorAll('div');
  const score1 = document.getElementById('score1');
  const tieScore = document.getElementById('tieScore');
  const score2 = document.getElementById('score2');
  let scorePlayer1 = 0;
  let tie = 0;
  let scorePlayer2 = 0;
  score1.textContent = scorePlayer1;
  tieScore.textContent = tie;
  score2.textContent = scorePlayer2;
  let playerSign = ['', '', '', '', '', '', '', '', ''];

  const restart = () => {
    restartBtn.addEventListener('click', () => {
      selectDiv.forEach((div) => div.textContent = '');
      scorePlayer1 = 0;
      scorePlayer2 = 0;
      score1.textContent = scorePlayer1;
      score2.textContent = scorePlayer2;
      playerSign = ['', '', '', '', '', '', '', '', ''];
    });
  };

  const winEnd = () => {
    const selectDiv = gameBoard.querySelectorAll('div');
    selectDiv.forEach((div) => div.textContent = '');
  };

  const endGame = () => {
    // 0-2    3-5    6-8   0-3-6   1-4-7   2-5-8   0-4-8   2-4-6
    const arrZero = playerSign[0];
    const arrOne = playerSign[1];
    const arrTwo = playerSign[2];
    const arrThree = playerSign[3];
    const arrFour = playerSign[4];
    const arrFive = playerSign[5];
    const arrSix = playerSign[6];
    const arrSeven = playerSign[7];
    const arrEight = playerSign[8];

    const vertResOne = arrZero + arrThree + arrSix;
    const vertResTwo = arrOne + arrFour + arrSeven;
    const vertResThree = arrTwo + arrFive + arrEight;
    const diagResOne = arrZero + arrFour + arrEight;
    const diagResTwo = arrTwo + arrFour + arrSix;

    if (playerSign.slice(0, 3).join('') === 'xxx'
    || playerSign.slice(3, 6).join('') === 'xxx'
    || playerSign.slice(6, 9).join('') === 'xxx'
    || vertResOne === 'xxx'
    || vertResTwo === 'xxx'
    || vertResThree === 'xxx'
    || diagResOne === 'xxx'
    || diagResTwo === 'xxx') {
      scorePlayer1++;
      playerSign = ['', '', '', '', '', '', '', '', ''];
      winEnd();
    }
    if (playerSign.slice(0, 3).join('') === 'ooo'
    || playerSign.slice(3, 6).join('') === 'ooo'
    || playerSign.slice(6, 9).join('') === 'ooo'
    || vertResOne === 'ooo'
    || vertResTwo === 'ooo'
    || vertResThree === 'ooo'
    || diagResOne === 'ooo'
    || diagResTwo === 'ooo') {
      scorePlayer2++;
      playerSign = ['', '', '', '', '', '', '', '', ''];
    }

    
    score1.textContent = scorePlayer1;
    score2.textContent = scorePlayer2;
    console.log(scorePlayer1);
    console.log(scorePlayer2);
    console.log(playerSign);
  };

  const signTotal = () => {
    let totalX = 1;
    let totalO = 0;
    for (let i = 0; i < playerSign.length; i++) {
      const signFound = playerSign[i];
      if (signFound === 'x') {
        totalX++;
      }
      if (signFound === 'o') {
        totalO++;
      }
    }
    return totalX > totalO;
  };

  const assignSign = () => {
    for (let i = 0; i < 9; i++) {
      const squareDiv = document.createElement('div');
      squareDiv.classList.add(`square${i}`);
      gameBoard.appendChild(squareDiv);
      squareDiv.addEventListener('click', () => {
        if (playerSign[0] === '') {
          squareDiv.textContent = 'X';
          playerSign.splice(i, 1, 'x');
        }
        if (signTotal() === true) {
          squareDiv.textContent = 'O';
          playerSign.splice(i, 1, 'o');
        }
        if (signTotal() === false) {
          squareDiv.textContent = 'X';
          playerSign.splice(i, 1, 'x');
        }
        endGame();
      });
    }
  };

  return {
    endGame, signTotal, assignSign, restart, winEnd,
  };
})();

functionModule.assignSign();
functionModule.restart();
