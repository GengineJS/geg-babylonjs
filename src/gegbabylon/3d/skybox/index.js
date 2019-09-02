import Object3D from '../object3d/index.js'
import * as MATERIAL from '../../libs/babylonjs.materials.min.js'
import * as BABYLON from '../../libs/babylon.js'
export default {
  name: 'Skybox',
  mixins: [Object3D],
  props: {
    src: {
      type: String,
      default() {
        return ''
      }
    },
    size: {
      type: Number,
      default() {
        return 1000
      }
    }
  },
  Start(scene) {
    this.isAddParent = false
    if (this.isEmptyCurObj()) {
      let skybox = BABYLON.MeshBuilder.CreateBox(this.name, { size: this.size }, scene)
      let skyboxMaterial = null
      if (this.src) {
        skyboxMaterial = new BABYLON.StandardMaterial('skyBox', scene)
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(this.src, scene)
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0)
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0)
      } else {
        skyboxMaterial = new MATERIAL.SkyMaterial('skyMaterial', scene)
        skyboxMaterial.inclination = 100 // The solar inclination, related to the solar azimuth in interval [0, 1]
        skyboxMaterial.azimuth = 0.25
        skyboxMaterial.luminance = 1 // Controls the overall luminance of sky in interval ]0, 1,190[
        skyboxMaterial.turbidity = 5 // Represents the amount (scattering) of haze as opposed to molecules in atmosphere
      }
      skyboxMaterial.backFaceCulling = false
      skybox.material = skyboxMaterial
      this.curObj = skyboxMaterial
    }
  }
}
