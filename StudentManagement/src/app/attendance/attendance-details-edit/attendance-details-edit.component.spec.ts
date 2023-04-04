import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceDetailsEditComponent } from './attendance-details-edit.component';

describe('AttendanceDetailsEditComponent', () => {
  let component: AttendanceDetailsEditComponent;
  let fixture: ComponentFixture<AttendanceDetailsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceDetailsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
