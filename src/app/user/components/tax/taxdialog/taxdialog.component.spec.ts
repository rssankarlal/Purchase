import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxdialogComponent } from './taxdialog.component';

describe('TaxdialogComponent', () => {
  let component: TaxdialogComponent;
  let fixture: ComponentFixture<TaxdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
