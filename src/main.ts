import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

//Corrige o problema do carregamento dos controls no chrome 80
(function() {
  const arrayReduce = Array.prototype.reduce;
  let callback;
  Object.defineProperty(Array.prototype, 'reduce', {
    value: function(cb, ...args) {
    callback = cb;
      return arrayReduce.call(this, callback, ...args);
    }
  });
})();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
