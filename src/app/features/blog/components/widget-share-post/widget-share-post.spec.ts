import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetSharePost } from './widget-share-post';

describe('WidgetSharePost', () => {
  let component: WidgetSharePost;
  let fixture: ComponentFixture<WidgetSharePost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetSharePost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetSharePost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
