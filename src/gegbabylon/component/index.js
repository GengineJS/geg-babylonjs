import Base from "../base";
export default {
    name: 'Addcomponent',
    mixins: [Base],
    props: {
        src: {
            type: String,
            default() {
                return null
            }
        }
    },
    data() {
        return {
            script: null,
            curObj: null
        }
    },
    mounted() {
        if (this.src) {
            this.axios.get(this.src).then((response)=>{
                this.script = `(${response.data})`
            }).catch((response) => {
                console.error(response.data)
            })
        }
    },
    async Awake() {
        await this.parentNode.onParentReady
        if (this.$el.innerHTML.trim() !== '' && !this.src) {
            this.script = `(${this.$el.innerHTML.trim()})`
        }
        this.curObj = new (eval(this.script))({entity: this.parentObj, engine: this.engine, vueNode: this})
        this.curObj.name = this.curObj.constructor.name
        this.curObj.id = this.id
        'Awake' in this.curObj && this.curObj.Awake(this.engine)
        this.AddComponent(this.curObj)
    },
    async Start() {
        await this.parentNode.onParentReady
        'Start' in this.curObj && this.curObj.Start(this.scene)
    },
    async Update(delta) {
        await this.parentNode.onParentReady
        'Update' in this.curObj && this.curObj.Update(delta)
    }
}