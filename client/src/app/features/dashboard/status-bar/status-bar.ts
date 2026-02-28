import { Component, computed, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { GameStore } from '@app/features/resources/store/game.store';
import { KnobModule } from 'primeng/knob';
import { ProgressBar } from 'primeng/progressbar';

@Component({
  selector: 'app-status-bar',
  standalone: true,
  imports: [KnobModule, FormsModule, ProgressBar],
  template: `
    <section aria-label="Fortress status" class="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      <!-- Day Counter -->
      <article
        class="medieval-card flex flex-col items-center justify-center text-center p-3 sm:p-4 overflow-hidden"
        aria-label="Current day"
      >
        <dl class="stat-dl w-full">
          <dt
            class="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs uppercase text-wood/80 font-semibold tracking-wider"
          >
            <span class="text-sm sm:text-base shrink-0">📅</span> <span class="truncate">Day</span>
          </dt>
          <dd class="text-3xl sm:text-4xl font-bold mt-2 truncate">{{ day() }}</dd>
        </dl>
      </article>

      <!-- Days Remaining -->
      <article
        class="medieval-card flex flex-col items-center justify-center text-center p-3 sm:p-4 overflow-hidden"
        aria-label="Days remaining"
      >
        <dl class="stat-dl w-full">
          <dt
            class="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs uppercase text-wood/80 font-semibold tracking-wider"
          >
            <span class="text-sm sm:text-base shrink-0">⏳</span>
            <span class="truncate">Days Remaining</span>
          </dt>
          <dd
            class="text-3xl sm:text-4xl font-bold text-blood mt-2 truncate"
            [class.pulse-text]="daysRemaining() < 5"
          >
            {{ daysRemaining() }}
          </dd>
          <dd class="text-[9px] sm:text-[10px] text-wood/60 italic mt-1 truncate">
            before the siege starts
          </dd>
        </dl>
      </article>

      <!-- Action Points -->
      <article
        class="medieval-card flex flex-col items-center justify-center text-center gap-3 p-3 sm:p-4 overflow-hidden"
        aria-label="Action points"
      >
        <dl class="stat-dl w-full">
          <dt
            class="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs uppercase text-wood/80 font-semibold tracking-wider"
          >
            <span class="text-sm sm:text-base shrink-0">⚡</span>
            <span class="truncate">Action Points</span>
          </dt>
          <dd class="text-2xl sm:text-3xl font-bold text-gold mt-2 truncate">
            {{ actionPoints() }}<small class="text-xs sm:text-sm text-wood/40"> / 5</small>
          </dd>
        </dl>
        <p-progressbar
          [value]="actionPointsPct()"
          [showValue]="false"
          [style]="{ height: '6px', width: '100%', 'border-radius': '4px' }"
        />
      </article>

      <!-- Wall Health -->
      <article
        class="medieval-card flex flex-col items-center justify-center text-center gap-2 p-3 sm:p-4 overflow-hidden"
        aria-label="Wall health"
      >
        <h3
          class="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs uppercase text-wood/80 font-semibold tracking-wider m-0 w-full"
        >
          <span class="text-sm sm:text-base shrink-0">🏰</span>
          <span class="truncate">Wall Health</span>
        </h3>
        <p-knob
          [ngModel]="wallHealth()"
          [readonly]="true"
          [size]="60"
          [strokeWidth]="8"
          valueTemplate="{value}%"
          valueColor="var(--color-blood)"
          rangeColor="var(--color-wood)"
          textColor="var(--color-iron)"
        />
      </article>
    </section>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .stat-dl {
      margin: 0;
    }
    dd {
      margin-inline-start: 0;
    }

    .pulse-text {
      animation: pulse-animation 2s infinite;
      display: inline-block;
    }

    @keyframes pulse-animation {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.15);
      }
      100% {
        transform: scale(1);
      }
    }
  `,
})
export class StatusBar {
  private readonly gameStore = inject(GameStore);

  protected readonly day = computed(() => this.gameStore.gameState()?.day ?? '--');
  protected readonly daysRemaining = computed(
    () => this.gameStore.gameState()?.status?.daysRemaining ?? 0,
  );
  protected readonly actionPoints = computed(
    () => this.gameStore.gameState()?.status?.actionPoints ?? 0,
  );
  protected readonly wallHealth = computed(
    () => this.gameStore.gameState()?.status?.wallHealth ?? 0,
  );

  protected readonly actionPointsPct = computed(() => {
    const ap = this.actionPoints();
    return typeof ap === 'number' ? (ap / 5) * 100 : 0;
  });
}
