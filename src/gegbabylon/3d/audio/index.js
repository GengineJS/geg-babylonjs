import DisplayObject from "../../display/index.js"
export default {
    name: 'Sound',
    mixins: [DisplayObject],
    props: {
        type: {
            type: String,
            default() {
                return 'Sound'
            }
        },
        src: {
            type: String,
            default() {
                return null
            }
        }
    },
    Args() {
        return [this.name, this.src, this.scene, () => {
            this.$emit('onAudioReady', this.curObj)
        }, {autoplay: true}]
    }
}