import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import sourcemaps from "rollup-plugin-sourcemaps";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

const EXPORT_NAME = "jwt-decode";
const COMMONJS_INPUT = "lib/index.cjs.js";
const ES_INPUT = "lib/index.js";
const isProduction = process.env.NODE_ENV === "production";
const plugins = [
    resolve({
        browser: true,
    }),
    commonjs({
        requireReturnsDefault: "preferred",
    }),
    isProduction && terser(),
    sourcemaps(),
];

export default [{
        input: COMMONJS_INPUT,
        output: {
            name: EXPORT_NAME,
            file: "build/jwt-decode.js",
            format: "umd",
            sourcemap: true,
        },
    },
    {
        input: COMMONJS_INPUT,
        output: [{
            name: EXPORT_NAME,
            file: "build/jwt-decode.cjs.js",
            format: "cjs",
            exports: "auto",
        }, ],
        plugins,
    },
    {
        input: ES_INPUT,
        output: [{
            name: EXPORT_NAME,
            file: "build/jwt-decode.esm.js",
            format: "esm",
        }, ],
        plugins: [!isProduction &&
            serve({
                contentBase: ["build", "static"],
                open: true,
                port: 3000,
            }), !isProduction && livereload(),
            ...plugins,
        ],
        watch: {
            clearScreen: false,
        },
    },
];