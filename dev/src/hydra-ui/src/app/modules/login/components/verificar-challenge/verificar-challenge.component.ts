import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-verificar-challenge',
  templateUrl: './verificar-challenge.component.html',
  styleUrls: ['./verificar-challenge.component.scss']
})
export class VerificarChallengeComponent implements OnInit, OnDestroy {

  version = environment.version;
  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  mensaje : string = '';

  device_hash$: Observable<string>;
  challenge$: Observable<string>;
  login_challenge$: Observable<any>;

  constructor(private service:LoginService,
              private router:Router, 
              private route:ActivatedRoute,
              @Inject(DOCUMENT) private document: any) { 

    this.login_challenge$ = this.route.paramMap.pipe(
      map(params => params.get('challenge')),
      switchMap(challenge => this.service.get_login_challenge(null, challenge))
    )
  }


  handleError(error, c): Observable<any> {
    console.log(error);
    error.message = error.name + ': ' + error.message;
    throw error;
  }

  ngOnInit() {
    this.mensaje = 'Verificando Dispositivo';
    this.subs.push(
      this.login_challenge$.pipe(
        catchError(this.handleError)
      ).subscribe(r => {
        this.mensaje = 'Analizando Requerimiento';
        let c = r.response;
        try {
          if (c['skip']) {
            // se aceptó el challenge implicitamente, hay que saltar todo el paso de login.
            let redirect_url = c['redirect_to'];
            this.document.location.href = redirect_url;
          } else {
            // el usuario tiene que loguearse.
            let challenge = c['challenge'];
            this.router.navigate([`/login/login/${challenge}`]);
          }
        } catch(e) {
          console.log(e);
          let message = 'Formato de retorno incorrecto';
          this.router.navigate([`/error/${message}`]).then(v => console.log('navegación exitosa'));
        }
      },
      e => {
        let message = e.message;
        this.router.navigate([`/error/${message}`]);
      })
    )
  }

}
