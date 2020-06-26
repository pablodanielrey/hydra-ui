import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Response {
  status:number,
  response:any
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url : string;

  constructor(private http: HttpClient) { 
    this.url = environment.loginApiUrl;
  }

  get_login_challenge(device_hash:string, challenge:string): Observable<any> {
    let did = {'device_hash':device_hash};
    let url = `${this.url}/challenge/${challenge}`;
    return this.http.post<Response>(url, did);
  }

  login(usuario:string, clave:string, device_id:string, challenge:string): Observable<Response> {
    let url = `${this.url}/login`;
    let data = {
      user: usuario,
      password: clave,
      challenge: challenge,
      device_id: device_id,
      position: null
    }
    return this.http.post<Response>(url, data).pipe(
      catchError(e  => {
        if (e instanceof HttpErrorResponse) {
          if (e.status == 401) {
            let r : Response = {
              status: 201,
              response: {
                'redirect_to': e.error
              }
            };
            return of(r);
          }
        }
        throw e;
      })
    )
  }

  get_consent_challenge(challenge:string): Observable<any> {
    let url = `${this.url}/consent/${challenge}`;
    return this.http.get<Response>(url);
  }
  
}
