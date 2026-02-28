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
  template: `
    <article
      class="stat-card flex flex-col items-center justify-center px-4 py-3 rounded-md border border-wood/20 bg-white/40 shadow-sm relative"
      [attr.aria-label]="data().label + ': ' + data().value"
    >
      <!-- Accent line at the bottom -->
      <div
        class="absolute bottom-0 left-0 w-full h-1"
        [style.background-color]="data().accentColor ?? 'var(--color-iron)'"
      ></div>

      <dl class="stat-dl flex flex-col items-center w-full">
        <dt
          class="flex items-center gap-1.5 text-xs font-semibold uppercase text-wood/80 tracking-wider whitespace-nowrap"
        >
          @if (data().icon) {
            <span class="text-base">{{ data().icon }}</span>
          }
          {{ data().label }}
        </dt>
        <dd class="text-2xl font-bold text-iron mt-1.5 whitespace-nowrap">
          {{ data().value }}
        </dd>
        @if (data().rate !== undefined) {
          <dd
            class="text-[10px] font-medium text-wood/60 mt-1 bg-wood/5 px-2 py-0.5 rounded-full whitespace-nowrap"
          >
            {{ data().rate! > 0 ? '+' : '' }}{{ data().rate }}/day
          </dd>
        } @else {
          <dd class="h-5 mt-1"></dd>
        }
      </dl>
    </article>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }

    .stat-card {
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
      height: 100%;
      background-color: color-mix(in srgb, var(--color-parchment) 40%, white);
    }

    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px color-mix(in srgb, var(--color-wood) 15%, transparent);
    }

    .stat-dl {
      margin: 0;
    }

    dd {
      margin-inline-start: 0;
    }
  `,
})
export class StatCard {
  readonly data = input.required<StatCardData>();
}
