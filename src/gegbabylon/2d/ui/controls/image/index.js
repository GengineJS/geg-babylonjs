import Object2d from "../../../object2d/index.js"
import * as GUI from "../../../../libs/babylon_gui.js"
export default {
  name: 'Image2d',
  mixins: [Object2d],
  props: {
    src: {
      type: String,
      default() {
        return ''
      }
    }
  },
  Start() {
    if (this.isEmptyCurObj()) {
      let image = new GUI.Image(this.name, this.src)
      image.width = "200px"
      image.height = "300px"
      image.populateNinePatchSlicesFromImage = true
      image.stretch = GUI.Image.STRETCH_NINE_PATCH
      this.curObj = image
    }
  }
}