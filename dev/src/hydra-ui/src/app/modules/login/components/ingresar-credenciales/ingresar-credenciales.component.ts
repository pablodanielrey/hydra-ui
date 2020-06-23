import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { of, Observable, combineLatest } from 'rxjs';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';


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
              @Inject(DOCUMENT) private document: any) {

    this.credenciales = fb.group({
      usuario: ['', [Validators.required, Validators.minLength(5), Validators.pattern("[a-zA-Z0-9]+")]],
      clave: ['', [Validators.required, Validators.minLength(5)]]
    })

    this.challenge$ = this.route.paramMap.pipe(map(params => params.get('challenge')));
  }

  ngOnInit() {
  }


  handleError(error, c): Observable<any> {
    console.log(error);
    error.message = error.name + ': ' + error.message;
    throw error;
  }

  acceder() {

    if (!this.credenciales.valid) {
      console.log('formulario inválido');
      return;
    }

    this.subs.push(combineLatest(
      this.challenge$,
      of({u: this.credenciales.value['usuario'], c: this.credenciales.value['clave']})
    ).pipe(
      tap(_ => this.accediendo = true),
      switchMap(rs => {
        let challenge = rs[0];
        let creds = rs[1];
        return this.service.login(creds.u, creds.c, null, challenge);
      }),
      tap(_ => this.accediendo = false),
      catchError(this.handleError)
    ).subscribe(r => {
      let c = r.response;
      let redirect_url = c['redirect_to'];
      this.document.location.href = redirect_url;
    }, e => {
      let message = e.message;
      this.router.navigate([`/error/${message}`]);
    }));

  }
}
