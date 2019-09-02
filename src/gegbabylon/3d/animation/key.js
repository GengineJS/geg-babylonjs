import Base from '../../base/index.js'
import { isFloat, isPercent } from '../../core/utils/index.js'
import { vec3 } from '../../core/types/vector.js'
const { validator } = vec3
export default {
    name: 'Key',
    mixins: [Base],
    props: {
        frame: {
            validator: value => isFloat(value) || isPercent(value),
            default: 0
        },
        value: {
            default: 0
        },
        inTangent: {
            validator,
            default: null
        },
        outTangent: {
            validator,
            default: null
        }
    },
    computed: {
        key() {
            return {
                frame: this.frame,
                value: this.value,
                inTangent: this.inTangent,
                outTangent: this.outTangent,
            }
        },
    },
    methods: {
        setKey() {
            this.parentNode.setKey({
                name: this.id,
                key: this.key,
            })
        },
        dispose() {
            this.parentNode.disposeKey(this.id)
        }
    },
    watch: {
        key() {
            this.setKey()
        },
    },
    beforeDestroy() {
        this.dispose()
    },
    Start() {
        this.parentNode.onParentReady.then(() => {
          this.setKey()
        })
        
    },
}
