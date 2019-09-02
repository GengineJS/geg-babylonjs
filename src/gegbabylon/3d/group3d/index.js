import Object3D from '../object3d/index.js'
import { MeshBuilder } from '../../libs/babylon.js'
export default {
    name: 'Group3d',
    mixins: [Object3D],
    Start (scene) {
        if(this.isEmptyCurObj()) {
          this.curObj = MeshBuilder.CreateBox(this.default.name, {}, scene)
          this.config.isVisible = false
        }
    }
}
