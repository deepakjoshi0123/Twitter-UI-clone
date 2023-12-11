import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-spinner',
  template: `
    <div *ngIf="show" class="spinner-container">
      <div class="spinner"></div>
    </div>
  `,
  styleUrls: ['./spinner.component.css'],
  standalone: true,
  imports: [NgIf],
})
export class SpinnerComponent {
  @Input() show: boolean = false;
}
