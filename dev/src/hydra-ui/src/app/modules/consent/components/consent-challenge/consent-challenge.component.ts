import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { LoginMockService } from 'src/app/services/login-mock.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-consent-challenge',
  templateUrl: './consent-challenge.component.html',
  styleUrls: ['./consent-challenge.component.scss']
})
export class ConsentChallengeComponent implements OnInit, OnDestroy {
  
  private accediendo: boolean = false;
  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  mensaje: string = '';
  challenge$: Observable<string>;

  constructor(private service:LoginMockService, 
              private router:Router,
              private route:ActivatedRoute,
              @Inject(DOCUMENT) private document: any) { 

    this.challenge$ = route.paramMap.pipe(
      map(params => params.get('challenge')),
      tap(v => console.log(v)),
      map(challenge => {
        if (challenge == null) {
          throw 'Id inválido';
        }
        return challenge;
      })
    );
  }

  ngOnInit() {
    let accept$ = this.challenge$.pipe(
      tap(_ => this.accediendo = true),
      switchMap(c => this.service.get_consent_challenge(c)),
      tap(_ => this.accediendo = false)
    );
    this.subs.push(accept$.subscribe(r => {
      let c = r.response;
      let redirect_url = c['redirect_to'];
      this.document.location.href = redirect_url;
    }));
  }
}
