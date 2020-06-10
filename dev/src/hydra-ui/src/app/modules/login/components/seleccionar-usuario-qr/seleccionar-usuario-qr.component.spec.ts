import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarUsuarioQrComponent } from './seleccionar-usuario-qr.component';

describe('SeleccionarUsuarioQrComponent', () => {
  let component: SeleccionarUsuarioQrComponent;
  let fixture: ComponentFixture<SeleccionarUsuarioQrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarUsuarioQrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarUsuarioQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
