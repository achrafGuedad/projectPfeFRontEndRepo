import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinscriptionComponent } from './reinscription.component';

describe('ReinscriptionComponent', () => {
  let component: ReinscriptionComponent;
  let fixture: ComponentFixture<ReinscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReinscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReinscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
