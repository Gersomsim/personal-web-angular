import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetToc } from './widget-toc';

describe('WidgetToc', () => {
  let component: WidgetToc;
  let fixture: ComponentFixture<WidgetToc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetToc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetToc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
