import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	MATRIX_URL: {
		static: true,
		public: true
	},
	PDS_URL: {
		static: true,
		public: true
	},
	AUTH_ISSUER_URL: {
		static: true,
		public: true
	},
	AKKOMA_URL: {
		static: true,
		public: true
	},
	TURNSTILE_SITEKEY: {
		static: true,
		public: true
	},
	TURNSTILE: {},
	DISCORD_WEBHOOK: {},
	WEATHER_LAT: {},
	WEATHER_LONG: {}
});
