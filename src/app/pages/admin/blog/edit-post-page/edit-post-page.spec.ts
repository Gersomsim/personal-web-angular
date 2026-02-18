import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPostPage } from './edit-post-page';

describe('EditPostPage', () => {
  let component: EditPostPage;
  let fixture: ComponentFixture<EditPostPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPostPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPostPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
