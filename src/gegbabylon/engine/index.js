import * as Babylon from '../libs/babylon.js'
export default {
  name: 'Engine',
  provide() {
    return {
      global: this.global,
      _baseUrl: null,
      parentNode: this,
      onSceneReady: this.onSceneReady,
      onEngineReady: this.onEngineReady,
      onUpdates: this.onUpdates
    }
  },
  beforeCreate() {
    this.onSceneReady = new Promise(resolve => {
      this.resolveScene = resolve
    })
    this.onEngineReady = new Promise(resolve => {
      this.resolveEngine = resolve
    })
    this.onUpdates = []
  },
  methods: {
    init() {
      this.engine = new Babylon.Engine(canvas || this.$refs.engine, true)
      this.engine.nodeCom = this
      this.$emit('Awake', this.engine)
      this.global.engine = this.engine
      this.global.canvas = canvas || this.$refs.engine
      this.global.rootNode = this
      this.resolveEngine(this.engine)
    }
  },
  data() {
    return { global: {} }
  },
  beforeDestroy() {
    this.engine.stopRenderLoop()
    this.global.scene.dispose()
    this.engine.scenes.forEach(scene => {
      scene.dispose()
    })
    this.engine = null
  },
  mounted() {
    this.init()
  },
  render(createElement) {
    let createOpts = {}
    createOpts['ref'] = 'engine'
    canvas || (createOpts['style'] = { height: '100%', width: '100%' })
    return createElement('canvas', createOpts, this.$slots.default)
  }
}
