(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.getCameraFlightAnimation = factory());
})(this, (function () { 'use strict';

    const PI = Math.PI;
    const TWO_PI = 2.0 * PI;

    /**
     * 将一个数值转换至两个数值范围内
     * 如不在范围内则累加或累减范围长度，直至落在范围内
     * @param {Number} value 需要转换的数值
     * @param {Number} rangeMinimum 较小数
     * @param {Number} rangeMaximum 较大数
     * @returns {Number} 转换后的数值
     */
    function convertToRange(value, rangeMinimum, rangeMaximum) {
        const length = rangeMaximum - rangeMinimum;
        if (value < rangeMinimum) {
            value += length;
            while (value < rangeMinimum)
                value += length;
        } else if (value > rangeMaximum) {
            value -= length;
            while (value > rangeMaximum)
                value -= length;
        }
        return value;
    }

    /**
     * 转换一个弧度至一个圆周范围内
     * @param {Number} radians 需要转换的弧度
     * @param {Number} minValue 圆周起始弧度，默认0
     * @returns {Number} 转换后的弧度
     */
    function convertToRadiansCircular(radians, minValue = 0) {
        return convertToRange(radians, minValue, minValue + TWO_PI);
    }

    function index (THREE, TWEEN) {

        /**
         * 相机飞行动画插件
        */
        class CameraFlightAnimation {
            /**
             * @constructor
             * @param {THREE.Camera} camera Camera对象，参见{@link https://threejs.org/docs/?q=Camera#api/en/cameras/Camera}
             */
            constructor(camera) {
                this.camera = camera;
            }

            /**
             * 是否飞行中
             * @returns {boolean}
             */
            get isFlighting() {
                return this._flightTween ? true : false;
            }

            /**
             * 取消飞行
             * @returns {void}
             */
            cancelFlight() {
                if (this._flightTween) {
                    this._flightTween.stop();
                    delete this._flightTween;
                }
            }

            /**
             * 飞行至传入的配置项
             * @param {object} options 配置项
             * @param {THREE.Vector3} position 飞行结束位置，Vector3对象，参见{@link https://threejs.org/docs/?q=vec#api/en/math/Vector3}
             * @param {THREE.Euler} rotation 飞行结束时的旋转欧拉角，与quaternion二选一，Euler对象，参见{@link https://threejs.org/docs/?q=eul#api/en/math/Euler}
             * @param {THREE.Quaternion} quaternion 飞行结束时的旋转四元数，与rotation二选一，Quaternion对象，参见{@link https://threejs.org/docs/?q=qua#api/en/math/Quaternion}
             * @param {number|undefined} duration 飞行持续时间，单位秒，默认3.0，如果值小于或等于0，则会跳过飞行动画，直接去到目标位置和旋转角度
             * @param {number|undefined} delay 飞行开始延迟时间，单位秒，默认0.0
             * @param {Function|undefined} update 飞行动画帧更新时的回调通知函数
             * @param {Function|undefined} complete 飞行结束时的回调通知函数
             * @param {TWEEN.Easing|undefined} easing 飞行所使用的TWEEN动画，默认使用TWEEN.Easing.Linear.None，参见{@link https://github.com/tweenjs/tween.js/blob/main/docs/user_guide.md#available-easing-functions}
             * @returns {void}
             * @note position、rotation、quaternion 三者必须设置一个才能启动飞行
             */
            flyTo(options = {}) {
                if (options.quaternion)
                    options.rotation = new THREE.Euler().setFromQuaternion(options.quaternion);
                if (!options.position && !options.rotation) {
                    console.warn('The position or rotation must be require.');
                    return;
                }
                //取消当前的飞行动画
                this.cancelFlight();
                let source = {},
                    target = {};
                if (options.position) {
                    //记录当前位置
                    source.positionX = this.camera.position.x;
                    source.positionY = this.camera.position.y;
                    source.positionZ = this.camera.position.z;
                    //记录目标位置
                    target.positionX = options.position.x;
                    target.positionY = options.position.y;
                    target.positionZ = options.position.z;
                }
                if (options.rotation) {
                    //记录当前角度
                    source.rotationX = convertToRadiansCircular(this.camera.rotation.x, -PI);
                    source.rotationY = convertToRadiansCircular(this.camera.rotation.y, -PI);
                    source.rotationZ = convertToRadiansCircular(this.camera.rotation.z, -PI);
                    //记录目标角度
                    target.rotationX = convertToRadiansCircular(options.rotation.x, -PI);
                    target.rotationY = convertToRadiansCircular(options.rotation.y, -PI);
                    target.rotationZ = convertToRadiansCircular(options.rotation.z, -PI);

                    if (Math.abs(source.rotationX - target.rotationX) > PI) {
                        if (source.rotationX > target.rotationX)
                            target.rotationX += TWO_PI;
                        else if (source.rotationX < target.rotationX)
                            target.rotationX -= TWO_PI;
                    }
                    if (Math.abs(source.rotationY - target.rotationY) > PI) {
                        if (source.rotationY > target.rotationY)
                            target.rotationY += TWO_PI;
                        else if (source.rotationY < target.rotationY)
                            target.rotationY -= TWO_PI;
                    }
                    if (Math.abs(source.rotationZ - target.rotationZ) > PI) {
                        if (source.rotationZ > target.rotationZ)
                            target.rotationZ += TWO_PI;
                        else if (source.rotationZ < target.rotationZ)
                            target.rotationZ -= TWO_PI;
                    }
                }

                const duration = (options.duration ?? 3.0) * 1000;
                if (duration <= 0) {
                    if (options.position)
                        this.camera.position.set(target.positionX, target.positionY, target.positionZ);
                    if (options.rotation)
                        this.camera.rotation.set(target.rotationX, target.rotationY, target.rotationZ);
                    this.camera.matrixWorldNeedsUpdate = true;
                    if (typeof options.complete === 'function')
                        options.complete(this);
                    return;
                }
                const easing = (options.easing ?? TWEEN.Easing.Linear.None);
                const delay = (options.delay ?? 0) * 1000;
                this._flightTween = new TWEEN.Tween(source).to(target, duration)
                    .easing(easing) // Use an easing function to make the animation smooth.
                    .delay(delay)
                    .onUpdate(() => {
                        if (options.position)
                            this.camera.position.set(source.positionX, source.positionY, source.positionZ);
                        if (options.rotation)
                            this.camera.rotation.set(source.rotationX, source.rotationY, source.rotationZ);
                        this.camera.matrixWorldNeedsUpdate = true;
                        if (typeof options.update === 'function')
                            options.update(this);
                    }).onComplete(() => {
                        delete this._flightTween;
                        if (typeof options.complete === 'function')
                            options.complete(this);
                    }).start(); // Start the tween immediately.
            }

            /**
             * 设置相机视图，等同于duration<=0的flyTo
             * @param {object} options 配置项，参见{@link flyTo}
             * @returns {void}
             */
            setView(options = {}) {
                options.duration = 0;
                this.flyTo(options);
            }
        }
        return CameraFlightAnimation;

    }

    return index;

}));
//# sourceMappingURL=CameraFlightAnimation.umd.js.map
