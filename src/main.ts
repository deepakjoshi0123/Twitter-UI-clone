import { EventEmitter } from 'events';

EventEmitter.defaultMaxListeners = 25; // Set the limit to an appropriate number

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
