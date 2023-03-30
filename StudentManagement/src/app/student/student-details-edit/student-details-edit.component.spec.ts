import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDetailsEditComponent } from './student-details-edit.component';

describe('StudentDetailsEditComponent', () => {
  let component: StudentDetailsEditComponent;
  let fixture: ComponentFixture<StudentDetailsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDetailsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
