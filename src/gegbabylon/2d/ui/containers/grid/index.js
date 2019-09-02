import Object2d from "../../../object2d/index.js"
import * as GUI from "../../../../libs/babylon_gui.js"
export default {
  name: 'Grid2d',
  mixins: [Object2d],
  Start() {
    if (this.isEmptyCurObj()) {
      let grid = new GUI.Grid()
      this.curObj = grid
    }
  }
}