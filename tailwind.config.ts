import type { Config } from "tailwindcss";

export default <Partial<Config>>{
	theme: {
		extend: {
			colors: {
				"royal-blue": {
					"50": "#eef2ff",
					"100": "#e0e8ff",
					"200": "#c6d3ff",
					"300": "#a4b5fd",
					"400": "#808df9",
					"500": "#5c62f2",
					"600": "#4b44e7",
					"700": "#3f37cb",
					"800": "#342fa4",
					"900": "#2e2d82",
					"950": "#1d1b4b",
				},
			},
		},
	},
};
