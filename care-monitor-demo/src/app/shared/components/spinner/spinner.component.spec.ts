import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerComponent, MatProgressSpinnerModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the mat-spinner', () => {
    const spinner = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinner).toBeTruthy();
  });

  it('should have the custom-spinner class', () => {
    const spinner = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinner?.nativeElement.classList).toContain('custom-spinner');
  });

  it('should have the spinner-container div', () => {
    const container = fixture.debugElement.query(By.css('.spinner-container'));
    expect(container).toBeTruthy();
  });
});
