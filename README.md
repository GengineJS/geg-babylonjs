# Geg-Babylonjs

Geg-Babylonjs是基于Geg.js开发的3D项目,项目基于[Babylonjs](https://github.com/BabylonJS/Babylon.js)引擎。

## 安装

以微信小游戏平台说明

```
# 克隆项目
git clone https://github.com/GengineJS/geg-babylonjs.git

# 进入项目目录
cd geg-babylonjs

```

## 目录结构

```
├── src                       # 源代码
│   ├── gegbabylon            # babylonjs组件
│   ├── libs                  # 用到的源码库
│   ├── app.js                # 功能入口
│   └── template.xml          # template层级文件
│   
├── game.js                   # 微信小游戏入口
├── game.json                 # 小游戏相关配置
└── project.config.json       # 工程相关配置
```

## 组件核心

Geg-Babylonjs中的所有组件都可以通过v-bind方式给各个组件中对应的对象赋值,
以Babylonjs中的Box对象为例,它具备的属性如下（列举部分）：
```js
@serializeAsVector3("position")
private _position = Vector3.Zero();
/**
  * Gets or set the node position (default is (0.0, 0.0, 0.0))
  */
public get position(): Vector3 {
    return this._position;
}

public set position(newPosition: Vector3) {
    this._position = newPosition;
    this._isDirty = true;
}

@serializeAsVector3("rotation")
private _rotation = Vector3.Zero();
/**
  * Gets or sets the rotation property : a Vector3 defining the rotation value in radians around each local axis X, Y, Z  (default is (0.0, 0.0, 0.0)).
  * If rotation quaternion is set, this Vector3 will be ignored and copy from the quaternion
  */
public get rotation(): Vector3 {
    return this._rotation;
}

public set rotation(newRotation: Vector3) {
    this._rotation = newRotation;
    this._rotationQuaternion = null;
    this._isDirty = true;
}

@serializeAsVector3("scaling")
protected _scaling = Vector3.One();
/**
 * Gets or sets the scaling property : a Vector3 defining the node scaling along each local axis X, Y, Z (default is (0.0, 0.0, 0.0)).
 */
public get scaling(): Vector3 {
    return this._scaling;
}
public set scaling(newScaling: Vector3) {
    this._scaling = newScaling;
    this._isDirty = true;
}
```
自定义的组件就可以通过以下方式为对应的属性赋值
```js
// mesh组件的默认对象就是立方体
<mesh :position="{x:0,y:0,z:0}" :scaling="{x:2,y:2,z:2}"></mesh>
```
## Base组件

除了engine组件外，其余组件都直接或间接继承至(mixins)base组件，base组件中需要说明的内容如下：

**特殊生命周期**

**Awake**: Awake函数在 new Babylon.Engine(canvas) 后调用，它传递了初始化后的engine对象

**Start**: Start函数在当前场景初始化后调用，它传递了初始化后的scene对象,它与Awake不同，Awake调用时，scene对象还不存在

**Update**: Update函数在engine render函数内调用，每渲染一次调用一次当前组件的Update函数并传递delta参数

可以通过以下方式定义特殊生命周期

```js
export default {
  name: 'customLifeCycle',
  data() {
    return {
      test: 'custom'
    }
  },

  Awake(engine) {
    console.log(this.test)
  },

  Start(scene) {

  },

  Update(delta) {

  }
}
```

**逻辑组件**: 

为了与Vue/Geg中的组件定义区分开,我们把base组件内部中的components属性定义为逻辑组件的集合,逻辑组件是为当前Babylonjs对象
编写额外逻辑代码而设计，它类似于Unity3D中的组件概念

```js
props: {
  components: {
        type: Array,
        default() {
          return []
        }
  }
},
methods: {
  // 为当前geg组件添加逻辑组件
  AddComponent(component) {
    this.components.push(component)
  },
  // 根据逻辑组件名称获取逻辑组件
  GetComponentFromName(name) {
    return this.components.filter(comp => {return comp.name === name})
  },
  // 根据逻辑组件ID获取逻辑组件
  GetComponentFromID(id) {
    return this.components.filter(comp => {return comp.id === id})
  },
  // 移除逻辑组件
  RemoveComponent(component) {
    let compIndex = this.components.indexOf(component)
    if(compIndex > -1) {
      this.components.splice(compIndex, 1)
    }
  }
}
```

## DisplayObject组件

该组件定义了如何添加Babylonjs实体对象的方法,并对实体对象的变化或相应属性的变化进行监听,它通过config对象进行管理：

**config对象**

所有继承（mixins）DisplayObject的子组件都具备config属性,所以如果要对Babylonjs中的实体对象进行操作，即可通过config调用相应实体对象对应的属性即可完成修改实体对象的功能,如：

```js
<Light ref="currLight"></Light>

export default {
  Start() {
    this.$refs.currLight.config.position = {x:10, y:20, z:10} // 或 new Babylon.Vector3(10, 20, 10)
  }
}

```
除了config对象需要说明外，curObj也同样重要

**curObj对象**

curObj代表着当前组件所要操作的Babylonjs实体对象，如：
```js
// 平行光的定义
this.curObj = new Babylon.DirectionalLight()
```
那么为什么建议操作config而不是curObj呢?
因为出于性能考虑并没有去监听curObj中的属性变化，所以如果直接修改curObj，config中的值不一定能够同步更新

## 其余组件

其余组件的操作，或者组件中是否有特殊的props属性值需要传递，建议看源代码中的定义
<br/>
