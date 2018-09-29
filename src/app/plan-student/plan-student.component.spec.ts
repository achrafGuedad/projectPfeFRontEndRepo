import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanStudentComponent } from './plan-student.component';

describe('PlanStudentComponent', () => {
  let component: PlanStudentComponent;
  let fixture: ComponentFixture<PlanStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
