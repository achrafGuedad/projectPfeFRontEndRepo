import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceetudiantComponent } from './espaceetudiant.component';

describe('EspaceetudiantComponent', () => {
  let component: EspaceetudiantComponent;
  let fixture: ComponentFixture<EspaceetudiantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspaceetudiantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceetudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
