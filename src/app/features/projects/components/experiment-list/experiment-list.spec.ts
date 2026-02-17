import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentList } from './experiment-list';

describe('ExperimentList', () => {
  let component: ExperimentList;
  let fixture: ComponentFixture<ExperimentList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperimentList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperimentList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
