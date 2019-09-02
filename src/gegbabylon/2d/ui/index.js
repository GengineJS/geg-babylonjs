import Object2d from "../object2d/index.js"
import * as GUI from "../../libs/babylon_gui.js"
export default {
    name: 'Ui',
    mixins: [Object2d],
    props: {
      type: {
        type: String,
        default() {
          return '2d'
        }
      }
    },
    Start(scene) {
        if (this.isEmptyCurObj()) {
          if (this.type === '2d') {
            this.curObj = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI")
          } else if (this.type === '3d') {
            this.curObj = new GUI.GUI3DManager(scene)
          }
        }
    }
}