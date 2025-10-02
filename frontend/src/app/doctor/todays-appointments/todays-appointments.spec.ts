import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysAppointments } from './todays-appointments';

describe('TodaysAppointments', () => {
  let component: TodaysAppointments;
  let fixture: ComponentFixture<TodaysAppointments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodaysAppointments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysAppointments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
