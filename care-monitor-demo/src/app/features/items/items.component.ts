import { Component, computed, OnInit, signal } from '@angular/core';
import { ItemsStore } from './items.store';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from "../../shared/components/spinner/spinner.component";
import { ErrorBannerComponent } from "../../shared/components/error-banner/error-banner.component";

// Material modules
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {MatToolbarModule} from '@angular/material/toolbar';
@Component({
  selector: 'app-items',
  imports: [CommonModule, MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule, SpinnerComponent, ErrorBannerComponent,MatPaginatorModule,MatToolbarModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit {
  displayedColumns = ['id', 'name', 'description'];
    pageSize = 10;
  currentPage = signal(0);

  // Assume store.items() is a signal returning an array
  pagedItems = computed(() => {
    const allItems = this.store.items();
    const start = this.currentPage() * this.pageSize;
    return allItems.slice(start, start + this.pageSize);
  });
  constructor(public store: ItemsStore) { }

  ngOnInit(): void {
    this.store.fetchItems();
  }


  handlePageChange(event: PageEvent) {
    this.currentPage.set(event.pageIndex);
  }
}
