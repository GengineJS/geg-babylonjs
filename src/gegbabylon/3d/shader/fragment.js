import Base from "../../base/index.js";
export default {
    name: 'Fragment',
    mixins: [Base],
    Awake() {
      let contentTrim = this.$el.textContent.trim().replace(/\\n|"|'|\\t/g, '')
      contentTrim !== '' && this.parentNode.applyFragmentShader(contentTrim)
    }
}