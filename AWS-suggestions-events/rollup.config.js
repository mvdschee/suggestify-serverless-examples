import { defineConfig } from "rollup";
import { terser } from "rollup-plugin-terser";
import { emptyDir } from "rollup-plugin-empty-dir";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";
import replace from "rollup-plugin-replace";
import json from "@rollup/plugin-json";

import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
	input: {
		"suggestions/index": "src/suggestions/index.js",
		"events/index": "src/events/index.js",
	},
	output: {
		dir: "build",
		format: "cjs",
		exports: "named",
	},
	plugins: [
		emptyDir(),
		terser(),
		json(),
		commonjs(),
		nodeResolve(),
		copy({
			targets: [
				{
					src: "src/suggestions/package.json",
					dest: "build/suggestions/",
				},
				{
					src: "src/events/package.json",
					dest: "build/events/",
				},
				{
					src: "src/events/.yarnclean",
					dest: "build/events/",
				},
			],
			hook: "writeBundle",
		}),
		replace({
			exclude: "node_modules/**",
			"process.env.SUPABASE_URL": JSON.stringify(process.env.SUPABASE_URL),
			"process.env.SUPABASE_PREFIX": JSON.stringify(process.env.SUPABASE_PREFIX),
			"process.env.SUPABASE_TEAM_ID": JSON.stringify(process.env.SUPABASE_TEAM_ID),
			"process.env.SUPABASE_SERVICE_KEY": JSON.stringify(process.env.SUPABASE_SERVICE_KEY),
		}),
	],
});
