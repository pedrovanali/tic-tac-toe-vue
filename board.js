import Tile from "./tile.js";

export default {
  props: ["marker", "makeMove", "tiles"],
  template: `
    <div class="board">
      <Tile v-for="tile in tiles" :marker="tile.marker" :index="tile.index" @click="setMarker(tile.index, $event)" />
    </div>
  `,
  components: {
    Tile,
  },
  methods: {
    setMarker(index) {
      this.$emit("makeMove", index);
    },
  },
};
