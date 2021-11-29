import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmDialogClientComponent} from './confirm-dialog-client.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogClientComponent;
  let fixture: ComponentFixture<ConfirmDialogClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDialogClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
