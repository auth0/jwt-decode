import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";

const EXPORT_NAME = "jwt-decode";
const isProduction = process.env.NODE_ENV === "production";
const tsPlugin = typescript({
  rootDir: "lib",
  sourceMap: true,
});

const plugins = [
  tsPlugin,
  isProduction && terser(),
];

export default defineConfig([{
    input: "lib/index.ts",
    output: {
      name: "jwt_decode",
      file: "build/jwt-decode.js",
      format: "umd",
      sourcemap: true,
    },
    plugins: [
      tsPlugin,
    ]
  },
  {
    input: "lib/index.ts",
    output: [{
      name: EXPORT_NAME,
      file: "build/cjs/jwt-decode.js",
      format: "cjs",
      exports: "auto",
      sourcemap: true,
    }, ],
    plugins,
  },
  {
    input: "lib/index.ts",
    output: [{
      name: EXPORT_NAME,
      file: "build/esm/jwt-decode.js",
      format: "esm",
      sourcemap: true,
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
