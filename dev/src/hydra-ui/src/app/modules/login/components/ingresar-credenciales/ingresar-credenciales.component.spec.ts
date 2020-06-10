import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarCredencialesComponent } from './ingresar-credenciales.component';

describe('IngresarCredencialesComponent', () => {
  let component: IngresarCredencialesComponent;
  let fixture: ComponentFixture<IngresarCredencialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresarCredencialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarCredencialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
