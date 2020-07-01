import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

interface ErrorInterno {
    message: string,
    data: any
}

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector,
        private router: Router) { }

    handleError(error: Error | HttpErrorResponse) {
        let message = '';
        let data = '';
        if (error instanceof HttpErrorResponse) {
            console.log(error);
            if (error.status == 0) {
                message = 'Servidor no accesible';
            } else {
                message = error.error;
            }
            data = 'Error Name: ' + error.name + ' Status: ' + error.status + ' Error: ' + error.error + ' StatusText: ' + error.statusText + ' URL: ' + error.url;
        } else {
            message = error.message;
            data = 'Error Name: ' + error.name + ' Message: ' + error.message;
        }        
        let r: ErrorInterno = {
            message: message,
            data: data
        }
        let base64error = btoa(JSON.stringify(r));
        this.router.navigate([`/error/${base64error}`]);
    }
}