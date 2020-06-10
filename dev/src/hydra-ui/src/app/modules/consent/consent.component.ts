import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss']
})
export class ConsentComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private router:Router) { 

  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(p => {
      let challenge = p.get('consent_challenge');
      if (challenge) {
        //this.router.navigate([`/consent/verificar/${challenge}`]);
        // es necesario que tengan el mail alternativo confirmado.
        this.router.navigate([`/email/analize/${challenge}`]);
      }
    })
  }

}
