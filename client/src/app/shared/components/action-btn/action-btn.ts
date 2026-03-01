import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-action-btn',
  standalone: true,
  templateUrl: './action-btn.html',
  styleUrl: './action-btn.scss',
})
export class ActionBtn {
  readonly label = input.required<string>();
  readonly disabled = input(false);
  readonly disabledReason = input<string>();
  readonly icon = input<string>();
  readonly pressed = output<void>();

  handleClick(): void {
    if (this.disabled()) {
      const reason = this.disabledReason();
      if (reason) {
        console.warn(`[${this.label()}] ${reason}`);
      }
      return;
    }
    this.pressed.emit();
  }
}
