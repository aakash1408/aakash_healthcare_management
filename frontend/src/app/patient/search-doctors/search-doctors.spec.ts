import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDoctors } from './search-doctors';

describe('SearchDoctors', () => {
  let component: SearchDoctors;
  let fixture: ComponentFixture<SearchDoctors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDoctors]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDoctors);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
