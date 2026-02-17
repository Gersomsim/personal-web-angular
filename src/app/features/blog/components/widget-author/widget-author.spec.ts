import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetAuthor } from './widget-author';

describe('WidgetAuthor', () => {
  let component: WidgetAuthor;
  let fixture: ComponentFixture<WidgetAuthor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetAuthor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetAuthor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
