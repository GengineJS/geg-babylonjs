import Material from '../material/index.js'
import { Effect } from '../../libs/babylon.js'
export default {
    name: 'Shader',
    mixins: [Material],
    props: {
        src: {
            type: String,
            default() {
                return null
            }
        },
        vertextCode: {
            default() {
                return `
                attribute vec3 position;
                uniform mat4 worldViewProjection;
                void main() {
                  gl_Position = worldViewProjection * vec4(position, 1.0);
                }
                `
            }
        },
        fragmentCode: {
            default() {
                return `
                precision highp float;
                void main() {
                  gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
                }
                `
            }
        },
        type: {
            default() {
                return 'ShaderMaterial'
            }
        },
        // vertex script id
        vertexElement: {
            default() {
                return null
            }
        },
        // fragment script id
        fragmentElement: {
            default() {
                return null
            }
        },
        attributes: {
            default() {
                return []
            }
        },
        uniforms: {
            default() {
                return []
            }
        }
    },
    data() {
        return {
            time: 0,
            storeName: null,
            vertShaderComponent: null,
            fragShaderComponent: null,
            defaultUniforms: ['world', 'worldView', 'worldViewProjection', 'view', 'projection','time'],
            defaultAttributes: ['position', 'normal', 'uv']
        }
    },
    methods: {
        applyVertexShader(vert) {
            this.vertShaderComponent = vert
        },
        applyFragmentShader(frag) {
            this.fragShaderComponent = frag
        },
        getOptions() {
            return {
                attributes: this.defaultAttributes.concat(this.attributes),
                uniforms: this.defaultUniforms.concat(this.uniforms)
            }
        },
        getRoute() {
            if (this.src) {
                return this.src
            }
            if (this.vertexElement && this.fragmentElement) {
                return {
                    vertexElement: this.vertexElement,
                    fragmentElement: this.fragmentElement
                }
            }
            if (this.vertShaderComponent && this.fragShaderComponent) {
                this.setStoreShader(this.vertShaderComponent, this.fragShaderComponent)
            } else {
                this.setStoreShader()
            }
            return {
                fragment: this.storeName,
                vertex: this.storeName
            }
        },
        setStoreShader(vcode = this.vertextCode, fcode = this.fragmentCode) {
            this.storeName = this.id
            Effect.ShadersStore[`${this.storeName}VertexShader`] = vcode
            Effect.ShadersStore[`${this.storeName}FragmentShader`] = fcode
        }
    },
    Args() {
        return [this.type, this.scene, this.getRoute(), this.getOptions()]
    },
    Update(delta) {
        this.time += delta
        if(this.time > 1) {
            this.time = 0
        }
        this.curObj.setFloat('time', this.time)
    }
}