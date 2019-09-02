import * as Babylon from '../libs/babylon.js'
import DisplayObject from '../display/index.js'
import { vecValidator as validator, toVec3 } from '../core/types/vector.js'
import { color3, toColor3 } from '../core/types/color.js'
let { Scene, Color3, Vector3 } = Babylon
const FOG_TYPES = {
  NONE: 'none',
  EXP: 'exp',
  EXP2: 'exp2',
  LINEAR: 'linear',
}
export default {
  name: 'Scene',
  mixins: [DisplayObject],
  props: {
    model: {
      type: Object,
      default: null,
    },
    ambient: {
      validator: color3.validator,
      default: () => Color3.Black(),
    },
    fog: {
      validator: value => Object.values(FOG_TYPES).includes(value),
      default: Object.values(FOG_TYPES)[0],
    },
    fogStart: {
      type: Number,
      default: 20,
    },
    fogEnd: {
      type: Number,
      default: 60,
    },
    fogDensity: {
      type: Number,
      default: 0.1,
    },
    fogColor: {
      validator: color3.validator,
      default: () => new Color3(0.2, 0.2, 0.3),
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    debug: {
      type: Boolean,
      default: false,
    },
    environment: {
      type: Object,
      default: undefined,
    },
    main: {
      validator: color3.validator,
      default: null,
    },
    gravity: {
      validator,
      default: () => new Vector3(0, -9.81, 0),
    },
  },
  watch: {
    ambientColor() {
      this.setAmbientColor();
    },

    fog() {
      this.setFogMode();
    },

    fogDensity() {
      this.setFogDensity();
    },

    fogStart() {
      this.setFogStart();
    },

    fogEnd() {
      this.setFogEnd();
    },

    fogColor3() {
      this.setFogColor();
    },

    fullscreen() {
      this.requestFullScreen()
    },

    debug() {
      this.debugLayer();
    },

    gravityVector3() {
      this.setGravity();
    },
  },
  computed: {
    ambientColor() {
      return toColor3(this.ambient);
    },

    fogMode() {
      return Scene[`FOGMODE_${this.fog.toUpperCase()}`];
    },

    fogColor3() {
      return toColor3(this.fogColor);
    },

    mainColor() {
      if (!this.main) {
        return null;
      }
      return toColor3(this.main);
    },

    gravityVecor3() {
      return toVec3(this.gravity);
    },
  },
  Awake (engine) {
    let curObj = this.obj
    if (!curObj) {
      curObj = new Scene(engine)
    }
    curObj.name = curObj.name || curObj.type
    this.scene = this.curObj = curObj
    this.scene.nodeCom = this
    this.$emit('Start', curObj)
    this.setAmbientColor()
    this.setFogMode()
    this.requestFullScreen()
    this.debugLayer()
    this.scene.executeWhenReady(this.resize)
    this.global.scene = this.scene
    this.parentNode.resolveScene(this.scene)
  },
  Start(scene) {
    this.engine.runRenderLoop(() => {
      this.parentNode.onUpdates.forEach((updateFunc) => {
        updateFunc(this.engine._deltaTime / 1000)
      })
      scene.render()
    })
  },
  Update(delta) {
  },
  methods: {
    requestFullScreen() {
      if (this.fullscreen) {
        this.global.rootNode.$refs.engine.requestFullScreen();
      }
    },
    setAmbientColor() {
      this.scene.ambientColor = this.ambientColor;
    },
    setFogStart() {
      this.scene.fogStart = this.fogStart;
    },
    setFogEnd() {
      this.scene.fogStart = this.fogEnd;
    },
    setFogDensity() {
      this.scene.fogDensity = this.fogDensity;
    },
    setFogColor() {
      this.scene.fogColor = this.fogColor3;
    },
    setFogMode() {
      this.scene.fogMode = this.fogMode;
      switch (this.fog) {
        case 'none':
          break;
        case 'linear':
          this.setFogStart();
          this.setFogEnd();
          break;
        default:
          this.setFogDensity();
      }
      this.setFogColor();
    },
    debugLayer() {
      if (this.debug) {
        this.scene.debugLayer.show();
      } else {
        this.scene.debugLayer.hide();
      }
    },
    resize() {
      this.global.engine.resize();
    },
    defaultEnvironment() {
      if (this.scene.cameras.length < 1) {
        this.scene.createDefaultCameraOrLight(true, true, true);
        let helper = this.scene.createDefaultEnvironment(this.environment);
        if (this.mainColor) {
          helper.setMainColor(this.mainColor);
        }
      }
    }
  }
}
