import terser from "@rollup/plugin-terser";
import { defineConfig } from "rollup";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";
import typescript from "rollup-plugin-typescript2";

const EXPORT_NAME = "jwt-decode";
const isProduction = process.env.NODE_ENV === "production";
const plugins = [
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
];

export default defineConfig([{
        input: "lib/index.standalone.ts",
        output: {
            name: "jwt_decode",
            file: "build/jwt-decode.js",
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
            file: "build/cjs/jwt-decode.js",
            format: "cjs",
            exports: "auto",
        }, ],
        plugins,
    },
    {
        input: "lib/index.ts",
        output: [{
            name: EXPORT_NAME,
            file: "build/esm/jwt-decode.js",
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
]);
