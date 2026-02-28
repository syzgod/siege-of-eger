import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-action-btn',
  standalone: true,
  templateUrl: './action-btn.html',
  styleUrl: './action-btn.scss',
})
export class ActionBtn {
  readonly label = input.required<string>();
  readonly icon = input<string>();
  readonly pressed = output<void>();
}
