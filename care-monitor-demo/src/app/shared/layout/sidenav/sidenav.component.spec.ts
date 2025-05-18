import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavComponent } from './sidenav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatIconModule, SidenavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a link to /dashboard with routerLinkActive', () => {
    const dashboardLink = fixture.debugElement.query(By.css('a[routerLink="/dashboard"]'));
    expect(dashboardLink).toBeTruthy();
    expect(dashboardLink.nativeElement.getAttribute('routerLinkActive')).toBe('active');
    const icon = dashboardLink.query(By.css('mat-icon'));
    expect(icon).toBeTruthy();
    expect(icon.nativeElement.textContent).toBe('dashboard');
    expect(icon.nativeElement.classList).toContain('mat-18');
    expect(dashboardLink.nativeElement.textContent).toContain('Dashboard');
  });

  it('should have a link to /list with routerLinkActive', () => {
    const listLink = fixture.debugElement.query(By.css('a[routerLink="/list"]'));
    expect(listLink).toBeTruthy();
    expect(listLink.nativeElement.getAttribute('routerLinkActive')).toBe('active');
    const icon = listLink.query(By.css('mat-icon'));
    expect(icon).toBeTruthy();
    expect(icon.nativeElement.textContent).toBe('list');
    expect(icon.nativeElement.classList).toContain('mat-18');
    expect(listLink.nativeElement.textContent).toContain('View List');
  });

  it('should have the sidenav container', () => {
    const sidenav = fixture.debugElement.query(By.css('.sidenav'));
    expect(sidenav).toBeTruthy();
  });

  it('should have an unordered list', () => {
    const ul = fixture.debugElement.query(By.css('ul'));
    expect(ul).toBeTruthy();
  });

  it('should have two list items', () => {
    const listItems = fixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(2);
  });
});
