import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of, Observable, combineLatest, throwError } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
              private http:HttpClient,
              @Inject(DOCUMENT) private document: any) { 

    /*
    this.device_hash$ = this.hardware.get_device_id();
    this.challenge$ = this.route.paramMap.pipe(map(params => params.get('challenge')));
    this.login_challenge$ = combineLatest(
      this.challenge$,
      this.device_hash$
    ).pipe(
      switchMap(rs => {
        let challenge = rs[0];
        let did = rs[1];
        return this.service.get_login_challenge(did, challenge);
      })
    )
    */

    this.login_challenge$ = this.route.paramMap.pipe(
      map(params => params.get('challenge')),
      switchMap(challenge => this.service.get_login_challenge(null, challenge))
    )
  }

  
        /*
        map(r => { 
          if(r.status == 409) {
            // challenge ya usado
            throwError(' ya usado');
          }
          if (r.status == 404) {
            throwError('Challenge no válido');
          }
          if (r.status == 500) {
            throwError('Error interno procesando el challenge de login')
          }
          return r.response;
        })*/


  ngOnInit() {
    this.mensaje = 'Verificando Dispositivo';
    this.subs.push(
      this.login_challenge$.pipe(
        catchError(err => {
          if (err.status == 0) {
            err.error = 'Servidor no accesible';
          }
          throw err;
        })
      ).subscribe(c => {
        this.mensaje = 'Analizando Requerimiento';
        if (c['skip']) {
          // se aceptó el challenge implicitamente, hay que saltar todo el paso de login.
          let redirect_url = c['redirect_to'];
          this.document.location.href = redirect_url;
        } else {
          // el usuario tiene que loguearse.
          let challenge = c['challenge'];
          this.router.navigate([`/login/login/${challenge}`]);
        }
      },
      e => {
        console.log(e);
        let message = e.error;
        this.router.navigate([`/login/error/${message}`]).then(v => console.log('navegación exitosa'));

        /*
        let err = e.error;
        if (err.response['redirect_to'] != undefined) {
          let redirect_url = err.response['redirect_to'];
          this.document.location.href = redirect_url;
        } else {
          this.router.navigate([`/login/error/]);
        }
        */
      }
     )
    )
  }

}
