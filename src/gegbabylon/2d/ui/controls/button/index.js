import Object2d from "../../../object2d/index.js"
import * as GUI from "../../../../libs/babylon_gui.js"
export default {
    name: 'Button2d',
    mixins: [Object2d],
    props: {
        src: {
            type: String,
            default() {
                return null
            }
        },
        text: {
            type: String,
            default() {
                return 'Button'
            }
        },
        // image is in background
        isImgBack: {
            default() {
                return true
            }
        }
    },
    data() {
        return {
            default: {
                width: "160px",
                height: "40px",
                cornerRadius: 6,
                color: "black",
                thickness: 1,
                background: "white"
            }
        }
    },
    Start() {
        if (this.isEmptyCurObj()) {
          if (this.src && this.text) {
              if (!this.isImgBack) {
                  this.curObj = GUI.Button.CreateImageButton(this.name, this.text, this.src)
              } else {
                  this.curObj = GUI.Button.CreateImageWithCenterTextButton(this.name, this.text, this.src)
              }
          } else if (this.src && !this.text) {
              this.curObj = GUI.Button.CreateImageOnlyButton(this.name, this.src)
          } else if (!this.src && this.text) {
              this.curObj = GUI.Button.CreateSimpleButton(this.name, this.text)
          }
          this.curObj.textBlock && (this.curObj.textBlock.top = 5)
        }
    }
}