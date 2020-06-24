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

  qrCode: String;
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
    this.qrCode$.subscribe(c => this.qrCode = c);
  }

}