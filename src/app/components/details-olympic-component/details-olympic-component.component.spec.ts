import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOlympicComponentComponent } from './details-olympic-component.component';

describe('DetailsOlympicComponentComponent', () => {
  let component: DetailsOlympicComponentComponent;
  let fixture: ComponentFixture<DetailsOlympicComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsOlympicComponentComponent]
    });
    fixture = TestBed.createComponent(DetailsOlympicComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
