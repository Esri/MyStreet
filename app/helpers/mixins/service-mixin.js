import Ember from 'ember';
//import fetch from 'ember-network/fetch';


export default Ember.Mixin.create({
  ajax: Ember.inject.service(),
  session: Ember.inject.service('session'),

  hostAppConfig: Ember.computed(function(){
    return Ember.getOwner(this).resolveRegistration('config:environment');
  }),


  defaultParams: {
    f:'json'
  },

  encodeForm(form = {}){
    Ember.merge(form, this.get('defaultParams'));
    return Object.keys(form).map((key) => {
      return [key, form[key]].map(encodeURI).join('=');
    }).join('&');
  },


  /**
   * Centralized Request with ArcGIS Payload checking
   */
  request(url, options){
    let opts = options || {};

    if(opts.method && opts.method ==='POST'){
      //if we are POSTing, we need to manually set the content-type because AGO
      //actually does care about this header
      opts.headers = {
        'Accept': 'application/json',
        'Content-Type':'application/x-www-form-urlencoded'
      };

    }

    //append in the token
    if(this.get('session') && this.get('session.token')){
      let token = this.get('session.token');
      //add a token
      if(url.indexOf('?') > -1){
        url = url + '&token=' + token;
      }else{
        url = url + '?token=' + token;
      }
    }

    //TODO: Add checks for 200-is-499 etc via https://github.com/ember-cli/ember-ajax#customize-issuccess

    return this.get('ajax').request(url, options)
    .catch((/*err*/)=>{
      return {};
    });


    // return fetch(url, opts)
    //   .then((response) =>{
    //     if(response.ok){
    //       //check body...
    //
    //       return response.json()
    //       .then((json)=>{
    //         if(json.error){
    //           return Promise.reject(json);//json.then(Promise.reject.bind(Promise));
    //         }else{
    //           return json;
    //         }
    //       });
    //     }else{
    //       console.error('Fetch response was not OK');
    //     }
    //   });
  }
});
