import Object2d from "../../../object2d/index.js"
import * as GUI from "../../../../libs/babylon_gui.js"
export default {
  name: 'Input2d',
  mixins: [Object2d],
  props: {
    text: {
      type: String,
      default() {
        return 'input text'
      }
    },
    type: {
      type: String,
      default() {
        // InputText | InputPassword
        return 'InputText'
      }
    }
  },
  Start() {
    if (this.isEmptyCurObj()) {
      let curObj = new GUI[this.type](this.name, this.text)
      curObj.width = 0.5
      curObj.maxWidth = 0.5
      curObj.height = "100px"
      curObj.color = "white"
      this.curObj = curObj
    }
  }
}