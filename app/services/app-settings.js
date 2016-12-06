/* global _ */
import Ember from 'ember';
import ENV from '../config/environment';
// import chartUtils from 'opendata-ui/utils/chart-utils';
// import isNumericFieldType from 'opendata-ui/utils/is-numeric-field-type';

/*eslint-disable*/
//at some point this will come from the DB
const umbrellaSettings = {
  "title":"ArcGIS Open Data",
  "url": ENV.APP.umbrellaUrl,
  "layout": {
    "header": {
      "component": {
        "name":"umbrella-header"
      }
    },
    "footer": {
      "component": {
        "name":"umbrella-footer"
      }
    },
    "sections": [
      {
        "containment": "fluid",
        "rows":[
          {
            "cards":[
              {
                "width":12,
                "component": {
                  "name": "od-hero"
                }
              }
            ]
          }
        ]
      },

      {
        "containment": "fluid",
        "rows":[
          {
            "cards":[
              {
                "width":12,
                "component": {
                  "name":"newest-data"
                }
              }
            ]
          }
        ]
      },

      {
        "containment": "fluid",
        "classname":"noteworthy-container",
        "rows":[
          {
            "cards":[
              {
                "width":12,
                "component": {
                  "name":"noteworthy-data"
                }
              }
            ]
          }
        ]
      },

      {
        "containment": "fluid",
        "rows":[
          {
            "cards":[
              {
                "width":12,
                "component": {
                  "name":"featured-orgs"
                }
              }
            ]
          }
        ]
      }
    ]
  },
  defaultExtent: {
    xmin: -125.895,
    ymin: 25.43,
    xmax: -56.813,
    ymax: 49.459,
    spatialReference: {
      wkid: 4326
    }
  },
  isUmbrella: true,
  // internal_url:  'cocobeta.dc.opendataqa.arcgis.com'
};
/*eslint-enable*/
export default Ember.Service.extend({

  includeContentDocument: Ember.computed.not('isUmbrella'),
  siteLookup: Ember.inject.service('site-lookup'),
  capabilities: {},
  featureFlags:{},
  /**
   * When the service stats, cache the capabilities from the ENV
   */
  init() {
    this._super(...arguments);
    if (ENV.capabilities) {
      this.set('capabilities', ENV.capabilities);
    }
    if (ENV.featureFlags) {
      this.set('featureFlags', ENV.featureFlags);
    }
  },

  /**
   * Promisified initializeation of the Site
   */
  initializeSite () {
    Ember.debug('appSettings Service::init...');
    return this.get('siteLookup').getSite()
      .then((siteModel) => {
        // check if server has injected site settings (i.e. a custom site)
        console.log('siteModel', siteModel);
        this.set('site', siteModel);
        if (siteModel.data.values.capabilities) {

          this.mergeCapabilities(siteModel.data.values.capabilities);
        }
        return {success:true};
      })
  },

  // check if site has one or more capabilities
  hasCapabilities (...capabilities) {
    // test for each capability
    const configuredCapabilities = this.get('capabilities');
    //console.warn('Capabilities: ', configuredCapabilities);
    return capabilities.every(function (capability) {
      //console.warn('Looking at ' + capability + ' val: ' +  configuredCapabilities[capability]);
      return configuredCapabilities[capability];
    });
  },

  // experimental features, only controlled via environment
  hasFeature (feature) {
    return this.get('featureFlags')[feature];
  },

  // merge capabilities with defaults set in environment
  mergeCapabilities (capabilities) {
    if (Ember.isArray(capabilities)) {
      // we only get the true ones now, the others should be false...
      const keys = Object.keys(this.get('capabilities'));
      keys.forEach((key) => {
        this.get('capabilities')[key] = capabilities.includes(key);
      });
    } else {
      // sometimes we might still get an object...
      let newCaps = _.merge(this.get('capabilities'), capabilities);
      this.set('capabilities', newCaps);
    }
  },

  isFieldChartable (dataset, field) {
    const fieldType = Ember.get(field, 'type');
    const stats = Ember.get(field, 'statistics');
    const options = {
      maxCount: 20,
      maxRecordCount: dataset.get('maxRecordCount'),
      recordCount: dataset.get('recordCount'),
      advancedQueryCapabilities: dataset.get('advancedQueryCapabilities')
    };

    if (fieldType === 'esriFieldTypeDate' && !this.hasFeature('time_attr_charts')) {
      return false;
    }

    return chartUtils.shouldChartAttribute(fieldType, stats, options);
  },

  isFieldSmappable (dataset, field) {
    if (!this.hasFeature('smart_mapping')) {
      return false;
    }

    if (dataset.get('content') !== 'spatial dataset') {
      return false;
    }

    const fieldType = Ember.get(field, 'type');
    if (fieldType !== 'esriFieldTypeString' && !isNumericFieldType(fieldType) && fieldType !== 'esriFieldTypeDate') {
      // if it is NOT a string or a number or a date we can't smap it
      return false;
    }

    return this.isFieldChartable(...arguments);
  }
});
