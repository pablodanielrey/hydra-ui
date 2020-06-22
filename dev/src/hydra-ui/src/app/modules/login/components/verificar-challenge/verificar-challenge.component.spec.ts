import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarChallengeComponent } from './verificar-challenge.component';

describe('VerificarChallengeComponent', () => {
  let component: VerificarChallengeComponent;
  let fixture: ComponentFixture<VerificarChallengeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificarChallengeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificarChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
