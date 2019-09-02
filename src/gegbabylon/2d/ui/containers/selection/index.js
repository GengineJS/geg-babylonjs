import Object2d from "../../../object2d/index.js"
import * as GUI from "../../../../libs/babylon_gui.js"
export default {
  name: 'Selectionpanel2d',
  mixins: [Object2d],
  Start() {
    if (this.isEmptyCurObj()) {
      let curObj = new GUI.SelectionPanel(this.name)
      curObj.width = 0.5
      curObj.height = 0.48
      curObj.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
      curObj.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
      this.curObj = curObj
    }
  }
}