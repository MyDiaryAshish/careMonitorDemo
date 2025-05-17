import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

interface Item {
  id: number;
  name: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class ItemsStore {
  items = signal<Item[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) { }

  fetchItems() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Item[]>('/api/items')
      .pipe(
        tap(data => this.items.set(data)),
        catchError(err => {
          this.error.set('Failed to fetch items');
          return of([]);
        }),
        tap(() => this.loading.set(false))
      )
      .subscribe();
  }
}
