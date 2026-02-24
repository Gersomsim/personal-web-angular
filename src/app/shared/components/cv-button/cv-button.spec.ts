import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvButton } from './cv-button';

describe('CvButton', () => {
  let component: CvButton;
  let fixture: ComponentFixture<CvButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
