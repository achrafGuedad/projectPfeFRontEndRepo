import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemanderPapierComponent } from './demander-papier.component';

describe('DemanderPapierComponent', () => {
  let component: DemanderPapierComponent;
  let fixture: ComponentFixture<DemanderPapierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemanderPapierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemanderPapierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
