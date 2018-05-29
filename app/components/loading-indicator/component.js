import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import layout from './template';

/**
 * loading-indicator component - brought from e-a-o-components
 *
 * Default Usage
 * {{loading-indicator}} - will pull in a default translated message
 *
 * Passing a custom message
 * {{loading-indicator message=(t 'some.translation.key')}}
 *
 * No Message - no message is shown
 * {{loading-indicator noMessage=true}}
 */

export default Component.extend({

  layout,

  intl: service(),

  tagName: 'div',

  classNames: [ 'loader' ],

  isActive: true,

  classNameBindings: [ 'isActive' ],

  // default message
  message: '',

  msg: computed('message', function () {
    let message = this.get('message') || '';
    if (!message && !this.get('noMessage')) {
      message = this.get('intl').findTranslationByKey('ember-arcgis-opendata-components.loading-indicator.defaultMessage');
    }
    return message;
  })

});
