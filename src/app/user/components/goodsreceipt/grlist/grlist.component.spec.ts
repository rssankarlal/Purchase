import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrlistComponent } from './grlist.component';

describe('GrlistComponent', () => {
  let component: GrlistComponent;
  let fixture: ComponentFixture<GrlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
