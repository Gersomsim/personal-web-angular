import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFeatured } from './project-featured';

describe('ProjectFeatured', () => {
  let component: ProjectFeatured;
  let fixture: ComponentFixture<ProjectFeatured>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectFeatured]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectFeatured);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
