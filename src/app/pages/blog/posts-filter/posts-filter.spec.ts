import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsFilter } from './posts-filter';

describe('PostsFilter', () => {
  let component: PostsFilter;
  let fixture: ComponentFixture<PostsFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostsFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
