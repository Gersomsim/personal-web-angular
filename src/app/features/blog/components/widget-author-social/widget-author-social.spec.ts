import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetAuthorSocial } from './widget-author-social';

describe('WidgetAuthorSocial', () => {
  let component: WidgetAuthorSocial;
  let fixture: ComponentFixture<WidgetAuthorSocial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetAuthorSocial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetAuthorSocial);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
