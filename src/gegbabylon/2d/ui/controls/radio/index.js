import Object2d from "../../../object2d/index.js"
import * as GUI from "../../../../libs/babylon_gui.js"
export default {
  name: 'Radio2d',
  mixins: [Object2d],
  props: {
    text: {
      type: String,
      default() {
        return 'radio'
      }
    }
  },
  Start() {
    if (this.isEmptyCurObj()) {
      let curObj = GUI.RadioButton.AddRadioButtonWithHeader(this.text, '', false, ()=>{})
      let childs = curObj.children
      childs[0].color = "white"
      childs[0].background = "gray"
      childs[1].top = 5
      this.curObj = curObj
    }
  }
}