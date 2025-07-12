import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageShow } from './percentage-show';

describe('PercentageShow', () => {
  let component: PercentageShow;
  let fixture: ComponentFixture<PercentageShow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PercentageShow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PercentageShow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
