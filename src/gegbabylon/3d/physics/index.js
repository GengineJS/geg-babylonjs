import * as oimo from '../../libs/oimo.js'
import { PhysicsImpostor, Vector3, OimoJSPlugin } from '../../libs/babylon.js'
import DisplayObject from '../../display/index.js'
let TYPES = {
    BOX: 'BoxImpostor',
    SPHERE: 'SphereImpostor',
    PLANE: 'PlaneImpostor',
    MESH: 'MeshImpostor',
    CYLINDER: 'CylinderImpostor',
    PARTICLE: 'ParticleImpostor',
    HEIGHTMAP: 'HeightmapImpostor',
    CONVEXHULL: 'ConvexHullImpostor'
}
export default {
    name: "Physics",
    mixins: [DisplayObject],
    props: {
        type: {
          default() {
            return 'Box'
          }
        },
        plugin: {
          default() {
            return 'oimo'
          }
        }
    },
    methods: {
        getPlugin() {
          return new OimoJSPlugin(null, oimo)
        }
    },
    OnAdd(parent) {
      parent.physicsImpostor = this.curObj
    },
    Start(scene) {
      scene.enablePhysics(new Vector3(0, -0.98, 0), this.getPlugin())
      this.parentNode.onParentReady && this.parentNode.onParentReady.then(() => {
        // A physics impostor has been created for an object which has a parent. Babylon physics currently works in local space so unexpected issues may occur.
        let tempParent = this.parentObj.parent
        tempParent && (this.parentObj.parent = null)
        let curObj = new PhysicsImpostor(this.parentObj, PhysicsImpostor[TYPES[this.type.toUpperCase()]], {}, scene)
        tempParent && (this.parentObj.parent = tempParent)
        this.curObj = curObj
      })
      
    },
}
