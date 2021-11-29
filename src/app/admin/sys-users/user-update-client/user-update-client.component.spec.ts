import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {UserUpdateClientComponent} from './user-update-client.component';


describe('UserUpdateComponent', () => {
  let component: UserUpdateClientComponent;
  let fixture: ComponentFixture<UserUpdateClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserUpdateClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpdateClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
