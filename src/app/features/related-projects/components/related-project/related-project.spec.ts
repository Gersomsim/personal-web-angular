import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedProject } from './related-project';

describe('RelatedProject', () => {
  let component: RelatedProject;
  let fixture: ComponentFixture<RelatedProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatedProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatedProject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
