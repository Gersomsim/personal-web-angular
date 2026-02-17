import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetCategories } from './widget-categories';

describe('WidgetCategories', () => {
  let component: WidgetCategories;
  let fixture: ComponentFixture<WidgetCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetCategories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetCategories);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
