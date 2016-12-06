import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('view', {path:':id'});
  this.route('home', function() {});
  this.route('about', function() {});
});

export default Router;
