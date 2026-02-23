import { Component, resource, signal } from '@angular/core';

import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('siege-of-eger-client');

  statusResource = resource({
    loader: () => fetch('http://localhost:3000').then((res) => res.text()),
  });
}
