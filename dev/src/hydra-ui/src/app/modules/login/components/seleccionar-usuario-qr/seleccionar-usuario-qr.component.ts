import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import { Observable, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

interface hash {
  user: string,
  hash: string
}

@Component({
  selector: 'app-seleccionar-usuario-qr',
  templateUrl: './seleccionar-usuario-qr.component.html',
  styleUrls: ['./seleccionar-usuario-qr.component.scss']
})
export class SeleccionarUsuarioQrComponent implements OnInit, OnDestroy {

  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }


  hashes$ : Observable<hash[]>;
  code$: Observable<string>;

  constructor(private service:LoginService, 
              private router: Router, 
              private route: ActivatedRoute) { 

  
    this.hashes$ = of(service._get_users_hashes());
    this.code$ = this.route.paramMap.pipe(map(params => params.get('code')));
  }

  seleccionar() {
    this.subs.push(
      combineLatest(this.code$, this.hashes$).subscribe(rs => {
        let code = rs[0];
        let hash = rs[1][0];
        this.router.navigate([`/login/qrcode/activar/${hash.user}/${code}`]);
      })
    );
    
  }

  ngOnInit() {
    this.seleccionar();
  }

}
