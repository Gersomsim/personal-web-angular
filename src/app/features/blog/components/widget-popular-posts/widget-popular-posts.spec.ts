import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetPopularPosts } from './widget-popular-posts';

describe('WidgetPopularPosts', () => {
  let component: WidgetPopularPosts;
  let fixture: ComponentFixture<WidgetPopularPosts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetPopularPosts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetPopularPosts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
