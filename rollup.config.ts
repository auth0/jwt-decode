import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";

const isProduction = process.env.NODE_ENV === "production";
const typescriptDefaultOptions = {
  rootDir: "lib",
  sourceMap: true,
};

const plugins = [
  typescript(typescriptDefaultOptions),
  isProduction && terser(),
];

const input = "lib/index.ts";

export default defineConfig([{
    input: "lib/index.umd.ts",
    output: {
      name: "jwt_decode",
      file: "build/jwt-decode.js",
      format: "umd",
      sourcemap: true,
    },
    plugins: [
      typescript(
        {
          ...typescriptDefaultOptions,
          // generate declarations
          declaration: true,
          declarationDir: "./build/typings"
        }
      ),
    ]
  },
  {
    input,
    output: {
      file: "build/cjs/jwt-decode.js",
      format: "cjs",
      sourcemap: true,
    },
    plugins,
  },
  {
    input,
    output: {
      file: "build/esm/jwt-decode.js",
      format: "esm",
      sourcemap: true,
    },
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
