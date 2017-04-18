import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  tagName: 'style',
  css: '',
  themeJson: '',
  loaded: false,

  derivedTheme: Ember.observer('themeJson', function() {
    // let brandPrimary = this.get('themeJson.brand.primary') || '#1c66a6';
    let bodyBg = this.get('themeJson.body.bg') || '#f8f8f8';
    let linkColor = this.get('themeJson.brand.secondary') || '#136fbf';
    let textColor = this.get('themeJson.text.color') || '#4c4c4c';

    let bodyBgHex = $.colorspaces.make_color('hex', bodyBg);
    let bodyBgCielchDark = $.colorspaces.make_color('CIELCH',
      [bodyBgHex.as('CIELCH')[0],
       bodyBgHex.as('CIELCH')[1],
       bodyBgHex.as('CIELCH')[2]*1.1]);
    let bodyBgHexDark = bodyBgCielchDark.as('hex');

    let textColorHex = $.colorspaces.make_color('hex', textColor);
    let textColorCielchLight = $.colorspaces.make_color('CIELCH',
      [textColorHex.as('CIELCH')[0],
       textColorHex.as('CIELCH')[1],
       textColorHex.as('CIELCH')[2]*0.75]);
    let textColorHexLight = textColorCielchLight.as('hex');

    let cssString = `
      .hero-unit .address-prompt, .hero-unit .address-input {
        background-color: ${linkColor};
      }
      .panel-default, .list-group-item {
        background-color: ${bodyBgHexDark};
        color: ${textColor};
      }
      .input-bar {
        background-color: white;
        // color: ${textColor};
        color: black;
      }
      .address-icon {
        fill: ${linkColor};
      }
      .your-location {
        color: ${textColor};
      }
      .panel-body {
        border-color: ${textColorHexLight};
      }
    `;
    this.set('css', cssString);
  }),

  didReceiveAttrs() {
    let href;
    if (this.get('paramHref')) {
      href = this.get('paramHref');
    } else {
      href = this.get('configHref');
    }
    if (!this.get('loaded')) {
      this.get('ajax').request(href, {dataType: 'json'}).then((response) =>{
        this.set('themeJson', response);
      });
    }
  }
});
