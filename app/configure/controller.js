import { copy } from '@ember/object/internals';
import { debug } from '@ember/debug';
// import { alias } from '@ember/object/computed';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
// import ENV from '../config/environment';

export default Controller.extend({
  // appSettings: service(),
  // myStreet: service(),
  itemsService: service(),
  // ajax: service(),
  // portalUrl: ENV.torii.providers['arcgis-oauth-bearer'].portalUrl,

  // dynamically generate allyship ids, TODO - get the elementId extraction working
  inputWebmapId: computed('elementId', function () {
    return `${this.get('elementId')}-webmap`;
  }),

  inputThemeId: computed('elementId', function () {
    return `${this.get('elementId')}-theme`;
  }),

  init () {
    this._super(...arguments);
    console.log(this.get('model'));
  },

  // afterModel () {
  //   this.set('loc', this.get('address'));
  // },

  saveItem () {
    console.log("saving");
    const itemsService = this.get('itemsService');
    let model = this.get('model');

    if (!model.item || !model.data) {
      throw new Error('Configure route::update requires a model {item: {...}, data:{...}} structure');
    }
    if (!model.item.id) {
      throw new Error('Configure route::update requires model.item.id be set.');
    }
    if (!model.item.owner) {
      throw new Error('Configure route::update requires model.item.owner be set');
    }

    debugger;

    let item = model.item;
    item.data = copy(model.data, true);
    // ensure we don't save the `.runtime` node
    delete item.data.runtime;

    return itemsService.update(item)
    .then((results) => {
      console.log(results);
      debugger;
    })
    .catch((err) => {
      console.log(err);
      debugger;
      debug(`Error checking for resources on item ${model.item.id}`);
      return false;
    });
  },

  actions: {
    save() {
      this.saveItem();
    }
    // searchAddress (val) {
    //   return this._searchAddress(val);
    // },
    // onAddressChanged (val) {
    //   this._setAddress(val);
    // },
  }

});
