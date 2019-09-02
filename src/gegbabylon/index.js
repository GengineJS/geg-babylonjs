import install from './install.js'
window.canvas && !window.canvas.setAttribute && (window.canvas.setAttribute = () => {})
window.prompt || (window.prompt = () => {})
let GegBabylon = {
  install
}
export default GegBabylon