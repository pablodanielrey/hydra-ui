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

  get_login_challenge(device_hash:string, challenge:string): Observable<any> {
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
    
    //let herror = new HttpErrorResponse({ error: 'migue ve gente rota en youtube', status: 503 });
    //throw herror;
    //throw(Error('Algo'));
    let ret409 = new HttpErrorResponse({ error:'Id ya usado', status: 409 })
    let ret404 = new HttpErrorResponse({ error:'Id no encontrado', status: 404 })
    //throw(ret409);
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

  login(usuario:string, clave:string, device_id:string, challenge:string): Observable<Response> {
    let correcto : Response = {
      status: 200,
      response: {
        'hash': 'unhashloco',
        'redirect_to': 'http://localhost:9000/personas/alta'
      }
    }
    let error401 : Response = {
      status: 201,
      response: {
        'redirect_to': 'http://localhost:9000'
      }
    }
    let ret400 = new HttpErrorResponse({ error:'Formato de datos erróneo', status: 400 })
    let ret404 = new HttpErrorResponse({ error:'Id no encontrado', status: 404 })
    let ret409 = new HttpErrorResponse({ error:'Id ya usado', status: 409 })
    let ret503 = new HttpErrorResponse({ error:'Usuario o Contraseña incorrecta', status: 503 })
    let ret503Interno = new HttpErrorResponse({ error:'Interno de validación', status: 503 })
    let ret500 = new HttpErrorResponse({ error:'Interno del servidor', status: 500 })
    //throw(ret503Interno);
    return of(correcto);
  }

  get_consent_challenge(challenge:string): Observable<any> {
    let correcto : Response = {
      status: 200,
      response: {
        'redirect_to': 'http://localhost:9000/personas/alta',
        'skip': true,
        'scopes': 'algo',
        'audience': 'algo',
        'subject': 'algo',
      }
    }
    let ret400 = new HttpErrorResponse({ error:'Formato de datos erróneo', status: 400 })
    let ret404 = new HttpErrorResponse({ error:'Id no encontrado', status: 404 })
    let ret409 = new HttpErrorResponse({ error:'Id ya usado', status: 409 })
    let ret503Interno = new HttpErrorResponse({ error:'Interno de validación', status: 503 })
    let ret500 = new HttpErrorResponse({ error:'Interno del servidor', status: 500 })
    //throw(ret503Interno);
    return of(correcto);
  }
  
}
