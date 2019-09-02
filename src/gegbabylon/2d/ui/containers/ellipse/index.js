import Object2d from "../../../object2d/index.js"
import * as GUI from "../../../../libs/babylon_gui.js"
export default {
  name: 'Ellipse2d',
  mixins: [Object2d],
  Start() {
    if (this.isEmptyCurObj()) {
      var panel = new GUI.Ellipse()
      panel.width = "100px"
      panel.height = "100px";
      this.curObj = panel
    }
  }
}