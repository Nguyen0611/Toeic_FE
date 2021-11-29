import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {InforUsersComponent} from './infor-users.component';


describe('UserUpdateComponent', () => {
  let component: InforUsersComponent;
  let fixture: ComponentFixture<InforUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InforUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InforUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
