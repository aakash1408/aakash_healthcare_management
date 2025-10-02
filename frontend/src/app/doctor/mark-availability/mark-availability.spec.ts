import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkAvailability } from './mark-availability';

describe('MarkAvailability', () => {
  let component: MarkAvailability;
  let fixture: ComponentFixture<MarkAvailability>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkAvailability]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkAvailability);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
