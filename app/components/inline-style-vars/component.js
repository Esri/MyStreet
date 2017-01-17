import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  tagName: 'style',
  css: '',
  themeJson: '',
  loaded: false,

  derivedTheme: Ember.observer('themeJson', function() {
    let brandPrimary = this.get('themeJson.brand.primary') || '#1c66a6';
    let bodyBg = this.get('themeJson.body.bg') || '#f8f8f8';
    let linkColor = this.get('themeJson.brand.secondary') || '#136fbf';
    let textColor = this.get('themeJson.text.color') || '#4c4c4c';

    let bodyBgHex = $.colorspaces.make_color('hex', bodyBg);
    let bodyBgCielchDark = $.colorspaces.make_color('CIELCH',
      [bodyBgHex.as('CIELCH')[0],
       bodyBgHex.as('CIELCH')[1],
       bodyBgHex.as('CIELCH')[2]*1.1]);
    console.log('bodyBgCielchDark', bodyBgCielchDark);
    let bodyBgHexDark = bodyBgCielchDark.as('hex');
    console.log('bodyBgHexDark', bodyBgHexDark);

    let textColorHex = $.colorspaces.make_color('hex', textColor);
    let textColorCielchLight = $.colorspaces.make_color('CIELCH',
      [textColorHex.as('CIELCH')[0],
       textColorHex.as('CIELCH')[1],
       textColorHex.as('CIELCH')[2]*0.75]);
    console.log('textColorCielchLight', textColorCielchLight);
    let textColorHexLight = textColorCielchLight.as('hex');
    console.log('textColorHexLight', textColorHexLight);

    let cssString = `
      .panel-default, .list-group-item, .form-control, .panel-heading, .panel-title {
        background-color: ${bodyBgHexDark};
        color: ${textColor};
      }
      .form-control {
        background-color: ${bodyBg};
      }
      .panel-heading {
        padding: 0;
      }
      .panel-body {
        border: 1px;
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
    console.log('href in inline-style-vars::', href);
    if (!this.get('loaded')) {
      this.get('ajax').request(href, {dataType: 'json'}).then((response) =>{
        console.log(response);
        this.set('themeJson', response);
      });
    }
  }
});
