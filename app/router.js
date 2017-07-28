import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: '/apps/mystreet/'
});

Router.map(function() {
  this.route('examples', {path:'/'});
  this.route('index', {path:'/:id'});
});

export default Router;
