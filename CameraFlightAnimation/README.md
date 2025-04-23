# CameraFlightAnimation
一个基于 [threejs](https://threejs.org/) Camera对象开发的飞行动画插件，依赖 [@tweenjs/tween.js](https://github.com/tweenjs/tween.js) 动画库。

API文档点击这里 [API documentation](./API.md).

## 构建

### 安装

```bash
npm install
```

### 构建插件

```bash
npm run build
```

### 构建API文档

```bash
npm run build-api
```

## NPM导入

### 安装

```bash
npm install @lijuhong1981/three-cameraflight
```

### 导入

```js
import * as TRHEE from 'three';
import TWEEN from '@tweenjs/tween.js';
import getCameraFlightAnimation from '@lijuhong1981/three-cameraflight';
```

## 文件导入

### html引用

```html
<script type="text/javascript" src="./path/to/three.js"></script>
<script type="text/javascript" src="./path/to/tween.umd.js"></script>
<script type="text/javascript" src="./path/to/CameraFlightAnimation.umd.js"></script>
```

### 模块化导入

```js
import * as TRHEE from './path/to/three.module.js';
import TWEEN from './path/to/tween.esm.js';
import getCameraFlightAnimation from './path/to/CameraFlightAnimation.esm.js';
```

## 使用

```js
const CameraFlightAnimation = getCameraFlightAnimation(THREE, TWEEN);
...
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
...
const cameraFlight = new CameraFlightAnimation(camera);
...
cameraFlight.flyTo({
    position: targetPosition, //飞行目标位置
    rotation: targetRotation, //飞行目标旋转角度
});
```

## 注意

TWEEN需要在动画帧中调用update方法

```js
function animate(time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
    render();
}
```
