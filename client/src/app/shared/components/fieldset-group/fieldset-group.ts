import { Component, input } from '@angular/core';

@Component({
  selector: 'app-fieldset-group',
  standalone: true,
  templateUrl: './fieldset-group.html',
  styleUrl: './fieldset-group.scss',
})
export class FieldsetGroup {
  readonly legend = input.required<string>();
}
