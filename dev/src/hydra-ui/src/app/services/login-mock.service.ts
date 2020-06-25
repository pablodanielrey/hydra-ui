import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export interface Response {
  status:number,
  response:any
}

@Injectable({
  providedIn: 'root'
})
export class LoginMockService {

  constructor() { }

  // ---------> Error en el challenge 
  // Response('Id ya usado', status=409) 
  // Response('Id no encontrado', status=404) 
  // ---------> Challenge valido y esta en skip
  // Response(
  //      status: <CODIGO> ----> 409 - 404,
  //      response: {'challenge': data['challenge'],
  //                'skip': True,
  //                'redirect_to': redirect
  //      }
  //  )
  // ---------> Challenge valido y no esta en skip
  // Response(
  //      status: 200,
  //      response: {'challenge': data['challenge'],
  //                'skip': False,
  //      }
  //  )
  //
  
  get_login_challenge(device_hash:string, challenge:string): Observable<any> {
    //let herror = new HttpErrorResponse({ error: 'migue ve gente rota en youtube', status: 503 });
    //throw herror;
    
    let ret409 : Response = {
      status: 409,
      response: 'Id ya usado'
    }
    let ret404 : Response = {
      status: 404,
      response: 'Id no encontrado'
    }
    let ret200noSkip : Response = {
      status: 200,
      response: {
        'skip': false,
        'challenge': challenge
      }
    }
    let ret200Skip : Response = {
      status: 200,
      response: {
        'skip': true,
        'challenge': challenge,
        'redirect_to': 'http://google.com'
      }
    }
    return of(ret200noSkip);
  }

  /*
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
                'redirect_to': e.error.message
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
  */
}
