import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjectsPage } from './list-projects-page';

describe('ListProjectsPage', () => {
  let component: ListProjectsPage;
  let fixture: ComponentFixture<ListProjectsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProjectsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProjectsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
