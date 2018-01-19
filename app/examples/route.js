import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  appSettings: service(),

  // renderTemplate (/*controller, model*/) {
  //   Ember.debug('IndexRoute::renderTemplate fired...');
  //   let errStatus = this.get('appSettings.errStatus');
  //   if (!errStatus) {
  //     this.render();
  //   } else {
  //     if (errStatus === 500) {
  //       this.render('gateway.error', {model: {status: errStatus}});
  //     } else {
  //       if (errStatus === 403) {
  //         this.render('gateway.403');
  //       }
  //       if (errStatus === 404 || errStatus === 400) {
  //         this.render('gateway.404');
  //       }
  //     }
  //   }
  // },
  //
  // afterModel () {
  //   this.get('appSettings').set('errStatus', null);
  // }

});
