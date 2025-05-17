import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error-banner',
  imports: [CommonModule, MatIconModule, MatCardModule],
  templateUrl: './error-banner.component.html',
  styleUrl: './error-banner.component.scss'
})
export class ErrorBannerComponent {
  @Input() message: string | null = null;;
}
