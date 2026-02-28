import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';

import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import { provideHttpClient } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

const SiegeTheme = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '#fcf5e5',
          100: '#f5ead0',
          200: '#ecdbb3',
          300: '#ddc699',
          400: '#c4a86e',
          500: '#a88b50',
          600: '#8b6f3a',
          700: '#5d4037',
          800: '#4a3228',
          900: '#3b2820',
          950: '#2d1e18',
        },
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '#fcf5e5',
          100: '#f5ead0',
          200: '#ecdbb3',
          300: '#ddc699',
          400: '#c4a86e',
          500: '#a88b50',
          600: '#8b6f3a',
          700: '#5d4037',
          800: '#4a3228',
          900: '#3b2820',
          950: '#2d1e18',
        },
      },
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: SiegeTheme,
        options: {
          darkModeSelector: false,
        },
      },
    }),
  ],
};
