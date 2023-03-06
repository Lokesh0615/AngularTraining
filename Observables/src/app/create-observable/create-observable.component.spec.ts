import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateObservableComponent } from './create-observable.component';

describe('CreateObservableComponent', () => {
  let component: CreateObservableComponent;
  let fixture: ComponentFixture<CreateObservableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateObservableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateObservableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
