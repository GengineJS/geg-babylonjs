import {
  EasingFunction,
  Animation,
  CircleEase as circle,
  BackEase as back,
  BounceEase as bounce,
  CubicEase as cubic,
  ElasticEase as elastic,
  ExponentialEase as exponential,
  PowerEase as power,
  QuadraticEase as quadratic,
  QuarticEase as quartic,
  QuinticEase as quintic,
  SineEase as sine,
  BezierCurveEase as bezierCurve,
} from '../../libs/babylon.js'
import DisplayObject from '../../display/index.js'
import { isFloat } from '../../core/utils/index.js'
const EASINGS = {
  circle,
  back,
  bounce,
  cubic,
  elastic,
  exponential,
  power,
  quadratic,
  quartic,
  quintic,
  sine,
  bezierCurve,
}
const TYPES = {
  FLOAT: 'float',
  VECTOR2: 'vector2',
  VECTOR3: 'vector3',
  SIZE: 'size',
  QUATERNION: 'quaternion',
  MATRIX: 'matrix',
  COLOR3: 'color3',
}
const MODES = {
  CYCLE: 'cycle',
  RELATIVE: 'relative',
  CONSTANT: 'constant',
}
const EASING_MODES = {
  IN: 'in',
  OUT: 'out',
  INOUT: 'inout',
}

export default {
    name: 'Animation',
    mixins: [DisplayObject],
    data() {
        return {
            keys: {},
        }
    },
    props: {
        aniType: {
            validator: value => Object.values(TYPES).includes(value),
            default: Object.values(TYPES)[0],
        },
        type: {
            default() {
                return 'Animation'
            }
        },
        mode: {
            validator: value => Object.values(MODES).includes(value),
            default: Object.values(MODES)[0],
        },

        property: {
            type: String,
        },

        fps: {
            type: Number,
            default: 60,
        },

        from: {
            type: Number,
            default: 0,
        },

        to: {
            type: Number,
            default: 60,
        },

        duration: {
            type: Number,
            default: null,
        },

        start: {
            default: 0,
        },

        end: {
            default: 1,
        },

        loop: {
            type: Boolean,
            default: true,
        },

        speedRatio: {
            type: Number,
            default: 1,
        },

        animatable: {
            type: Object,
            default: null,
        },

        blending: {
            type: Boolean,
            default: false,
        },

        blendingSpeed: {
            type: Number,
            default: null,
        },

        easing: {
            validator: value => Object.values(EASINGS).includes(value),
            default: null,
        },

        easingMode: {
            validator: value => Object.values(EASING_MODES).includes(value),
            default: Object.values(EASING_MODES)[0],
        },

        amplitude: {
            type: Number,
            default: 1,
        },

        bounces: {
            type: Number,
            default: 3,
        },

        bounciness: {
            type: Number,
            default: 2,
        },

        oscillations: {
            type: Number,
            default: 3,
        },

        springiness: {
            type: Number,
            default: 3,
        },

        exponent: {
            type: Number,
            default: 2,
        },

        power: {
            type: Number,
            default: 2,
        },

        x1: {
            type: Number,
            default: 0.32,
        },

        y1: {
            type: Number,
            default: -0.73,
        },

        x2: {
            type: Number,
            default: 0.69,
        },

        y2: {
            type: Number,
            default: 1.59,
        },
    },

    computed: {
        easingFunction() {
            if (!this.easing) {
                return null
            }
            let easing = EASINGS[this.easing]
            let easingFunction
            switch (this.easing) {
                case 'back':
                    easingFunction = easing(this.amplitude)
                break
                case 'bounce':
                    easingFunction = easing(this.bounces, this.bounciness)
                break
                case 'elastic':
                    easingFunction = easing(this.oscillations, this.springiness)
                break
                case 'exponential':
                    easingFunction = easing(this.exponent)
                break
                case 'power':
                    easingFunction = easing(this.power)
                break
                case 'bezierCurve':
                    easingFunction = easing(this.x1, this.y1, this.x2, this.y2)
                break
                default:
                easingFunction = easing()
            }
            easingFunction.setEasingMode(EasingFunction[`EASINGMODE_EASE${
                this.easingMode.toUpperCase()
            }`])
            return easingFunction
        },

        finish() {
            return this.duration ? this.duration * this.fps : this.to
        },

        frames() {
            let keys = Object.values(this.keys)
            if (keys.length < 1) {
                return [{
                frame: this.from,
                value: this.start,
                }, {
                frame: this.finish,
                value: this.end,
                }]
            }
            return keys.map(key => {
                let frame = Number.parseFloat(key.frame)
                if (!isFloat(key.frame)) {
                frame = Math.floor((frame / 100) * this.finish)
                }
                let out = {
                frame,
                value: key.value,
                }
                if (key.outTangent) {
                out.outTangent = key.outTangent
                }
                if (key.inTangent) {
                out.inTangent = key.inTangent
                }
                return out
            })
        },

        animationType() {
            return Animation[`ANIMATIONTYPE_${this.aniType.toUpperCase()}`]
        },

        animationLoopMode() {
            return Animation[`ANIMATIONLOOPMODE_${this.mode.toUpperCase()}`]
        },
    },

    methods: {
        disposeKey(name) {
            this.removeKey(name)
        },
        enableBlending(speed) {
            this.curObj.enableBlending(speed)
        },

        disableBlending() {
            this.curObj.disableBlending()
        },

        setEasingFunction() {
            this.curObj.setEasingFunction(this.easingFunction)
        },

        setFrames() {
            if (this.curObj) {
                this.curObj.setKeys(this.frames)
            }
        },
        setKey({ name, key }) {
            this.$set(this.keys, name, key)
        },

        removeKey(name) {
            this.$delete(this.keys, name)
        },

        reset() {
            this.curObj.stop()
        },

        enableBlending(speed) {
            this.enableBlending(speed)
        },

        disableBlending() {
            this.disableBlending()
        },

        goToFrame(frame) {
            this.curObj.goToFrame(frame)
        },

        pause() {
            this.curObj.pause()
        },

        restart() {
            this.curObj.restart()
        },

        stop() {
            this.curObj.stop()
        }
    },
    watch: {
        fps() {
            this.curObj.framePerSecond = this.fps
        },

        property() {
            this.curObj.targetProperty = this.property
        },

        animationType() {
            this.dataType = this.animationType
        },

        animationLoopMode() {
            this.loopMode = this.animationLoopMode
        },

        frames() {
            this.setFrames()
        },

        easingFunction() {
            this.setEasingFunction()
        },

        speedRatio() {
            this.curObj.speedRatio = this.speedRatio
        },

        loop() {
            this.curObj.loopAnimation = this.loop
        },

        blending() {
            if (this.blending) {
                this.enableBlending(this.blendingSpeed)
            } else {
                this.disableBlending()
            }
        },
    },
    Args() {
        return [this.type, this.property, this.fps, this.animationType, this.animationLoopMode]
    },
    OnAdd() {
        this.setEasingFunction()
        this.setFrames()
        this.parentObj.animations.push(this.curObj)
        this.scene.beginAnimation(this.parentObj, this.from, this.finish, this.loop, this.speedRatio, () => {
            this.$event.$emit('end')
        }, this.animatable)
    }
}
