import './libs/weapp-adapter/index.js'
import './libs/blob.js'
import GegBabylon from './gegbabylon/index.js'
import Geg from './libs/geg.js'
Geg.use(GegBabylon)
let geg = new Geg({
  el: 'src/template.xml',
  // template: "<engine><scene><camera type='ArcRotateCamera'></camera></scene></engine>"
  // data() {
  //   return {
  //     sPosition: { x: 1, y: 1, z: 0 },
  //     frameEnd: Math.PI * 2,
  //     checkGroups: [['hello'], ['world']]
  //   }
  // },
  // methods: {
  //   registerEve(eve, ext) {
  //     console.log('注册按钮点击', eve, ext)
  //   }
  // }
})