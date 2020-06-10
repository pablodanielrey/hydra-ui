import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivarQrComponent } from './activar-qr.component';

describe('ActivarQrComponent', () => {
  let component: ActivarQrComponent;
  let fixture: ComponentFixture<ActivarQrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivarQrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivarQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
