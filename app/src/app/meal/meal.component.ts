import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-meal',
  standalone: true,
  imports: [],
  templateUrl: './meal.component.html',
  styleUrl: './meal.component.css',
})
export class MealComponent {
  @Input() weight = '';
  @Input() total = '';
  @Input() buffetType = '';
  @Input() datetime = '';

  @Input() titleClass = 'cardTitle';
  @Input() weightClass = '';
  @Input() containerClass = 'orderCard';
}
