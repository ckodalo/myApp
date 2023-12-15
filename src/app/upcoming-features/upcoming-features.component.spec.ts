import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingFeaturesComponent } from './upcoming-features.component';

describe('UpcomingFeaturesComponent', () => {
  let component: UpcomingFeaturesComponent;
  let fixture: ComponentFixture<UpcomingFeaturesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingFeaturesComponent]
    });
    fixture = TestBed.createComponent(UpcomingFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
