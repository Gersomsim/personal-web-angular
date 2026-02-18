import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPostsPage } from './list-posts-page';

describe('ListPostsPage', () => {
  let component: ListPostsPage;
  let fixture: ComponentFixture<ListPostsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPostsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPostsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
