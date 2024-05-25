import { gameStatus } from "./enums.js";
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const markedTiles = (tiles) => {
  let sum = 0;
  for (let i = 0; i <= 8; i++) {
    sum += tiles[i].marker !== "" ? 1 : 0;
  }
  return sum;
};

export const didCheckAllTiles = (totalTouched) => totalTouched == 9;

export const checkIfRoundOver = (tiles) => {
  let roundWon = 0;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = tiles[winCondition[0]].marker;
    let b = tiles[winCondition[1]].marker;
    let c = tiles[winCondition[2]].marker;

    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  return roundWon;
};

export const checkWinner = (totalTouched, isGameDone) => {
  const isCheckedAllTiles = didCheckAllTiles(totalTouched);

  if (isGameDone && isCheckedAllTiles) {
    return gameStatus[2];
  } else if (isGameDone && !isCheckedAllTiles) {
    return gameStatus[1];
  }
  return gameStatus[0];
};

export const checkStatusToAddPoints = (currentGameStatus, playerScoreTo) => {
  if (currentGameStatus === gameStatus[1]) {
    playerScoreTo++;
  }
  return playerScoreTo;
};

export const getMessage = (isGameDone, isThereAWinner, playerName) => {
  const messages = {
    0: (p) => `It's ${p.toLowerCase()} turn.`,
    1: (p) => `${p} wins.`,
    2: () => `It's a draw.`,
  };
  if (isGameDone && !isThereAWinner) {
    return messages[2]();
  }
  if (isGameDone && isThereAWinner) {
    return messages[1](playerName);
  }
  return messages[0](playerName);
};
