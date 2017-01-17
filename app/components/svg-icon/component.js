import Ember from 'ember';

export default Ember.Component.extend({
  // tagName: 'svg',
  classNames: ['svg-icon'],
  ariaRole: 'img',
  // viewBox: null,
  title: '',

  didReceiveAttrs() {
    let adjustedTitle;
    adjustedTitle = this.get('title');

    // TODO have the adjustedTitles come in from the webmap layer and associated category (and icon)

    this.set('adjustedTitle', adjustedTitle)
  }


});
