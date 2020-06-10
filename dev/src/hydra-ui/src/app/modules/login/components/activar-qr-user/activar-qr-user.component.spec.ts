import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivarQrUserComponent } from './activar-qr-user.component';

describe('ActivarQrUserComponent', () => {
  let component: ActivarQrUserComponent;
  let fixture: ComponentFixture<ActivarQrUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivarQrUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivarQrUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
