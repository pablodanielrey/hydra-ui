import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarDispositivoComponent } from './verificar-dispositivo.component';

describe('VerificarDispositivoComponent', () => {
  let component: VerificarDispositivoComponent;
  let fixture: ComponentFixture<VerificarDispositivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificarDispositivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificarDispositivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
