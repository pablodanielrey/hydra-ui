import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss']
})
export class ConsentComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  constructor(private route:ActivatedRoute,
              private router:Router) { 
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  ngOnInit() {
    this.subs.push(this.route.queryParamMap.subscribe(p => {
      let challenge = p.get('consent_challenge');
      if (challenge) {
        this.router.navigate([`/consent/verify/${challenge}`]).then(v => console.log('navegación existosa'));
      }
    }));
  }

}