import Object2d from "../../../object2d/index.js"
import * as GUI from "../../../../libs/babylon_gui.js"
export default {
  name: 'Rectangle2d',
  mixins: [Object2d],
  Start() {
    if (this.isEmptyCurObj()) {
      var panel = new GUI.Rectangle()
      panel.width = 0.2
      panel.height = "40px"
      this.curObj = panel
    }
  }
}