import Object2d from "../../../../2d/object2d/index.js"
import * as GUI from "../../../../libs/babylon_gui.js"
export default {
  name: 'Button3d',
  mixins: [Object2d],
  props: {
    type: {
      type: String,
      default() {
        // Button3D HolographicButton MeshButton3D
        return "Button3D"
      }
    },
    text: {
      type: String,
      default() {
        return 'Button'
      }
    }
  },
  Start() {
    if (this.isEmptyCurObj()) {
      let textBlock = new GUI.TextBlock()
      textBlock.text = this.text
      textBlock.color = "white"
      textBlock.fontSize = 50
      if (this.type === 'MeshButton3D') {
        this.isAddParent = false
        this.parentNode.onParentReady && this.parentNode.onParentReady.then(() => {
          let curObj = new GUI[this.type](this.parentObj, this.name)
          curObj.content = textBlock
          this.curObj = curObj
        })
        return
      }
      let curObj = new GUI[this.type](this.name)
      curObj.content = textBlock
      this.curObj = curObj
    }
  }
}