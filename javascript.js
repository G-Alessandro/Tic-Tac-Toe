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

const functionModule = (() => {
  const signTotal = () => {
    let totalX = 1;
    let totalO = 0;
    for (let e = 0; e < playerSign.length; e++) {
      const signFound = playerSign[e];
      if (signFound === 'X') {
        totalX++;
      }
      if (signFound === 'O') {
        totalO++;
      }
    }
    return totalX > totalO;
  };
  return { signTotal };
})();

function assignSign() {
  const gameBoard = document.getElementById('gameBoard');
  for (let i = 0; i < 9; i++) {
    const squareDiv = document.createElement('div');
    squareDiv.classList.add(`square${i}`);
    gameBoard.appendChild(squareDiv);
    squareDiv.addEventListener('click', () => {
      if (playerSign[0] === '') {
        squareDiv.textContent = 'X';
        playerSign.splice(i, 1, 'X');
      }
      if (functionModule.signTotal() === true) {
        squareDiv.textContent = 'O';
        playerSign.splice(i, 1, 'O');
      }
      if (functionModule.signTotal() === false) {
        squareDiv.textContent = 'X';
        playerSign.splice(i, 1, 'X');
      }
      console.log(i);
      console.log(playerSign);
    });
  }
}
assignSign();
