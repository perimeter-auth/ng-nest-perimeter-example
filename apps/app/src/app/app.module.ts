import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthConfig, OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';

export const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin,
  responseType: 'code',
  showDebugInformation: true,
  ...environment.auth,
  //strictDiscoveryDocumentValidation: false,
  //skipIssuerCheck: true,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:3333/api/'],
        sendAccessToken: true,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(authService: OAuthService) {
    authService.configure(authCodeFlowConfig);
    authService.loadDiscoveryDocumentAndTryLogin();
  }
}
