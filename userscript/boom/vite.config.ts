import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import monkey from "vite-plugin-monkey";
import autoprefixer from "autoprefixer";
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte(),
		monkey({
			entry: "src/main.ts",
			userscript: {
				icon: "https://www.google.com/s2/favicons?sz=64&domain=line.me",
				namespace: "a",
				match: ["https://linevoom.line.me/*"],
				version: "0.1.1",
			},
		}),
	],
	css: {
		postcss: {
			plugins: [autoprefixer()],
		},
	},
});
