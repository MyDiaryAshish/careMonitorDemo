import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorBannerComponent } from './error-banner.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

describe('ErrorBannerComponent', () => {
  let component: ErrorBannerComponent;
  let fixture: ComponentFixture<ErrorBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorBannerComponent, MatIconModule, MatCardModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorBannerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display the error card if message is null', () => {
    component.message = null;
    fixture.detectChanges();
    const errorCard = fixture.debugElement.query(By.css('.error-card'));
    expect(errorCard).toBeFalsy();
  });

  it('should not display the error card if message is undefined', () => {
    component.message = null;
    fixture.detectChanges();
    const errorCard = fixture.debugElement.query(By.css('.error-card'));
    expect(errorCard).toBeFalsy();
  });

  it('should display the error card if message is provided', () => {
    component.message = 'An error occurred.';
    fixture.detectChanges();
    const errorCard = fixture.debugElement.query(By.css('.error-card'));
    expect(errorCard).toBeTruthy();
  });

  it('should display the provided message in the span', () => {
    const errorMessage = 'Something went wrong!';
    component.message = errorMessage;
    fixture.detectChanges();
    const messageSpan: HTMLSpanElement | null = fixture.debugElement.query(By.css('span'))?.nativeElement;
    expect(messageSpan?.textContent).toContain(errorMessage);
  });

  it('should display the error icon', () => {
    component.message = 'Error!';
    fixture.detectChanges();
    const errorIcon = fixture.debugElement.query(By.css('mat-icon'));
    expect(errorIcon).toBeTruthy();
    expect(errorIcon.nativeElement.textContent).toBe('error_outline');
    expect(errorIcon.nativeElement.classList).toContain('mat-warn');
  });
});
