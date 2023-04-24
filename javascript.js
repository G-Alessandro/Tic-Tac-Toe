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

  const tieEnd = () => {
    let x = 0;
    for (let i = 0; i < 9; i += 1) {
      if (playerSign[i] !== '') {
        x += 1;
      }
    }
    return x;
  };

  const winScore1 = () => {
    divPlayer1.classList.add('winColor');
    score1.textContent = 'WIN';
  };

  const winScore2 = () => {
    divPlayer2.classList.add('winColor');
    divPlayer2.classList.add('winColor2');
    score2.textContent = 'WIN';
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
      scorePlayer1 += 1;
      playerSign = ['', '', '', '', '', '', '', '', ''];
      setTimeout(winEnd, 300);
      setTimeout(winScore1, 200);
      divPlayer1.classList.add('playerTurn');
      divPlayer2.classList.remove('playerTurn');
      divPlayer1.classList.remove('winColor');
    }

    if (playerSign.slice(0, 3).join('') === 'ooo'
    || playerSign.slice(3, 6).join('') === 'ooo'
    || playerSign.slice(6, 9).join('') === 'ooo'
    || vertResOne === 'ooo'
    || vertResTwo === 'ooo'
    || vertResThree === 'ooo'
    || diagResOne === 'ooo'
    || diagResTwo === 'ooo') {
      scorePlayer2 += 1;
      playerSign = ['', '', '', '', '', '', '', '', ''];
      setTimeout(winEnd, 300);
      setTimeout(winScore2, 200);
    }

    if (tieEnd() === 9) {
      tie += 1;
      playerSign = ['', '', '', '', '', '', '', '', ''];
      setTimeout(winEnd, 200);
      divTie.classList.add('tieEnd');
      divPlayer1.classList.add('playerTurn');
      divPlayer2.classList.remove('playerTurn');
    }

    score1.textContent = scorePlayer1;
    tieScore.textContent = tie;
    score2.textContent = scorePlayer2;
  };

  const signTotal = () => {
    let totalX = 1;
    let totalO = 0;
    for (let i = 0; i < playerSign.length; i += 1) {
      const signFound = playerSign[i];
      if (signFound === 'x') {
        totalX += 1;
      }
      if (signFound === 'o') {
        totalO += 1;
      }
    }
    return totalX > totalO;
  };

  const assignSign = () => {
    for (let i = 0; i < 9; i += 1) {
      const squareDiv = document.createElement('div');
      squareDiv.classList.add('square');
      gameBoard.appendChild(squareDiv);
      divPlayer1.classList.add('playerTurn');
      squareDiv.addEventListener('click', () => {
        divPlayer1.classList.remove('winColor');
        divPlayer2.classList.remove('winColor');
        divPlayer2.classList.remove('winColor2');
        if (divTie.classList.toggle('tieEnd') === true) {
          divTie.classList.toggle('tieEnd');
        }
        if (playerSign[0] === '') {
          squareDiv.textContent = 'X';
          playerSign.splice(i, 1, 'x');
        }
        if (signTotal() === true) {
          squareDiv.textContent = 'O';
          playerSign.splice(i, 1, 'o');
          divPlayer1.classList.add('playerTurn');
          divPlayer2.classList.remove('playerTurn');
        }
        if (signTotal() === false) {
          squareDiv.textContent = 'X';
          playerSign.splice(i, 1, 'x');
          divPlayer1.classList.remove('playerTurn');
          divPlayer2.classList.add('playerTurn');
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
      if (divTie.classList.toggle('tieEnd') === true) {
        divTie.classList.toggle('tieEnd');
      }
    });
  };

  return {
    endGame, signTotal, assignSign, restart, winEnd, start, fakeBoard,
  };
})();

functionModule.fakeBoard();
functionModule.start();
functionModule.restart();
