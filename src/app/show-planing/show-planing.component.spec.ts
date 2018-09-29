import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPlaningComponent } from './show-planing.component';

describe('ShowPlaningComponent', () => {
  let component: ShowPlaningComponent;
  let fixture: ComponentFixture<ShowPlaningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPlaningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPlaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
