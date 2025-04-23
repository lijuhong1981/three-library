import nodeResolve from "@rollup/plugin-node-resolve";
import json from '@rollup/plugin-json';
import terser from "@rollup/plugin-terser";
import cleanup from "rollup-plugin-cleanup";

const output = (file, format, sourcemap) => ({
    input: './index.js',
    output: {
        name: 'getCameraFlightAnimation',
        file,
        format,
        sourcemap,
    },
    plugins: [
        nodeResolve({
            browser: true,
            preferBuiltins: false
        }),
        json(),
        !sourcemap ? cleanup() : undefined,
        !sourcemap ? terser() : undefined,
    ],
    // 用来指定代码执行环境的参数，解决this执行undefined问题 
    context: 'window',
});

export default [
    output('./dist/CameraFlightAnimation.umd.js', 'umd', true),
    output('./dist/CameraFlightAnimation.umd.min.js', 'umd', false),
    output('./dist/CameraFlightAnimation.esm.js', 'esm', true),
    output('./dist/CameraFlightAnimation.esm.min.js', 'esm', false),
]