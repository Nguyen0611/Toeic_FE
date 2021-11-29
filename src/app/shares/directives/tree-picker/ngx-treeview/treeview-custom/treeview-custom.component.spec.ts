import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeviewCustomComponent } from './treeview-custom.component';

describe('TreeviewCustomComponent', () => {
  let component: TreeviewCustomComponent;
  let fixture: ComponentFixture<TreeviewCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeviewCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeviewCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
