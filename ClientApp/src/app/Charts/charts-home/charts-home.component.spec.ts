import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsHomeComponent } from './charts-home.component';

describe('ChartsHomeComponent', () => {
  let component: ChartsHomeComponent;
  let fixture: ComponentFixture<ChartsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
