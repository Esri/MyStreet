import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Service.extend({
  itemsService: Ember.inject.service('items-service'),
  // TODO Q - why is site-service not lookupable
  // siteService: Ember.inject.service('site-service'),
  session: Ember.inject.service('session'),
  featureService: Ember.inject.service('feature-service'),
  fastboot: Ember.inject.service(),
  isFastBoot: Ember.computed.reads('fastboot.isFastBoot'),

  domainInfo:null,
  shoeBoxChecked:false,
  site:null,

  /**
   * Get the site - from the fastboot shotbox or from AGO
   */
  getSite() {
    Ember.debug('site-lookup::getSite isAuthenticated: ' + this.get('session.isAuthenticated'));
    let start = Date.now();
    let shoebox = this.get('fastboot.shoebox');
    let siteStore = shoebox.retrieve('site-store');
    let domainStore = shoebox.retrieve('domain-store');

    //first, see if we have domainInfo from fastboot
    if(!this.get('isFastBoot') && domainStore && domainStore.domainInfo){
      this.set('domainInfo', domainStore.domainInfo);
    }

    // if this is in the client and we have a site in the store... return it...
    if(!this.get('isFastBoot') && !this.get('shoeBoxChecked') && siteStore && siteStore.site){
      //showbox should only be used once...
      this.set('shoeBoxChecked', true);
      //only return this if it's a 200
      if(siteStore.site.status === 200){
        return new Ember.RSVP.Promise((resolve)=>{
           siteStore.site.source = 'fastboot';
           siteStore.site.time =  Date.now() - start;
           this.set('site', siteStore.site);
           resolve(siteStore.site);
         });
      }
    }
    // if we already have the site, return it
    if(this.get('site')){
      Ember.debug('site-lookup already has site - returning it');
      return new Ember.RSVP.Promise((resolve)=>{
        resolve(this.get('site'));
      });
    }else{
      let start = Date.now();
      // query feature service w/ page hostname to get the ID

      //-------------------------------------------
      let hostname ='';
      if(this.get('isFastBoot')){
        hostname = this.get('fastboot.request.host');
        // hostname will return the port as well
        if(hostname.indexOf(':') > -1){
          hostname = hostname.split(':')[0];
        }
      }else{
        hostname = window.location.hostname;
      }
      //-------------------------------------------
      Ember.debug('HOSTNAME: ' + hostname);
      // TODO: Use Domain Service.lookup()
      // TODO Q how to actually handle this url portion
      // let url = ENV.APP.domainServiceUrl;
      let url = "https://www.arcgis.com"
      let options = {
        includeGeometry:false,
        outFields:'*'
      };
      options.where = encodeURI("domain='" + hostname + "'");
      Ember.debug('Session isAuthenticated: ' + this.get('session.isAuthenticated'));
      return this.get('featureService').query(url, options)
      .then((fsResponse)=>{
        Ember.debug('Got Response from feature service...');
        // query ago to get the site item
        if(fsResponse.features.length){
          //shoebox the domain information so the client side can use it
          let domainInfo = fsResponse.features[0].attributes;
          this.set('domainInfo', domainInfo);
          if(this.get('isFastBoot')){
            shoebox.put('domain-store',  {domainInfo:domainInfo});
          }

          Ember.debug('Making call to fetch the site item by id: ' + domainInfo.siteId);
          return this.get('siteService').getById(domainInfo.siteId)
            .then((result)=>{
              // if we got something here, we call it a 200...
              result.status = 200;
              result.source = 'xhr';
              // hold onto it...
              this.set('site', result);
              return result;
            })
            .catch((err) => {
              Ember.debug('Portal call threw: ' + JSON.stringify(err));
              return {
                domainInfo: fsResponse.features[0].attributes,
                status: err.code || 500
              };
            });
        }else{
          //TODO: throw or reject?
          Ember.debug('No features were returned...');
        }
      })
      .then((result) => {
        let diff = Date.now() - start;
        result.time = diff;

        // in all cases, if fastboot, serialize for the browser...
        if(this.get('isFastBoot')){
          shoebox.put('site-store', {site: result});
        }
        //we always return SOMETHING from this...
        return result;
      });
    }
  }

});
