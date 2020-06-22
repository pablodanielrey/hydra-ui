import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentChallengeComponent } from './consent-challenge.component';

describe('ConsentChallengeComponent', () => {
  let component: ConsentChallengeComponent;
  let fixture: ComponentFixture<ConsentChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsentChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});