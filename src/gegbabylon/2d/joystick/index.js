import Object3D from '../../3d/object3d/index.js'
import * as BABYLON from '../../libs/babylon.js'
export default {
  name: 'Joystick',
  mixins: [Object3D],
  Start(scene) {
    if (this.isEmptyCurObj()) {
      this.curObj = new BABYLON.VirtualJoystick(true)
      BABYLON.VirtualJoystick.Canvas = canvas
    }
  }
}
