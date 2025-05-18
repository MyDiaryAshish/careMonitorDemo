import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { ItemsComponent } from './items.component';
import { ItemsStore, Item } from './items.store';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ItemsStore', () => {
  let store: ItemsStore;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ItemsStore],
    });
    store = TestBed.inject(ItemsStore);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should initialize with empty items, loading false, and no error', () => {
    expect(store.items()).toEqual([]);
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
  });

  describe('fetchItems', () => {
    const mockItems: Item[] = [
      { id: 1, name: 'Item 1', description: 'Description 1' },
      { id: 2, name: 'Item 2', description: 'Description 2' },
    ];

    it('should fetch items successfully', () => {
      store.fetchItems();
      const req = httpTestingController.expectOne('/api/items');
      expect(req.request.method).toBe('GET');
      req.flush(mockItems);

      expect(store.items()).toEqual(mockItems);
      expect(store.loading()).toBe(false);
      expect(store.error()).toBeNull();
    });

    it('should handle error during fetch', () => {
      store.fetchItems();
      const req = httpTestingController.expectOne('/api/items');
      req.error(new ErrorEvent('Network error'));

      expect(store.items()).toEqual([]);
      expect(store.loading()).toBe(false);
      expect(store.error()).toBe('Failed to fetch items');
    });

    it('should set loading to true before fetch and false after', () => {
      store.fetchItems();
      expect(store.loading()).toBe(true);

      const req = httpTestingController.expectOne('/api/items');
      req.flush(mockItems);
      expect(store.loading()).toBe(false);
    });
  });
});

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;
  let itemsStore: ItemsStore;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        ItemsComponent,
        MatTableModule,
        MatPaginatorModule,
        NoopAnimationsModule,
      ],
      providers: [
        {
          provide: ItemsStore,
          useValue: {
            items: () => [
              { id: 1, name: 'Item 1', description: 'Description 1' },
              { id: 2, name: 'Item 2', description: 'Description 2' },
              { id: 3, name: 'Item 3', description: 'Description 3' },
              { id: 4, name: 'Item 4', description: 'Description 4' },
              { id: 5, name: 'Item 5', description: 'Description 5' },
              { id: 6, name: 'Item 6', description: 'Description 6' },
              { id: 7, name: 'Item 7', description: 'Description 7' },
              { id: 8, name: 'Item 8', description: 'Description 8' },
              { id: 9, name: 'Item 9', description: 'Description 9' },
              { id: 10, name: 'Item 10', description: 'Description 10' },
              { id: 11, name: 'Item 11', description: 'Description 11' },
              { id: 12, name: 'Item 12', description: 'Description 12' },
            ],
            loading: () => false,
            error: () => null,
            fetchItems: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    itemsStore = TestBed.inject(ItemsStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display items from the store', () => {
    const table = fixture.nativeElement.querySelector('table');
    expect(table).toBeTruthy();
    const rows = table.querySelectorAll('tbody tr');
    expect(rows.length).toBe(10);
    expect(rows[0].textContent).toContain('Item 1');
    expect(rows[9].textContent).toContain('Item 10');
  });

  it('should display loading indicator', async () => {
    spyOn(itemsStore, 'loading').and.returnValue(true);
    fixture.detectChanges();
    await fixture.whenStable();
    const spinner = fixture.nativeElement.querySelector('app-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should display error banner', () => {
    spyOn(itemsStore, 'error').and.returnValue('An error occurred');
    fixture.detectChanges();
    const errorBanner = fixture.nativeElement.querySelector('app-error-banner');
    expect(errorBanner).toBeTruthy();
  });

  it('should handle page change event', () => {
    const pageEvent: PageEvent = {
      pageIndex: 1,
      pageSize: 10,
      length: 12,
    };
    component.handlePageChange(pageEvent);
    expect(component.currentPage()).toBe(1);
    fixture.detectChanges();
    const table = fixture.nativeElement.querySelector('table');
    const rows = table.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('Item 11');
    expect(rows[1].textContent).toContain('Item 12');
  });

    it('should have the correct displayed columns', () => {
      expect(component.displayedColumns).toEqual(['id', 'name', 'description']);
    });
});
