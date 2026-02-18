import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSkillsPage } from './list-skills-page';

describe('ListSkillsPage', () => {
  let component: ListSkillsPage;
  let fixture: ComponentFixture<ListSkillsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSkillsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSkillsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
