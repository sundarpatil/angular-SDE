// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { UserManagerSettings } from 'oidc-client';

/* eslint-disable @typescript-eslint/naming-convention*/
export const environment = {
  production: false,
  //apiUrl: 'https://rigor.azure-api.net/NovoDeliver',
  apiUrl: 'http://localhost:7071/api',
  authSettings: {
    automaticSilentRenew: true,
    includeIdTokenInSilentRenew: true,
    authority:
      'https://novopathad.b2clogin.com/NovoPathAD.onmicrosoft.com/B2C_1_signin/v2.0/',
    client_id: '60e7d8b2-9603-4503-8b3f-18c981ac7115',
    redirect_uri: 'http://localhost:4200/login-callback',
    silent_redirect_uri: 'http://localhost:4200/silent-login-callback',
    response_type: 'id_token token',
    scope: 'openid profile 60e7d8b2-9603-4503-8b3f-18c981ac7115',
    response_mode: 'query',
    loadUserInfo: false
  } as UserManagerSettings
};
/* eslint-enable @typescript-eslint/naming-convention*/

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
