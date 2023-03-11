// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import 'dotenv/config'

export const environment = {
  production: false,
  mercadoLibreAPI: 'https://api.mercadolibre.com',
  mercadoLibreSite: process.env.MERCADOLIBRE_SITE,
  redirect_uri: process.env.REDIRECT_URL,
  access_token: process.env.ACCESS_TOKEN,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  code_app: process.env.CODE_APP
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
