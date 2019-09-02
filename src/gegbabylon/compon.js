export default {
  name: 'customLifeCycle',
  data() {
    return {
      test: 'custom'
    }
  },

  Awake(engine) {
    console.log(this.test)
  },

  Start(scene) {

  },

  Update(delta) {

  }
}