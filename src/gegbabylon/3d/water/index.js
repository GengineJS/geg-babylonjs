import Material from '../material/index.js'
import * as MATERIAL from '../../libs/babylonjs.materials.min.js'
import * as BABYLON from '../../libs/babylon.js'
export default {
  name: 'Water',
  mixins: [Material],
  props: {
    // StandardMaterial, PBRMaterial
    type: {
      type: String,
      default() {
        return 'WaterMaterial'
      }
    },
    src: {
      type: String,
      default() {
        return 'src/asset/bump.png'
      }
    }
  },
  Start(scene) {
    if (this.isEmptyCurObj()) {
      let curObj = new MATERIAL.WaterMaterial('WaterMaterial', scene)
      curObj.bumpTexture = new BABYLON.Texture(this.src, scene)
      this.curObj = curObj
    }
  }
}
