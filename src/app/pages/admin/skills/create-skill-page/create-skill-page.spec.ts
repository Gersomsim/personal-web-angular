import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSkillPage } from './create-skill-page';

describe('CreateSkillPage', () => {
  let component: CreateSkillPage;
  let fixture: ComponentFixture<CreateSkillPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSkillPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSkillPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
