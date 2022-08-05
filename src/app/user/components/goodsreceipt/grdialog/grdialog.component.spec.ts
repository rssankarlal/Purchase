import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrdialogComponent } from './grdialog.component';

describe('GrdialogComponent', () => {
  let component: GrdialogComponent;
  let fixture: ComponentFixture<GrdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
