import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalDirectiveComponent } from './conditional-directive.component';

describe('ConditionalDirectiveComponent', () => {
  let component: ConditionalDirectiveComponent;
  let fixture: ComponentFixture<ConditionalDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConditionalDirectiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionalDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
