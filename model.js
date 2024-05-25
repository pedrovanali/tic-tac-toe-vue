export const initialState = (scores = { 0: 0, 1: 0 }) => ({
  scores,
  currentPlayer: Math.round(Math.random()),
  tiles: Array.from({ length: 9 }, (_, index) => ({ index, marker: "" })),
});
