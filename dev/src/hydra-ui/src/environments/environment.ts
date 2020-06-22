// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hydraApiUrl: 'https://hydra.login.econo.unlp.edu.ar',


  //loginApiUrl: 'https://hydra.login.econo.unlp.edu.ar/login/api/v1.0',
  //emailApiUrl: 'https://hydra.login.econo.unlp.edu.ar/email/api/v1.0',
  //recoverApiUrl: 'https://api.login.econo.unlp.edu.ar/recover/api/v1.0',
  //hardwareApiUrl: 'https://hydra.login.econo.unlp.edu.ar/login/api/v1.0',
  loginApiUrl: 'http://localhost:10002/login/api/v1.0',
  emailApiUrl: 'http://localhost:10002/email/api/v1.0',
  recoverApiUrl: 'http://localhost:10002/recover/api/v1.0',
  hardwareApiUrl: 'http://localhost:10002/login/api/v1.0',


  wardenApiUrl: 'https://warden.econo.unlp.edu.ar/warden/api/v1.0',
  //oidp_issuer: 'https://oidc.econo.unlp.edu.ar/',
  //oidp_issuer: 'http://oidc:4444/',

  client_id: 'login-ui',
  version: '0.6.0',
  
  url_to_activate_qr: 'http://login:10005/login/qrcode/activar',
  
  auth: {
    //issuer: 'https://oidc.econo.unlp.edu.ar/',
    issuer: 'http://oidc:4444/',
    redirectUri: 'http://localhost:10005/auth/oauth2',
    clientId: 'login-ui',
    scope: 'openid profile email',
    waitForTokenInMsec: 2000,
    requireHttps: false
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
