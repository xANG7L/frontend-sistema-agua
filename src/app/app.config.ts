import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { authReducer } from './store/auth/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { lecturaReducer } from './store/lectura/lectura.reducer';
import { LecturaEffects } from './store/lectura/lectura.effects';
import { clienteReducer } from './store/cliente/clientes.reducer';
import { ClienteEffects } from './store/cliente/clientes.effects';
//import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideStore({
        auth: authReducer,
        lectura: lecturaReducer,
        cliente: clienteReducer
    }),
    provideEffects(
      AuthEffects,
      LecturaEffects,
      ClienteEffects
    )
]
};
