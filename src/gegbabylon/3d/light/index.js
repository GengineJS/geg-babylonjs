import Object3D from '../object3d/index.js'
import * as Babylon from '../../libs/babylon.js'
let { Vector3, DirectionalLight, HemisphericLight, PointLight, SpotLight } = Babylon
export default {
    name: 'Light',
    mixins: [Object3D],
    props: {
        // DirectionalLight,PointLight,HemisphericLight,SpotLight
        type: { type: String, default() { return 'DirectionalLight' }}
    },
    data() {
        return {
            default: {
                direction: new Vector3(0, -1, 1),
                position: new Vector3(0, 0, 0),
                angle: Math.PI / 2,
                exponent: 1.5
            }
        }
    },
    Args() {
        let argsOut = []
        switch(this.type) {
            case 'DirectionalLight':
                argsOut = [this.default.name, this.default.direction, this.scene]
                break
            case 'HemisphericLight':
                argsOut = [this.default.name, this.default.direction, this.scene]
                break
            case 'PointLight':
                argsOut = [this.default.name, this.default.position, this.scene]
                break
            case 'SpotLight':
                argsOut = [this.default.name, this.default.position, this.default.direction, this.default.exponent, this.scene]
                break
        }
        return argsOut
    }
}
