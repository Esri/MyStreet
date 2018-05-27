import { hash } from 'rsvp';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { debug } from '@ember/debug';

export default Route.extend({
  itemsService: service(),

  model (params) {
    return hash({
      item: this.get('itemsService').getById(params.id),
      data: this.get('itemsService').getDataById(params.id),
    });
  },


  beforeModel () {
      //set up the interationalization
      // this.get('intl').setLocale('en-us'); // TODO eventually not here
      // automatically re-hydrate a session
      return this._initSession();
    },

    _initSession () {
      return this.get('session').fetch()
        .then(() => {
          debug('User has been automatically logged in... ');
        })
        .catch((/*err*/) => {
          // we want to catch this, otherwise Ember will redirect to an error route!
          debug('No cookie was found, user is anonymous... ');
        });
    },

  actions: {
    signin () {
      this.get('session').open('arcgis-oauth-bearer')
        .then((authorization) => {
          debug('AUTH SUCCESS: ', authorization);
          //transition to some secured route or... so whatever is needed
          // this.transitionTo('index');
        })
        .catch((err)=>{
          debug('AUTH ERROR: ', err);
        });
    },
    signout () {
      this.get('session').close();
    }
  }
});
