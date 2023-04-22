const functionModule = (() => {
  const gameBoard = document.getElementById('gameBoard');
  const divPlayer1 = document.getElementById('scorePlayer1');
  const divTie = document.getElementById('tiePlayers');
  const divPlayer2 = document.getElementById('scorePlayer2');
  const score1 = document.getElementById('score1');
  const tieScore = document.getElementById('tieScore');
  const score2 = document.getElementById('score2');
  const btnStart = document.getElementById('btnStart');
  const restartBtn = document.getElementById('restartBtn');
  let scorePlayer1 = 0;
  let tie = 0;
  let scorePlayer2 = 0;
  score1.textContent = scorePlayer1;
  tieScore.textContent = tie;
  score2.textContent = scorePlayer2;
  let playerSign = ['', '', '', '', '', '', '', '', ''];

  const restart = () => {
    restartBtn.addEventListener('click', () => {
      const selectDiv = gameBoard.querySelectorAll('div');
      selectDiv.forEach((div) => div.textContent = '');
      scorePlayer1 = 0;
      tie = 0;
      scorePlayer2 = 0;
      score1.textContent = scorePlayer1;
      tieScore.textContent = tie;
      score2.textContent = scorePlayer2;
      playerSign = ['', '', '', '', '', '', '', '', ''];
    });
  };

  const tieEnd = () => {
    let x = 0;
    for (let i = 0; i < 9; i++) {
      if (playerSign[i] !== '') {
        x++;
      }
    }
    return x;
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
      setTimeout(winEnd, 200);
      divPlayer2.classList.toggle('playerTurn');
      divPlayer1.classList.toggle('playerTurn');
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
      setTimeout(winEnd, 200);
    }

    if (tieEnd() === 9) {
      tie++;
      playerSign = ['', '', '', '', '', '', '', '', ''];
      setTimeout(winEnd, 200);
    }

    score1.textContent = scorePlayer1;
    tieScore.textContent = tie;
    score2.textContent = scorePlayer2;
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
      squareDiv.classList.add('square');
      gameBoard.appendChild(squareDiv);
      divPlayer1.classList.toggle('playerTurn');
      squareDiv.addEventListener('click', () => {
        if (divTie.classList.toggle('playerTurn') === true) {
          divTie.classList.toggle('playerTurn');
        }
        if (playerSign[0] === '') {
          squareDiv.textContent = 'X';
          playerSign.splice(i, 1, 'x');
        }
        if (signTotal() === true) {
          squareDiv.textContent = 'O';
          playerSign.splice(i, 1, 'o');
          divPlayer2.classList.toggle('playerTurn');
          divPlayer1.classList.toggle('playerTurn');
        }
        if (signTotal() === false) {
          squareDiv.textContent = 'X';
          playerSign.splice(i, 1, 'x');
        }
        endGame();
      });
    }
  };

  const fakeBoard = () => {
    gameBoard.classList.toggle('fakeGameBoard');
    gameBoard.textContent = 'Click Start to Play';
  };

  const start = () => {
    btnStart.addEventListener('click', () => {
      gameBoard.classList.toggle('fakeGameBoard');
      gameBoard.textContent = '';
      const namePlayer1 = document.getElementById('namePlayer1').value;
      const namePlayer2 = document.getElementById('namePlayer2').value;
      const scorePlayerName1 = document.getElementById('scorePlayerName1');
      const scorePlayerName2 = document.getElementById('scorePlayerName2');
      assignSign();
      scorePlayerName1.textContent = namePlayer1;
      scorePlayerName2.textContent = namePlayer2;
      if (namePlayer1 === '') {
        scorePlayerName1.textContent = 'Player 1';
      }
      if (namePlayer2 === '') {
        scorePlayerName2.textContent = 'Player 2';
      }
    }, { once: true });
  };

  return {
    endGame, signTotal, assignSign, restart, winEnd, start, fakeBoard,
  };
})();

// functionModule.assignSign();
functionModule.fakeBoard();
functionModule.start();
functionModule.restart();
