import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimengExtraComponent } from './primeng-extra.component';

describe('PrimengExtraComponent', () => {
  let component: PrimengExtraComponent;
  let fixture: ComponentFixture<PrimengExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimengExtraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimengExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
