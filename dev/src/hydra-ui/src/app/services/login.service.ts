import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable, of, combineLatest } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

export interface Response {
  status:number,
  response:any
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private api : string;

  constructor(private http: HttpClient) { 
    this.api = environment.hydraApiUrl;
  }

  get_login_challenge(device_hash:string, challenge:string): Observable<any> {
    let did = {'device_hash':device_hash};
    let url = `${this.url}/challenge/${challenge}`;
    return this.http.post<Response>(url, did).pipe(
      map(r => r.response)
    );
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

  login_hash(qr:string, hash:string, device_id:string): Observable<Response> {
    let url = `${this.url}/login_qrcode/${qr}`;

    return this.geolocation.get_geolocation().pipe(
      switchMap(pos => {
        let data = {
          hash: hash,
          device_id: device_id,
          position: null
        }

        if (pos != null) {
          data['position'] = {
            accuracy: pos.coords.accuracy, 
            latitude: pos.coords.latitude, 
            longitude: pos.coords.longitude 
          };
        }

        return this.http.post<Response>(url, data).pipe(
          map(r => r.response)
        );
      })
    );
    
  }


  login(usuario:string, clave:string, device_id:string, challenge:string): Observable<Response> {
    let url = `${this.url}/login`;

    let data = {
      user: usuario,
      password: clave,
      challenge: challenge
    }
    return this.http.post<Response>(url, data).pipe(
      /*
      catchError((err:HttpErrorResponse) => {
        let r:Response = err.error;
        return of(r);
      }),*/
      map(r => {
        let resp = r.response;
        // almacena el hash en localstore.
        let h = resp['hash'];
        if (h != null) {
          let _hs = [];
          _hs.push({user:usuario, hash:h});
          this._set_users_hashes(_hs);
        }
        return resp;
      })

    );
  }


  login_anterior(usuario:string, clave:string, device_id:string, challenge:string): Observable<Response> {
    let url = `${this.url}/login`;

    return this.geolocation.get_geolocation().pipe(
      switchMap(pos => {

        let data = {
          user: usuario,
          password: clave,
          challenge: challenge,
          device_id: device_id,
          position: null
        }
    
        if (pos != null) {
          data['position'] = {
            accuracy: pos.coords.accuracy, 
            latitude: pos.coords.latitude, 
            longitude: pos.coords.longitude 
          };
        }

        return this.http.post<Response>(url, data).pipe(
          /*
          catchError((err:HttpErrorResponse) => {
            let r:Response = err.error;
            return of(r);
          }),*/
          map(r => {
            let resp = r.response;
            // almacena el hash en localstore.
            let h = resp['hash'];
            if (h != null) {
              let _hs = [];
              _hs.push({user:usuario, hash:h});
              this._set_users_hashes(_hs);
            }
            return resp;
          })
        )
      })
    );
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
    return this.http.get<Response>(url).pipe(
      map(r => r.response),
      tap(v => console.log(v))
    );
  }
  
}
