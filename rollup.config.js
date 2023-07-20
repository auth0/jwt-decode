import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import sourcemaps from "rollup-plugin-sourcemaps";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import typescript from "rollup-plugin-typescript2";

const EXPORT_NAME = "jwt-decode";
const isProduction = process.env.NODE_ENV === "production";
const plugins = [
    resolve({
        browser: true,
    }),
    commonjs({
        requireReturnsDefault: "preferred",
    }),
    typescript({
        clean: true,
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
            noEmit: false,
            sourceMap: true,
            compilerOptions: {
                lib: ['dom', 'es6']
            }
        }
    }),
    isProduction && terser(),
    sourcemaps(),
];

export default [{
        input: "lib/index.standalone.ts",
        output: {
            name: "jwt_decode",
            file: "dist/jwt-decode.js",
            format: "umd",
        },
        plugins: [
            typescript({
                clean: true,
                useTsconfigDeclarationDir: true,
                tsconfigOverride: {
                    noEmit: false,
                    sourceMap: true,
                    compilerOptions: {
                        lib: ['dom', 'es6']
                    }
                }
            }),
        ]
    },
    {
        input: "lib/index.cjs.ts",
        output: [{
            name: EXPORT_NAME,
            file: "dist/jwt-decode.cjs.js",
            format: "cjs",
            exports: "auto",
        }, ],
        plugins,
    },
    {
        input: "lib/index.ts",
        output: [{
            name: EXPORT_NAME,
            file: "dist/jwt-decode.esm.js",
            format: "esm",
        }, ],
        plugins: [!isProduction &&
            serve({
                contentBase: ["dist", "static"],
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