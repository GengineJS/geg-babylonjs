import Object2d from "../../../object2d/index.js"
import * as GUI from "../../../../libs/babylon_gui.js"
export default {
  name: 'Colorpicker',
  mixins: [Object2d],
  Start() {
    if (this.isEmptyCurObj()) {
      var picker = new GUI.ColorPicker()
      picker.height = "150px"
      picker.width = "150px"
      picker.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
      this.curObj = picker
    }
  }
}