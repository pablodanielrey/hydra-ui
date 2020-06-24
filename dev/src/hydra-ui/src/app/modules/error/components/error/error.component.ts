import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  errorData: any;
  version: String;
  message$: Observable<String>;
  qrCode$: Observable<String>;

  constructor(private route:ActivatedRoute) {
    this.version = environment.version;
    this.message$ = route.paramMap.pipe(
      map(params => params.get('message')),
      map(message => (message == null) ? '' : message)      
    )
    this.qrCode$ = this.message$.pipe(
      map(m => m)
    );
  }

  ngOnInit() {
    this.qrCode$.subscribe(c => this.errorData = this._add_hardware_data(c));
  }

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