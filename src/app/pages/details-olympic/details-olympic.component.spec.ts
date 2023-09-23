import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOlympicComponent } from './details-olympic.component';

describe('DetailsOlympicComponent', () => {
  let component: DetailsOlympicComponent;
  let fixture: ComponentFixture<DetailsOlympicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsOlympicComponent]
    });
    fixture = TestBed.createComponent(DetailsOlympicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
