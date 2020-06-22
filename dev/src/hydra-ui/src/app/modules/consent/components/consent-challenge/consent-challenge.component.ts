import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { from, of, combineLatest, throwError } from 'rxjs';

@Component({
  selector: 'app-consent-challenge',
  templateUrl: './consent-challenge.component.html',
  styleUrls: ['./consent-challenge.component.scss']
})
export class ConsentChallengeComponent implements OnInit, OnDestroy {
  
  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  mensaje : string = '';

  constructor(private service:LoginService, 
              private router:Router,
              private route:ActivatedRoute,
              @Inject(DOCUMENT) private document: any) { 
            
  }

  ngOnInit() {

    let accept$ = this.route.paramMap.pipe(
      map(params => params.get('challenge')),
      switchMap(c => this.service.get_consent_challenge(c)),
      map(r => {
        if (r.status != 200) {
          throwError('Error verificadno el challenge del consent');
        }
        return r.response;
      })
    );

    this.subs.push(accept$.subscribe(
      r => {
        let redirect_url = r['redirect_to'];
        this.document.location.href = redirect_url;
      },  
      e => {
        throwError(e);
      }
    ));
  }

}
