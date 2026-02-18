import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProjectPage } from './edit-project-page';

describe('EditProjectPage', () => {
  let component: EditProjectPage;
  let fixture: ComponentFixture<EditProjectPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProjectPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProjectPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
