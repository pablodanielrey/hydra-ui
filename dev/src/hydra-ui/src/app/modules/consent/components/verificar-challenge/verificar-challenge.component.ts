import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { from, of, combineLatest } from 'rxjs';

@Component({
  selector: 'app-verificar-challenge',
  templateUrl: './verificar-challenge.component.html',
  styleUrls: ['./verificar-challenge.component.scss']
})
export class VerificarChallengeComponent implements OnInit, OnDestroy {
  
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

    let challenge$ = this.route.paramMap.pipe(map(params => params.get('challenge')));
    let accept$ = challenge$.pipe(switchMap(c => this.service.get_consent_challenge(c)));

    this.subs.push(accept$.subscribe(
      r => {
        let redirect_url = r['redirect_to'];
        this.document.location.href = redirect_url;
      },  
      e => {
        console.log(e);
      }
    ));
  }

}
