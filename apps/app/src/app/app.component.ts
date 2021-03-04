import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@ng-nest-perimeter-example/api-interfaces';
import { OAuthService } from 'angular-oauth2-oidc';
import { catchError, map, switchMap } from 'rxjs/operators';
import { forkJoin, Observable, of, Subject, timer } from 'rxjs';

@Component({
  selector: 'ng-nest-perimeter-example-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  readonly refresh$ = new Subject();
  readonly view$: Observable<any>;

  constructor(
    private http: HttpClient,
    private readonly authService: OAuthService
  ) {
    this.view$ = this.refresh$.pipe(
      switchMap(() =>
        forkJoin([
          this.http
            .get<Message>('http://localhost:3333/api/read')
            .pipe(catchError((err) => of(err))),
          this.http
            .get<Message>('http://localhost:3333/api/read-1')
            .pipe(catchError((err) => of(err))),
          this.http
            .get<Message>('http://localhost:3333/api/read-2')
            .pipe(catchError((err) => of(err))),
        ])
      ),
      map(([r, r1, r2]) => ({ r, r1, r2 }))
    );
  }

  ngAfterViewInit() {
    // give time for initial login
    setTimeout(() => this.onReload(), 500);
  }

  onAuthorize() {
    this.authService.initLoginFlow(null, { prompt: 'none' });
  }

  onLogout() {
    this.authService.logOut();
  }

  onReload() {
    this.refresh$.next();
  }
}
