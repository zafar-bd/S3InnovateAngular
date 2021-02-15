import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingReportComponent } from './reading-report.component';

describe('ReadingReportComponent', () => {
  let component: ReadingReportComponent;
  let fixture: ComponentFixture<ReadingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
