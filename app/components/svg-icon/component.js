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
    // TODO, if svg name doesn't exist, fall back on 'Planning_Zoning'
    // TODO recolor the image or svg elements

    this.set('adjustedTitle', adjustedTitle)
  }
});
