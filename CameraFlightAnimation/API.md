# CameraFlightPlugin API

Details about the classes, methods, and properties provided by pcircs.

<!--- API BEGIN --->

<a name="CameraFlightAnimation"></a>

## CameraFlightAnimation
相机飞行动画插件

**Kind**: global class  

* [CameraFlightAnimation](#CameraFlightAnimation)
    * [new CameraFlightAnimation(camera)](#new_CameraFlightAnimation_new)
    * [.isFlighting](#CameraFlightAnimation+isFlighting) ⇒ <code>boolean</code>
    * [.cancelFlight()](#CameraFlightAnimation+cancelFlight) ⇒ <code>void</code>
    * [.flyTo(options, position, rotation, quaternion, duration, delay, update, complete, easing)](#CameraFlightAnimation+flyTo) ⇒ <code>void</code>
    * [.setView(options)](#CameraFlightAnimation+setView) ⇒ <code>void</code>

<a name="new_CameraFlightAnimation_new"></a>

### new CameraFlightAnimation(camera)

| Param | Type | Description |
| --- | --- | --- |
| camera | <code>THREE.Camera</code> | Camera对象，参见[https://threejs.org/docs/?q=Camera#api/en/cameras/Camera](https://threejs.org/docs/?q=Camera#api/en/cameras/Camera) |

<a name="CameraFlightAnimation+isFlighting"></a>

### cameraFlightAnimation.isFlighting ⇒ <code>boolean</code>
是否飞行中

**Kind**: instance property of [<code>CameraFlightAnimation</code>](#CameraFlightAnimation)  
<a name="CameraFlightAnimation+cancelFlight"></a>

### cameraFlightAnimation.cancelFlight() ⇒ <code>void</code>
取消飞行

**Kind**: instance method of [<code>CameraFlightAnimation</code>](#CameraFlightAnimation)  
<a name="CameraFlightAnimation+flyTo"></a>

### cameraFlightAnimation.flyTo(options, position, rotation, quaternion, duration, delay, update, complete, easing) ⇒ <code>void</code>
飞行至传入的配置项

**Kind**: instance method of [<code>CameraFlightAnimation</code>](#CameraFlightAnimation)  
**Note**: position、rotation、quaternion 三者必须设置一个才能启动飞行  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | 配置项 |
| position | <code>THREE.Vector3</code> | 飞行结束位置，Vector3对象，参见[https://threejs.org/docs/?q=vec#api/en/math/Vector3](https://threejs.org/docs/?q=vec#api/en/math/Vector3) |
| rotation | <code>THREE.Euler</code> | 飞行结束时的旋转欧拉角，与quaternion二选一，Euler对象，参见[https://threejs.org/docs/?q=eul#api/en/math/Euler](https://threejs.org/docs/?q=eul#api/en/math/Euler) |
| quaternion | <code>THREE.Quaternion</code> | 飞行结束时的旋转四元数，与rotation二选一，Quaternion对象，参见[https://threejs.org/docs/?q=qua#api/en/math/Quaternion](https://threejs.org/docs/?q=qua#api/en/math/Quaternion) |
| duration | <code>number</code> \| <code>undefined</code> | 飞行持续时间，单位秒，默认3.0，如果值小于或等于0，则会跳过飞行动画，直接去到目标位置和旋转角度 |
| delay | <code>number</code> \| <code>undefined</code> | 飞行开始延迟时间，单位秒，默认0.0 |
| update | <code>function</code> \| <code>undefined</code> | 飞行动画帧更新时的回调通知函数 |
| complete | <code>function</code> \| <code>undefined</code> | 飞行结束时的回调通知函数 |
| easing | <code>TWEEN.Easing</code> \| <code>undefined</code> | 飞行所使用的TWEEN动画，默认使用TWEEN.Easing.Linear.None，参见[https://github.com/tweenjs/tween.js/blob/main/docs/user_guide.md#available-easing-functions](https://github.com/tweenjs/tween.js/blob/main/docs/user_guide.md#available-easing-functions) |

<a name="CameraFlightAnimation+setView"></a>

### cameraFlightAnimation.setView(options) ⇒ <code>void</code>
设置相机视图，等同于duration<=0的flyTo

**Kind**: instance method of [<code>CameraFlightAnimation</code>](#CameraFlightAnimation)  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | 配置项，参见[flyTo](flyTo) |

<!--- API END --->
