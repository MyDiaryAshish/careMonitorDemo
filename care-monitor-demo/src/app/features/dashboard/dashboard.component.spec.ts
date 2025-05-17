import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [DashboardComponent],
    providers: [
      { provide: ActivatedRoute, useValue: { snapshot: { data: {} }, params: of({}) } }
    ]
  }).compileComponents();
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
