import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayBills } from './pay-bills';

describe('PayBills', () => {
  let component: PayBills;
  let fixture: ComponentFixture<PayBills>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayBills]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayBills);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
