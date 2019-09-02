import * as BABYLON from './libs/babylon.js'
import * as mixins from './mixins.js'
// import { Cannon as Physics } from './physics'
const applyComponent = (Geg, { components = {} } = {}) => {
  Object.entries(components).forEach(entry => {
    Geg.component(...entry)
  })
}
export default function install(Geg, options = {}) {
  Object.assign(Geg.prototype, { BABYLON })
  Object.assign(Geg, { BABYLON })
  applyComponent(Geg, Object.assign({ components: Object.assign({}, mixins) }, options))// Physics
}
