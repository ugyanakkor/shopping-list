import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppComponent } from './app/app.component';

import 'zone.js';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/routes.config';

bootstrapApplication(AppComponent, {
  providers: [provideAnimationsAsync(), provideHttpClient(), provideRouter(appRoutes)]
}).catch(err => console.error(err));
