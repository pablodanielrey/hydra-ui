import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';

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

  get_user_hash(user:string): Observable<string> {
    let hs = this._get_users_hashes();
    for (let i = 0; i < hs.length; i++) {
      let o = hs[i];
      if (o.user == user) {
        return of(o.hash);
      }
    }
    return of(null);
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
    return this.http.post<Response>(url, data);
      /*
      catchError((err:HttpErrorResponse) => {
        let r:Response = err.error;
        return of(r);
      }),*/
      /*
      map(r => {
        let resp = r.response;
        // almacena el hash en localstore.
        let h = resp['hash'];
        if (h != null) {
          let _hs = [];
          _hs.push({user:usuario, hash:h});
          this._set_users_hashes(_hs);
        }
        return r;
      })
      */
  }

  _set_users_hashes(hs:any[]) {
    let h = JSON.stringify(hs);
    localStorage.setItem('users_hashes',h);
  }

  _get_users_hashes() {
    let hs = localStorage.getItem('users_hashes')
    if (hs == null) {
      return [];
    }
    return JSON.parse(hs);
  }

  get_consent_challenge(challenge:string): Observable<any> {
    let url = `${this.url}/consent/${challenge}`;
    return this.http.get<Response>(url);
  }
  
}
