import DisplayObject from '../../display/index.js'
export default {
  name: 'Object3d',
  mixins: [DisplayObject],
  props: {
    type: { type: String, default: 'Node' }
  },
  provide () {
    return { uiVm: null }
  },
  data () {
    let defaultVal = {
      isVisible: true,
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scaling: { x: 1 , y: 1 , z: 1 }
    }
    let curObj = this.obj
    let propertys = {
      default:defaultVal
    }
    curObj && (propertys['curObj'] = curObj)
    return propertys
  },
  OnAdd() {
    if (this.parentObj && !this.parentObj._isScene) {
      this.curObj.parent = this.parentObj
    }
  },
  OnRemove() {
    if (this.parentObj) {
      this.curObj.parent = null
    }
  }
}
