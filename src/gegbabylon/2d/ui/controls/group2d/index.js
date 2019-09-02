import Object2d from "../../../object2d/index.js"
import * as GUI from "../../../../libs/babylon_gui.js"
export default {
  name: 'Group2d',
  mixins: [Object2d],
  props: {
    type: {
      type: String,
      default() {
        return 'Selector'
      }
    },
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },
  OnAdd() {
    this.parentObj.addGroup && this.parentObj.addGroup(this.curObj)
  },
  Start() {
    if (this.isEmptyCurObj()) {
      let curObj = new GUI[`${this.type}Group`](this.name)
      console.log(this.options)
      this.options.forEach(eles => {
        console.log(this.type)
        if (this.type !== 'Selector') {
          console.log(curObj[`add${this.type}`])
          curObj[`add${this.type}`](...eles)
        }
      })
      this.curObj = curObj
    }
  }
}