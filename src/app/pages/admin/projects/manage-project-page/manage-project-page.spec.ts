import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProjectPage } from './manage-project-page';

describe('ManageProjectPage', () => {
  let component: ManageProjectPage;
  let fixture: ComponentFixture<ManageProjectPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageProjectPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProjectPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
