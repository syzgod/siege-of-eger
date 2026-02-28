import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-action-btn',
  standalone: true,
  template: `
    <button
      type="button"
      class="flex items-center justify-center gap-2 bg-blood text-white px-3 sm:px-4 py-2 rounded-md hover:bg-red-900 transition-all shadow-md hover:shadow-lg uppercase font-bold tracking-wider text-[11px] sm:text-sm border border-red-950/50 w-full sm:w-auto"
      [attr.aria-label]="label()"
      (click)="pressed.emit()"
    >
      @if (icon()) {
        <span class="text-sm sm:text-base shrink-0">{{ icon() }}</span>
      }
      <span class="truncate">{{ label() }}</span>
    </button>
  `,
  styles: `
    :host {
      display: inline-block;
    }
  `,
})
export class ActionBtn {
  readonly label = input.required<string>();
  readonly icon = input<string>();
  readonly pressed = output<void>();
}
