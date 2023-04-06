import * as path from "path";
import {defineConfig} from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
    root: "src/lib",

    plugins: [
        solidPlugin({
            babel: {
                plugins: [
                    ["@babel/plugin-proposal-decorators", {version: "legacy"}],
                    ["@babel/plugin-proposal-class-properties", {loose: true}]
                ]
            },
            hot: false,
            typescript: {allowDeclareFields: true}
        }),
    ],

    build: {
        outDir: path.resolve(__dirname, "./dist"),
        sourcemap: true,
        emptyOutDir: true,
        lib: {
            entry: ["index.ts"],
            formats: ["es"]
        },
        rollupOptions: {
            output: {
                preserveModules: true,
                preserveModulesRoot: "src/lib",
                entryFileNames: "[name].js",
                chunkFileNames: "[name].js"
            },
            external: [
                /solid-js(\/{0,1}).*/,
                /@co.mmons\/js-utils(\/{0,1}).*/
            ],
        },
    },
})
