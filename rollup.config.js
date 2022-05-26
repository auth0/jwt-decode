import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import sourcemaps from "rollup-plugin-sourcemaps";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

const EXPORT_NAME = "jwt-decode";
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
        input: "lib/index.standalone.js",
        output: {
            name: "jwt_decode",
            file: "build/jwt-decode.js",
            format: "umd",
        },
    },
    {
        input: "lib/index.cjs.js",
        output: [{
            name: EXPORT_NAME,
            file: "build/jwt-decode.cjs.js",
            format: "cjs",
            exports: "auto",
        }, ],
        plugins,
    },
    {
        input: "lib/index.js",
        output: [{
            name: EXPORT_NAME,
            file: "build/jwt-decode.mjs",
            format: "esm",
        }],
        plugins,
    },
    {
        input: "lib/index.js",
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
