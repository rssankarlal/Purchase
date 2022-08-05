import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierdialogComponent } from './supplierdialog.component';

describe('SupplierdialogComponent', () => {
  let component: SupplierdialogComponent;
  let fixture: ComponentFixture<SupplierdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
