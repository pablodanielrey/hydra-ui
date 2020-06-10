import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../shared/services/login.service';
import { of, Observable, combineLatest, BehaviorSubject, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { GeolocationService } from 'src/app/shared/services/geolocation.service';
import { HardwareService } from 'src/app/shared/services/hardware.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-ingresar-credenciales',
  templateUrl: './ingresar-credenciales.component.html',
  styleUrls: ['./ingresar-credenciales.component.scss']
})
export class IngresarCredencialesComponent implements OnInit, OnDestroy {

  ver_clave = false;
  accediendo = false;

  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  environment = environment;
  error: string = '';
  mostrar: boolean = true;
  credenciales: FormGroup;

  challenge$: Observable<string>;
  device_id$: Observable<string>;
  position$: Observable<Position>;

  login$: Observable<any>;

  constructor(private fb: FormBuilder, 
              private router:Router, 
              private route:ActivatedRoute,
              private service:LoginService,
              private hardware: HardwareService,
              @Inject(DOCUMENT) private document: any) {

    this.credenciales = fb.group({
      usuario: ['', [Validators.required, Validators.minLength(5), Validators.pattern("[a-zA-Z0-9]+")]],
      clave: ['', [Validators.required, Validators.minLength(8)]]
    })

    this.challenge$ = this.route.paramMap.pipe(map(params => params.get('challenge')));
    this.device_id$ = this.hardware.get_device_id();
  }

  ngOnInit() {
  }

  acceder() {

    if (!this.credenciales.valid) {
      console.log('formulario inválido');
      return;
    }

    this.subs.push(
      combineLatest(
        this.device_id$,
        this.challenge$,
        of({u: this.credenciales.value['usuario'], c: this.credenciales.value['clave']})
      ).pipe(
        switchMap(rs => {
          let did = rs[0];
          let challenge = rs[1];
          let creds = rs[2];
          this.accediendo = true;
          return this.service.login(creds.u, creds.c, did, challenge);
        })
      ).subscribe(r => {
        this.accediendo = false;
        console.log(r);
        let redirect_url = r['redirect_to'];
        this.document.location.href = redirect_url;
      }, e => {
        this.accediendo = false;
        let err = e.error;
        if (err.response['redirect_to'] != undefined) {
          let redirect_url = err.response['redirect_to'];
          this.document.location.href = redirect_url;
        } else {
          this.router.navigate(['/login/error']);
        }
      })
    );
  }

  login_hash() {
    this.subs.push(
      this.challenge$.subscribe(c => {
        this.router.navigate([`/login/qrcode/${c}`]);
      })
    )
  }

}
