// rollup.config.js
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/genshinStats.js",
  output: [
    {
      file: "build/allStats.js",
      format: "es",
    },
    {
      file: "build/allStats.min.js",
      format: "es",
      name: "version",
      plugins: [terser()],
    },
  ],
  plugins: [json()],
};
