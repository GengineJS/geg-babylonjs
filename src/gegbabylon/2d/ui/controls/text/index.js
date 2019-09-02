import Object2d from "../../../object2d/index.js"
import * as GUI from "../../../../libs/babylon_gui.js"
export default {
    name: 'Text2d',
    mixins: [Object2d],
    props: {
        text: {
            type: String,
            default() {
                return 'New Text'
            }
        }
    },
    data() {
        return {
          default: {
              color: 'white'
          }
        }
    },
    Start() {
        if (this.isEmptyCurObj()) {
          this.curObj = new GUI.TextBlock(this.name, this.text)
        }
    }
}