import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface ErrorInterno {
  message: string,
  data: any
}

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  version: String;
  error$: Observable<any>;
  message$: Observable<String>;
  data$: Observable<String>;

  constructor(private route:ActivatedRoute) {
    this.version = environment.version;

    this.error$ = route.paramMap.pipe(
      map(params => params.get('message')),
      map(error => {
        if (error == null) {
          let res : ErrorInterno = {
            message: 'Error de navegación.',
            data: this._add_hardware_data('El usuario navegó o fue redirigido a la pantalla de error sin los paremetros correspondientes.')
          }
          return res
        };
        let tmp = JSON.parse(atob(error));
        let res : ErrorInterno = {
          message: tmp.message,
          data: this._add_hardware_data(tmp.data)
        };
        return res;
      })
    );

    this.message$ = this.error$.pipe(
      map(e => e.message)
    )

    this.data$ = this.error$.pipe(
      map(e => e.data)
    );
  }

  ngOnInit() { }

  _add_hardware_data(message) {
    let n = window.navigator;
    let data = {
      'message': message,
      'login_version': this.version,
      'platform': n.platform,
      'user_agent': n.userAgent,
      'app_name': n.appName,
      'code_name': n.appCodeName,
      'product': n.product,
      'app_version': n.appVersion,
      'language': n.language,
      'on_line': n.onLine
    }
    return data;
  }

}