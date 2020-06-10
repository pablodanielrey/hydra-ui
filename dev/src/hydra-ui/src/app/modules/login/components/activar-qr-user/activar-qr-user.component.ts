import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable, combineLatest, throwError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HardwareService } from 'src/app/shared/services/hardware.service';

@Component({
  selector: 'app-activar-qr-user',
  templateUrl: './activar-qr-user.component.html',
  styleUrls: ['./activar-qr-user.component.scss']
})
export class ActivarQrUserComponent implements OnInit, OnDestroy {

  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  error: string;
  device: string;
  code$: Observable<string>;
  hash: string;
  
  constructor(private service:LoginService, 
              private hardware:HardwareService,
              private route: ActivatedRoute) { 
    this.code$ = this.obtener_codigo();
  }

  obtener_codigo() {
    return this.route.paramMap.pipe(map(params => params.get('code')));
  }

  obtener_hash() {
    return this.route.paramMap.pipe(
      map(params => params.get('user')),
      tap(h => console.log(h)),
      switchMap(user => this.service.get_user_hash(user)),
      tap(h => this.hash = h),
      tap(h => console.log(h))
    );
  }

  obtener_device() {
    return this.hardware.get_device_id().pipe(tap(h => this.device = h));
  }

  activar() {
    this.subs.push(
      combineLatest(this.code$, 
                    this.obtener_device(),
                    this.obtener_hash()).pipe(
        switchMap(rs => {
          let code = rs[0];
          let did = rs[1];
          let hash_ = rs[2];
          if (code == null || did == null || hash_ == null) {
            throwError('Parámetros faltantes');
            return of(null);
          }
          return this.service.login_hash(code, hash_, did);
        })
      ).subscribe(r => {
        console.log(r);
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          let e = <HttpErrorResponse>err;
          // ver que hago.
          this.error = e.message;
        }
      })
    );
  }

  ngOnInit() {
  }

}
