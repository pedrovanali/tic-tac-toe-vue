import Score from "./score.js";
import Board from "./board.js";
import Message from "./message.js";
import PlayAgain from "./playAgain.js";
import { initialState } from "./model.js";
import { playerNames, gameStatus } from "./enums.js";
import {
  checkIfRoundOver,
  didCheckAllTiles,
  markedTiles,
  getMessage,
  checkStatusToAddPoints,
} from "./game.service.js";

export default {
  data() {
    return initialState();
  },
  template: `
    <div class="game">
      <Score :player1="scores[0]" :player2="scores[1]" />
      <Board @make-move="makeMove" :marker="playerMarker" :tiles="tiles" />
      <Message :text="currentMessage" />
      <PlayAgain v-if="isGameDone" @click="resetWindow"/>
    </div>
  `,
  computed: {
    isPlayer1() {
      return this.currentPlayer === 0;
    },
    playerMarker() {
      return this.isPlayer1 ? "x" : "o";
    },
    currentPlayerName() {
      return playerNames[this.currentPlayer];
    },
    isGameDone() {
      const totalTouched = markedTiles(this.tiles);
      return checkIfRoundOver(this.tiles) || didCheckAllTiles(totalTouched);
    },
    currentGameStatus() {
      const totalTouched = markedTiles(this.tiles);
      const isRoundOver = checkIfRoundOver(this.tiles);
      const isAllTilesFilled = didCheckAllTiles(totalTouched);
      if (
        (isAllTilesFilled && isRoundOver) ||
        (!isAllTilesFilled && isRoundOver)
      ) {
        return gameStatus[1];
      }
      if (isAllTilesFilled && !isRoundOver) {
        return gameStatus[2];
      }
      return gameStatus[0];
    },
    currentMessage() {
      return getMessage(
        this.isGameDone,
        this.currentGameStatus === gameStatus[1],
        this.currentPlayerName
      );
    },
  },
  methods: {
    makeMove(index) {
      let currentTile = this.tiles[index];
      let shouldChangeMarker = currentTile.marker === "";

      if (!this.isGameDone && shouldChangeMarker) {
        this.tiles[index] = {
          ...currentTile,
          marker: this.playerMarker,
        };
        if (!this.isGameDone) {
          this.currentPlayer = this.isPlayer1 ? 1 : 0;
        }
      }
      if (this.isGameDone) {
        this.scores[this.currentPlayer] = checkStatusToAddPoints(
          this.currentGameStatus,
          this.scores[this.currentPlayer]
        );
      }
    },
    resetWindow() {
      const { scores } = this.$data;
      Object.assign(this.$data, initialState(scores));
    },
  },
  components: {
    Score,
    Board,
    Message,
    PlayAgain,
  },
};
