import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteSdutentComponent } from './note-sdutent.component';

describe('NoteSdutentComponent', () => {
  let component: NoteSdutentComponent;
  let fixture: ComponentFixture<NoteSdutentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteSdutentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteSdutentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
