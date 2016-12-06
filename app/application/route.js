import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  intl: Ember.inject.service(),
  appSettings: Ember.inject.service(),
  itemsService: Ember.inject.service('items-service'),
  featureService: Ember.inject.service('feature-service'),
  siteLookup: Ember.inject.service('site-lookup'),

  beforeModel: function () {
    Ember.debug('applicationRoute::beforeModel...');
    // kick off two things
    // - i18n initialization
    // - session
    let initializationPromises = {
      // i18nStatus: this._initI18n(),
      // sessionStatus: this._initSession()
    }

    // set base language to english, will need TODO build out alternative options
    const intl = this.get('intl');
    let defaultLocale = 'en-us';
    intl.setLocale(defaultLocale);
    // let translationKey = this._calculateTranslationKey(defaultLocale);


    return Ember.RSVP.hashSettled(initializationPromises)
    .then((/*results*/) => {
      // now we fire off the site fetch (this needed)
      return this.get('appSettings').initializeSite();
    })
    .then(() => {
      this._addSiteLinksJson();
      return;
    })
    .catch((err) => {
      Ember.debug('Error occured initializing the app ' + JSON.stringify(err));
    });


  },

  model () {
  // we do this so we have the Site as the model in renderTemplate
    console.log('111appsettings', this.get('appSettings').get('site'));
    return this.get('appSettings').get('site');
  },


  ///////////////////////////////////////
 // TODO your street to be cleaned up below//
 ///////////////////////////////////////
  items: {
    qaext: [
      {name:"DC", id:"ca186b7fc3e94eb7a8145bb758ba896a", theme:'13861'},
      {name:"LA", id:"489ea56b3c694e7ca9448298ce2c900d", theme:'10863'}
    ],
    www: [
      {name:"DC", id:"39b2d247f702476e8575d02c0e05d0a9", theme:'DCTHEMEPROD'},
      {name:"LA", id:"f7db9632c193454dacbec9b1436211a6", theme:'LATHEMEPROD'}
    ]
  },

  // model(params) {
  //   // get the site from the opendata api... we will work with raw json-api json to keep this simpler
  //   if(params.theme){
  //
  //     return Ember.RSVP.hash({
  //       sites: this.get('items')[ENV.APP.arcgisPortal.env],
  //       theme: this.get('themeService').getById(params.theme)
  //     });
  //   }else{
  //     return Ember.RSVP.hash({
  //       sites: this.get('items')[ENV.APP.arcgisPortal.env]
  //     });
  //   }
  // },

  ///////////////////////////////////////
 // TODO your street to be cleaned up above//
 ///////////////////////////////////////

  actions: {
    accessDenied: function () {
      // this.transitionTo('signin');
      this.transitionTo('index');
      console.log('access denied');
    },
    signout: function () {
      console.log('signout function');
      // depending on the type of auth, we need to do different things
      if (ENV.torii.providers['arcgis-oauth-bearer'].display && ENV.torii.providers['arcgis-oauth-bearer'].display === 'iframe') {
        // redirect the window to the signout url
        window.location = this.get('session.signoutUrl');
      } else {
        this.get('session').close();
      }
    }
  }
});
