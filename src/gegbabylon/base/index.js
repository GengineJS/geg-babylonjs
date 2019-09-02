import { id } from "../core/utils/index.js"
export default {
  name: 'Base',
  inject: {
    _baseUrl: { name: '_baseUrl', default: null },
    global: { name:'global', default: null},
    parentNode: { name:'parentNode', default: null},
    onSceneReady: { name:'onSceneReady', default: null},
    onEngineReady: { name:'onEngineReady', default: null},
    onUpdates: { name:'onUpdates', default: []}
  },
  computed: {
    parentObj() {
      return this.parentNode.curObj
    }
  },
  props: {
    type: {
      type:String,
      default(){
          return 'Base'
      }
    },
    baseUrl: {
      type: String,
      default () { return this._baseUrl }
    },
    components: {
      type: Array,
      default() {
        return []
      }
    },
    name: {
      type: String,
      default() {
        return this.$options.name
      }
    },
  },
  provide () {
    return {
      _baseUrl: this.baseUrl,
      parentNode: this,
      onParentReady: this.onParentReady
    }
  },
  beforeCreate() {
    this.onParentReady = new Promise(resolve => {
      this.resolveParent = resolve
    })
  },
  data () {
    this.onEngineReady.then((engine) => {
      this.engine = engine
      this.$options.Awake && this.$options.Awake.call(this, engine)
    })
    this.onSceneReady.then((scene) => {
      this.scene = scene
      this.$options.Start && this.$options.Start.call(this, scene)
    })
    this.$options.Update && this.onUpdates.push(this.$options.Update.bind(this))
    let engine = {}
    let canvas = {}
    return { engine , canvas, id: id() }
  },
  methods: {
    dispatchEvent (name, detail, options = {}) {
      // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
      let e = new CustomEvent(name, {
        detail,
        bubbles: true,
        cancelable: true,
        ...options
      })
      return this.$el.dispatchEvent(e)
    },
    AddComponent(component) {
      this.components.push(component)
    },
    GetComponentFromName(name) {
      return this.components.filter(comp => {return comp.name === name})
    },
    GetComponentFromID(id) {
      return this.components.filter(comp => {return comp.id === id})
    },
    RemoveComponent(component) {
      let compIndex = this.components.indexOf(component)
      if(compIndex > -1) {
        this.components.splice(compIndex, 1)
      }
    }
  },
  render(createElement) {
    return createElement('div', this.$slots.default);
  }
}
