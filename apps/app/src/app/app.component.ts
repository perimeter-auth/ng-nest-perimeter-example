import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@ng-nest-perimeter-example/api-interfaces';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'ng-nest-perimeter-example-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(
    private http: HttpClient,
    private readonly authService: OAuthService
  ) {}

  onAuthorize() {
    this.authService.initLoginFlow(null, { prompt: 'none' });
  }

  onLogout() {
    this.authService.logOut();
  }

  onAuthorizeSSO() {
    //https://auth0.com/blog/oauth2-implicit-grant-and-spa/
    // this.authService.initLoginFlow(null, { prompt: 'none' });
  }
}
