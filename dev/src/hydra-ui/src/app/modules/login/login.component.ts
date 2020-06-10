import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  constructor(private route: ActivatedRoute, 
              private router: Router) { 

  }

  ngOnInit() {
    this.subs.push(this.route.queryParamMap.subscribe(p => {
      let challenge = p.get('login_challenge');
      if (challenge) {
        this.router.navigate([`/login/verificar/${challenge}`]);
      }
    }))
  }
}
