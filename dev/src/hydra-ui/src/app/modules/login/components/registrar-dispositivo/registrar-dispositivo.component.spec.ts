import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarDispositivoComponent } from './registrar-dispositivo.component';

describe('RegistrarDispositivoComponent', () => {
  let component: RegistrarDispositivoComponent;
  let fixture: ComponentFixture<RegistrarDispositivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarDispositivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarDispositivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
