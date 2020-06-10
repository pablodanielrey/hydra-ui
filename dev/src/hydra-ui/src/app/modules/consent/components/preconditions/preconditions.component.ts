import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-preconditions',
  templateUrl: './preconditions.component.html',
  styleUrls: ['./preconditions.component.scss']
})
export class PreconditionsComponent implements OnInit {
  
  private subs = [];

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  challenge$: Observable<string>;

  constructor(private router: Router,
              private route: ActivatedRoute) { 
  
    this.challenge$ = this.route.paramMap.pipe(map(params => params.get('challenge')));
  }

  ngOnInit(): void {

    this.subs.push(this.challenge$.subscribe(
      challenge => {
        // por ahora la única precondición que existe es analizar el correo alternativo
        this.router.navigate([`/email/analize/${challenge}`]);
      },
      e => {
        console.log(e);
      }
    ));

  }

}
