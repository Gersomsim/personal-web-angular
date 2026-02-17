import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetNewsLetter } from './widget-news-letter';

describe('WidgetNewsLetter', () => {
  let component: WidgetNewsLetter;
  let fixture: ComponentFixture<WidgetNewsLetter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetNewsLetter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetNewsLetter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
