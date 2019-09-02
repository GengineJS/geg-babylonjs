import Object3D from '../object3d/index.js'
import * as BABYLON from '../../libs/babylon.js'
export default {
  name: 'Camera',
  mixins: [Object3D],
  props: {
    type:{
      type:String,
      default() {
        return 'UniversalCamera'
      }
    }
  },
  data() {
    return {
      default:{
          position: new BABYLON.Vector3(0, 0, -5),
          target: new BABYLON.Vector3(0, 0, 0),
          alpha: - Math.PI / 2,
          beta: Math.PI / 2,
          radius: 10
        }
    }
  },
  watch: {
    type() {
      this.createCamera()
    }
  },
  methods: {
    attachControl() {
      this.curObj.attachControl(this.canvas)
    },
    detachControl() {
      this.curObj.detachControl()
    },
    createCamera() {
      if (!this.isEmptyCurObj()) {
        this.detachControl()
        delete this.curObj.onDispose
        this.curObj.dispose()
      }
      this.curObj = new BABYLON[this.type](...this.$options.Args.call(this))
      this.curObj.onDispose = () => {
        this.detachControl()
      }
    }
  },
  Args() {
    let out = [this.default.name]
    if (this.type === 'ArcRotateCamera' || this.type === 'ArcFollowCamera') {
      out = out.concat([this.default.alpha, this.default.beta, this.default.radius, this.default.target])
    } else {
      out = out.concat([this.default.position])
    }
    return out.concat([this.global.scene])
  },
  Start(scene) {
    this.canvas = scene.getEngine().getRenderingCanvas()
    this.createCamera()
    this.attachControl()
  }
}
