import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { Observable, timer, combineLatest, of, throwError } from 'rxjs';
import { map, switchMap, tap, catchError, retryWhen, delay, concatMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT, Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { Response } from '../../../shared/services/login.service';

import { environment } from '../../../../environments/environment';
import { HardwareService } from 'src/app/shared/services/hardware.service';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.component.html',
  styleUrls: ['./generar-qr.component.scss']
})
export class GenerarQrComponent implements OnInit, OnDestroy {

  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  error:string = '';
  url_to_redirect: string =  environment.url_to_activate_qr;
  challenge$: Observable<string>;
  device_hash$: Observable<string>;
  qr: any;

  constructor(private service:LoginService,
              private hardware:HardwareService,
              private router: Router,
              private route:ActivatedRoute,
              private location: Location,
              @Inject(DOCUMENT) private document: any) { 

    this.challenge$ = route.paramMap.pipe(map(params => params.get('challenge')));
    this.device_hash$ = hardware.get_device_id();
  }

  obtener_qr_code(device_hash$:Observable<string>, challenge$:Observable<string>):Observable<any> {
    return combineLatest(device_hash$, challenge$).pipe(
      switchMap(res => {
        let did = res[0];
        let challenge = res[1];
        return this.service.get_qr_code(this.url_to_redirect, did, challenge);
      }),
      tap(qr => this.qr = qr)
    );
  }

  reintentar_cuando(code:number) {
    return retryWhen(errs => errs.pipe(
      concatMap((err,i) => {
        /*
          Errores posibles:
          304 --> (Not Modified) - qr pendiente -- solo en este tengo que seguir consultando
          404 --> (Not Found) - qr no existente (faltal)
          410 --> (Gone) - qr ya usado (fatal)
        */
        if (err instanceof HttpErrorResponse) {
          let e = <HttpErrorResponse>err;
          if (e.status == code) {
            return of(err).pipe(
              delay(1000)
            );
          }
        }
        return throwError(err);
      })
    ));
  }

  esperar_aceptacion_y_obtener_url(qr$:Observable<any>): Observable<string> | Observable<null> {
    let retry$ = this.reintentar_cuando(304);
    return qr$.pipe(
      switchMap(qr => {
        return this.service.get_qr_redirection(qr.code).pipe(
          retry$,
          map(r => r['redirect_to'])
        )
      })
    )
  }

  generar_codigo_qr() {
    this.subs.forEach(s => s.unsubscribe());
    let qr$ = this.obtener_qr_code(this.device_hash$, this.challenge$);
    this.subs.push(
      this.esperar_aceptacion_y_obtener_url(qr$).subscribe(redir => {
        console.log(redir);
        if (redir != null) {
          this.document.location.href = redir;
        }
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          let e = <HttpErrorResponse>err;
          if (e.status == 410) {
            /*
              El qr pertenece a un challenge que ya fue aceptado en hydra. hay que regenerar todo le challenge.
              el redirect retornado es la petición que dió origen a todo el procesamiento.
            */
            let server_response = e.error.response;
            this.document.location.href = server_response['redirect_to'];
          }
        }
        console.log(err);
        // en cualquier caso los errores que llegan hasta aca son fatales.
        this.router.navigate(['/login/error']);
      })
    );
  }

  ngOnInit() {
    this.generar_codigo_qr();
  }

}
