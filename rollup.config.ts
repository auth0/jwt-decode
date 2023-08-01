import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";

const isProduction = process.env.NODE_ENV === "production";
const plugins = [typescript({ rootDir: "lib" })];
const input = "lib/index.ts";

export default defineConfig([
  {
    input: "lib/index.umd.ts",
    output: {
      name: "jwt_decode",
      file: "build/jwt-decode.js",
      format: "umd",
    },
    plugins,
  },
  {
    input,
    output: {
      file: "build/cjs/jwt-decode.cjs",
      format: "cjs",
    },
    plugins,
  },
  {
    input,
    output: {
      file: "build/esm/jwt-decode.js",
      format: "esm",
    },
    plugins: [
      !isProduction &&
        serve({
          contentBase: ["build", "static"],
          open: true,
          port: 3000,
        }),
      !isProduction && livereload(),
      ...plugins,
    ],
    watch: {
      clearScreen: false,
    },
  },
]);
