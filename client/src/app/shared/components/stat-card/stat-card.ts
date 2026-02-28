import { Component, input } from '@angular/core';

export interface StatCardData {
  label: string;
  value: string | number;
  accentColor?: string;
  rate?: number;
  icon?: string;
}

@Component({
  selector: 'app-stat-card',
  standalone: true,
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
})
export class StatCard {
  readonly data = input.required<StatCardData>();
}
