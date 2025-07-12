import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-percentage-show',
  imports: [CommonModule,FormsModule],
  templateUrl: './percentage-show.html',
  styleUrl: './percentage-show.css'
})
export class PercentageShow {
 @Input() progress: number = 0;

  radius = 45;
  circumference = 2 * Math.PI * this.radius;
  strokeDashOffset = this.circumference;

  ngOnChanges() {
    // Clamp progress to [0, 100]
    const safeProgress = Math.min(Math.max(this.progress, 0), 100);
    this.strokeDashOffset = this.circumference * (1 - safeProgress / 100);
  }
}
