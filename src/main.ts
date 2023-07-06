import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { inspect } from "@xstate/inspect";

inspect({ iframe: false });

platformBrowserDynamic().bootstrapModule(AppModule)
        .catch(err => console.error(err));
