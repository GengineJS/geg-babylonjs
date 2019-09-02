import DisplayObject from "../../display/index.js";
export default {
    name: 'Object2d',
    mixins: [DisplayObject],
    created() {
      this.listeners = ['onPointerMoveObservable',
        'onPointerEnterObservable',
        'onPointerOutObservable',
        'onPointerDownObservable',
        'onPointerUpObservable',
        'onPointerClickObservable',
        'onClipboardObservable',
        'onTextChangedObservable'
      ]
    },
    methods: {
      onAttachEve() {
        this.listeners.forEach(eveKey => {
          this.curObj[eveKey] && this.curObj[eveKey].add((eve, ext) => {
            switch(eveKey) {
              case 'onPointerMoveObservable':
                this.$emit('mousemove', eve, ext)
              break
              case 'onPointerEnterObservable':
                this.$emit('mouseenter', eve, ext)
              break
              case 'onPointerOutObservable':
                this.$emit('mouseout', eve, ext)
              break
              case 'onPointerDownObservable':
                this.$emit('mousedown', eve, ext)
              break
              case 'onPointerUpObservable':
                this.$emit('mouseup', eve, ext)
              break
              case 'onPointerClickObservable':
                this.$emit('click', eve, ext)
              break
              case 'onClipboardObservable':
                this.$emit('clipboard', eve, ext)
              break
              case 'onTextChangedObservable':
                this.$emit('change', eve, ext)
              break
            }
          })
        })
      }
    },
    OnAdd() {
        this.parentObj.addControl && this.parentObj.addControl(this.curObj)
    }
}