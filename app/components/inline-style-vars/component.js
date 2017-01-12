import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  tagName: 'style',
  css: '',
  themeJson: '',
  loaded: false,

// TODO grab values from returned themeJson and (using ember observer?) change the css, then inject

  derivedTheme: Ember.computed('themeJson', function() {
    console.log('derivedTheme::in-sty-vars-', this.get('themeJson'));
    let cssString = `
      html {
        background-color: black;
        color: green;
      }
      .panel-title {
        background-color: black;
        color: green;
      }
    `;
// ${this.get('themeJson.body.bg')};
    console.log('csstoString', cssString.toString());
    this.set('css', cssString);
    console.log(this.get('css'));
  }),


// TODO questions
  // is json the only solution now? do they both need to happen?



  didReceiveAttrs() {
    let href;
    if (this.get('paramHref')) {
      href = this.get('paramHref');
    } else {
      href = this.get('configHref');
    }
    console.log('href in inline-style-vars::', href);
    if (!this.get('loaded')) {
      this.get('ajax').request(href, {dataType: 'json'}).then((response) =>{
        console.log(response);
        this.set('themeJson', response);
      });
    }
  }
});
