import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterDemandesStudentComponent } from './consulter-demandes-student.component';

describe('ConsulterDemandesStudentComponent', () => {
  let component: ConsulterDemandesStudentComponent;
  let fixture: ComponentFixture<ConsulterDemandesStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsulterDemandesStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsulterDemandesStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
