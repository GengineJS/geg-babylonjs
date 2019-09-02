import Object3D from '../object3d/index.js'
import '../../libs/babylon_loaders.js'
import { MeshBuilder, SceneLoader } from '../../libs/babylon.js'
export default {
    name: 'Mesh',
    mixins: [Object3D],
    props: {
        // Box
        // Cylinder
        // DashedLines
        // Disc
        // Ground
        // IcoSphere
        // Lathe
        // Lines
        // LineSystem
        // Plane
        // PolygonMesh
        // Polyhedron
        // Ribbon
        // Sphere
        // TiledGround
        // Torus
        // TorusKnot
        // Tube
        // ExtrudePolygon
        // ExtrudeShape
        // ExtrudeShapeCustom
        type: { type: String, default() { return 'Box' }},
        options: {type: Object, default() { return {}}},
        src: {type: String, default() {return ''}}
    },
    Start(scene) {
        if(this.isEmptyCurObj()) {
            if (this.src !== '') {
              SceneLoader.LoadAssetContainerAsync(this.src).then((assetContainer) => {
                // if (assetContainer.meshes.length > 1) {
                //   console.log('length>1')
                //   this.curObj = assetContainer.createRootMesh()
                // } else {
                //   console.log('length===0')
                //   this.curObj = assetContainer.meshes[0]
                // }
                assetContainer.addAllToScene()
                let curObj = scene.meshes[scene.meshes.length - 1]
                curObj.position.y = -1
                curObj.scaling.x = 0.05
                curObj.scaling.y = 0.05
                curObj.scaling.z = 0.05
              })
            } else {
                this.curObj = MeshBuilder[`Create${this.type}`](this.default.name, this.options, scene)
            }
        }
    }
}
