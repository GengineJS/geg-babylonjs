import Object2d from "../../../object2d/index.js"
import * as GUI from "../../../../libs/babylon_gui.js"
export default {
  name: 'Slider2d',
  mixins: [Object2d],
  Start() {
    if (this.isEmptyCurObj()) {
      
      let curObj = new GUI.Slider()
      curObj.minimum = 0
      curObj.maximum = 100
      curObj.value = 0
      curObj.height = "20px"
      curObj.width = "200px"
      curObj.background = "gray"
      curObj.isThumbCircle = false
      this.curObj = curObj
    }
  }
}