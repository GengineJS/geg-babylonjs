import Object2d from "../../../object2d/index.js"
import * as GUI from "../../../../libs/babylon_gui.js"
export default {
  name: 'Scrollview2d',
  mixins: [Object2d],
  Start() {
    if (this.isEmptyCurObj()) {
      var sv = new GUI.ScrollViewer()
      sv.width = 0.4
      sv.height = 0.4
      sv.background = "#CCCCCC"
      this.curObj = sv
    }
  }
}