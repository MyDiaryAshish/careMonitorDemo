import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let cookieService: jasmine.SpyObj<CookieService>;

  beforeEach(async () => {
    const cookieSpy = jasmine.createSpyObj('CookieService', ['get']);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: CookieService, useValue: cookieSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    cookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve userEmail from CookieService on initialization', () => {
    cookieService.get.withArgs('userEmail').and.returnValue('test@example.com');

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.userEmail).toBe('test@example.com');
    expect(cookieService.get).toHaveBeenCalledWith('userEmail');
  });

it('should set userEmail to null if the cookie is not found', () => {
    cookieService.get.withArgs('userEmail').and.returnValue('');
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.userEmail).toBe('');
    expect(cookieService.get).toHaveBeenCalledWith('userEmail');
  });
});
