import * as BABYLON from '../../libs/babylon.js'
import DisplayObject from '../../display/index.js'
export default {
    name: "Texture",
    mixins: [DisplayObject],
    props: {
        // CubeTexture, Texture, PhotoDome, VideoTexture and so on
        type: {
            type: String,
            default() {
                return 'Texture'
            }
        },
        propertyOf: {
            type: String,
            default() {
                return 'ambientTexture'
            }
        },
        src: {
            type: String,
            default() {
              return ''
            }
        },
        options: {
          type: Object,
          default() {
            return {
              resolution: 32,
              size: 1000
            }
          }
        }
    },
    watch: {
        src() {
            this.CreateObject()
        }
    },
    OnAdd() {
        if (this.parentObj) {
            this.parentObj[this.propertyOf] = this.curObj
        }
    },
    OnRemove(){
        if (this.parentObj) {
            this.parentObj[this.propertyOf] = null
        }
    },
    Args() {
      switch (this.type) {
        case 'VideoDome':
        case 'PhotoDome':
          return [this.name, this.src, this.options, this.scene]
        break
        case 'VideoTexture':
          return [this.name, this.src, this.scene]
        break
      }
      return [this.src, this.scene]
    }
}
