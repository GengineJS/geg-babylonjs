import DisplayObject from "../../display/index.js";
export default {
    name: "Material",
    mixins: [DisplayObject],
    props: {
        // StandardMaterial, PBRMaterial
        type: {
            type: String,
            default() {
                return 'StandardMaterial'
            }
        }
    },
    OnAdd() {
        if (this.parentObj) {
          this.parentObj.material = this.curObj
        }
    },
    OnRemove() {
        if (this.parentObj) {
            this.parentObj.material = null
        }
    },
    Args() {
        return [this.default.name, this.scene]
    }
}
