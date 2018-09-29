import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlaningComponent } from './create-planing.component';

describe('CreatePlaningComponent', () => {
  let component: CreatePlaningComponent;
  let fixture: ComponentFixture<CreatePlaningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePlaningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePlaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
