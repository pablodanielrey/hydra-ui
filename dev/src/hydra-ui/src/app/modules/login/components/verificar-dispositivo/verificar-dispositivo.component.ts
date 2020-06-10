import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { of, Observable, combineLatest } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { HardwareService } from 'src/app/shared/services/hardware.service';

@Component({
  selector: 'app-verificar-dispositivo',
  templateUrl: './verificar-dispositivo.component.html',
  styleUrls: ['./verificar-dispositivo.component.scss']
})
export class VerificarDispositivoComponent implements OnInit, OnDestroy {

  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  mensaje : string = '';

  device_hash$: Observable<string>;
  challenge$: Observable<string>;
  login_challenge$: Observable<any>;

  constructor(private service:LoginService,
              private hardware:HardwareService,
              private router:Router, 
              private route:ActivatedRoute,
              @Inject(DOCUMENT) private document: any) { 

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

  }
  
  ngOnInit() {
    this.mensaje = 'Verificando Dispositivo';
    this.subs.push(
      this.login_challenge$.subscribe(c => {
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
        let err = e.error;
        if (err.response['redirect_to'] != undefined) {
          let redirect_url = err.response['redirect_to'];
          this.document.location.href = redirect_url;
        } else {
          this.router.navigate(['/login/error']);
        }
      }
     )
    )
  }

}
