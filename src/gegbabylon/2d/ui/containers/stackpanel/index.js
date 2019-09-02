import Object2d from "../../../object2d/index.js"
import * as GUI from "../../../../libs/babylon_gui.js"
export default {
  name: 'Stackpanel2d',
  mixins: [Object2d],
  Start() {
    if (this.isEmptyCurObj()) {
      var panel = new GUI.StackPanel()
      this.curObj = panel
    }
  }
}