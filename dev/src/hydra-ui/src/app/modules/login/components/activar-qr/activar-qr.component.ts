import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activar-qr',
  templateUrl: './activar-qr.component.html',
  styleUrls: ['./activar-qr.component.scss']
})
export class ActivarQrComponent implements OnInit, OnDestroy {

  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  constructor(private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.subs.push(
      this.route.paramMap.subscribe(params => {
        let code = params.get('code');
        this.router.navigate([`/login/qrcode/seleccionar-usuario/${code}`]);
      })
    );
  }

}
