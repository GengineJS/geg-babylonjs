class Utils{
    static compareObjVal = (curr,target)=>{
        //取对象a和b的属性名
    
       var currProps = Object.getOwnPropertyNames(curr)
    
       var targetProps = Object.getOwnPropertyNames(target)
    
        //判断属性名的length是否一致
    
       if (currProps.length != targetProps.length) {
    
           return false
    
       }
    
        //循环取出属性名，再判断属性值是否一致
    
       for (var i = 0; i < currProps.length; i++) {
           var propName = currProps[i]
           if (curr[propName] !== target[propName]) {
               return false;
           }
    
       }
    
       return true;
    }
    static lowercaseFirstLetter=string => {
        return string.charAt(0).toLowerCase() + string.slice(1)
    }
    static getAllPropertyNames=( obj )=>{
        var props = []
        do {
            props= props.concat(Object.getOwnPropertyNames( obj ))
        } while ( obj = Object.getPrototypeOf( obj ))
        return props
    }

    static getWatcher = (vueCom,name)=>{
       return vueCom._watchers.filter(item=>{
            if(item.expression===name){
               return true   
            }
        })
    }

    static removeStrSpace = (str)=>{
        return str.replace(/\s+/g, "")
    }
}
export default Utils
export const isFloat = value => Number.isFinite(value) && !Number.isNaN(value)

export const isFloatArray = value => Array.isArray(value) && value.every(isFloat)

export const isBetween0and1 = value => isFloat(value) && value <= 1 && value >= 0

export const id = (size = 12) => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * size | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(size);
  })
};

export const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('')

export const isPercent = value => {
  value = Number.parseFloat(value)
  return !Number.isNaN(value) && value >= 0 && value <= 100
};

export const isDisposable = entity => entity && typeof entity.dispose === 'function'

export const createBus = function () {
  let Geg = this.constructor.super
  return new Geg()
}

export const camelize = str => str.split('-').reduce((result, [first, ...rest]) => result + first.toUpperCase() + rest.join(''), '')

export const last = ([...arr]) => arr.pop()

export const defer = () => {
  let split
  let promise = new Promise((...args) => {
    split = args
  });
  let [complete, error] = split
  Object.assign(promise, { complete, error })
  return promise
}
