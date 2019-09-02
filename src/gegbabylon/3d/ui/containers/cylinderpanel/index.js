import Object2d from "../../../../2d/object2d/index.js"
import * as GUI from "../../../../libs/babylon_gui.js"
export default {
  name: 'Cylinderpanel3d',
  mixins: [Object2d],
  Start() {
    if (this.isEmptyCurObj()) {
      var panel = new GUI.CylinderPanel()
      panel.radius = 5
      this.curObj = panel
    }
  }
}