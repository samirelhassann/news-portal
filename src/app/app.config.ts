import { ApplicationConfig } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

import { providePrimeNG } from "primeng/config";

import { primeNgTheme } from "./styles/prime-ng/theme";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: primeNgTheme,
      },
    }),
  ],
};
