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

const playerSign = ['', '', '', '', '', '', '', '', ''];
let scorePlayer1 = 0;
let scorePlayer2 = 0;

// 0-2    3-5    6-8   0-3-6   1-4-7   2-5-8   0-4-8   2-4-6
const functionModule = (() => {
  const endGame = () => {
    for (let i = 0; i < 6; i + 3) {
      if (playerSign.slice(i, (i + 3)).join('') === 'xxx') {
        scorePlayer1++;
      }
      if (playerSign.slice(i, (i + 3)).join('') === 'ooo') {
        scorePlayer2++;
      }
    }
    for (let i = 0; i < 2; i++) {
      const first = playerSign[i];
      const second = playerSign[i + 3];
      const third = playerSign[i + 6];
      const indexConcat = first + second + third;
      if (indexConcat === 'xxx') {
        scorePlayer1++;
      }
      if (indexConcat === 'ooo') {
        scorePlayer2++;
      }
    }
    for (let i = 0; i < 2; i + 2) {
      const first = playerSign[i];
      const second = playerSign[4];
      const third = playerSign[8 - i];
      const indexConcat = first + second + third;
      if (indexConcat === 'xxx') {
        scorePlayer1++;
      }
      if (indexConcat === 'ooo') {
        scorePlayer2++;
      }
    }
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
    const gameBoard = document.getElementById('gameBoard');
    for (let i = 0; i < 9; i++) {
      const squareDiv = document.createElement('div');
      squareDiv.classList.add(`square${i}`);
      gameBoard.appendChild(squareDiv);
      squareDiv.addEventListener('click', () => {
        if (playerSign[0] === '') {
          squareDiv.textContent = 'X';
          playerSign.splice(i, 1, 'x');
        }
        if (functionModule.signTotal() === true) {
          squareDiv.textContent = 'O';
          playerSign.splice(i, 1, 'o');
        }
        if (functionModule.signTotal() === false) {
          squareDiv.textContent = 'X';
          playerSign.splice(i, 1, 'x');
        }
      });
    }
  };
  return { signTotal, assignSign };
})();

functionModule.assignSign();
