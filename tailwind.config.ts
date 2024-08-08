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
				"royal-green": {
					"50": "#f1fcf9",
					"100": "#d1f6ee",
					"200": "#a2eddf",
					"300": "#6cdccb",
					"400": "#3ec3b3",
					"500": "#21978b",
					"600": "#1b867e",
					"700": "#196c66",
					"800": "#195652",
					"900": "#194845",
					"950": "#082b2a",
				},
			},
		},
	},
};
