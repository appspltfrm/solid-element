import * as path from "path";
import {defineConfig} from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({

    root: "src/test-web",

    resolve: {
        alias: {
            "@appspltfrm/solidx": path.resolve(__dirname, "./src/lib"),
        }
    },

    plugins: [
        solidPlugin({
            babel: {
                plugins: [
                    ["@babel/plugin-proposal-decorators", {version: "legacy"}],
                    ["@babel/plugin-proposal-class-properties", {loose: true}]
                ]
            },
            hot: false,
            typescript: {allowDeclareFields: true}}),
    ],

    server: {
        port: 3000,
    },

    build: {
        target: "esnext",
    }

})
