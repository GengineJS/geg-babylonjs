import Object2d from "../../../../2d/object2d/index.js"
import * as GUI from "../../../../libs/babylon_gui.js"
export default {
  name: 'Stackpanel3d',
  mixins: [Object2d],
  Start() {
    if (this.isEmptyCurObj()) {
      let panel = new GUI.StackPanel3D()
      console.log('panel')
      this.curObj = panel
    }
  }
}