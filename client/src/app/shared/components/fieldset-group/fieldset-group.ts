import { Component, input } from '@angular/core';

@Component({
  selector: 'app-fieldset-group',
  standalone: true,
  template: `
    <fieldset class="fieldset-group" role="group" [attr.aria-label]="legend()">
      <legend class="fieldset-legend">{{ legend() }}</legend>
      <ng-content />
    </fieldset>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }

    .fieldset-group {
      border: 1px solid color-mix(in srgb, var(--color-wood) 30%, transparent);
      border-radius: 0.5rem;
      padding: 1.25rem;
      background-color: color-mix(in srgb, var(--color-parchment) 95%, var(--color-wood));
      box-shadow:
        inset 0 0 20px color-mix(in srgb, var(--color-wood) 5%, transparent),
        0 2px 8px color-mix(in srgb, var(--color-wood) 5%, transparent);
    }

    .fieldset-legend {
      padding: 0.25rem 0.75rem;
      font-size: 0.875rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--color-wood);
      background-color: var(--color-parchment);
      border: 1px solid color-mix(in srgb, var(--color-wood) 30%, transparent);
      border-radius: 0.25rem;
      box-shadow: 0 2px 4px color-mix(in srgb, var(--color-wood) 10%, transparent);
    }
  `,
})
export class FieldsetGroup {
  readonly legend = input.required<string>();
}
