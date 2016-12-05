import Ember from 'ember';


export default Ember.Service.extend({
  itemsService: Ember.inject.service('items-service'),
  /**
   * Return all pages belonging to a user
   */
  getUserPages(username, num=100, start=1){
    let form = {
      q:'owner:' + username + ' AND tags:hubpage AND type:Web Mapping Application',
      sortField:'title',
      num:num,
      start:start
    };
    return this.get('itemsService').search(form);
  },

  /**
   * Search for all page-template items
   */
  getPageTemplates(num=100, start=1){
    let form = {
      q:'tags:hubpagetemplate AND type:Web Mapping Application',
      sortField:'title',
      num:num,
      start:start
    }
    return this.get('itemsService').search(form);
  },

  getPageTemplate(id){
    return Ember.RSVP.hash({
      item: this.get('itemsService').getById(id),
      data: this.get('itemsService').getDataById(id)
    });
  },

  /**
   * Return the /data
   */
  getPage(id){
    return this.get('itemsService').getDataById(id)
    .then((data)=>{
      //we use the `.values` part of the app config hash
      data.values.id = id;
      return data.values;
    });
  },

  create(page){
    let data = {
      'source': 'OPENDATAPAGESBUWHAHAHAH',
      'folderId': null,
      'values': page
    };
    let item = {
      'title':page.title,
      'owner':page.owner,
      'type':'Web Mapping Application',
      'typeKeywords': [
        'Web Map',
        'Map',
        'Mapping Site',
        'Online Map',
        'JavaScript',
        'selfConfigured',
        'Code Sample'
      ],
      'tags':['hubpage'],
      'text': JSON.stringify(data)
    };

    return this.get('itemsService').create(item)
      .then((resp)=>{
        //get the id an update the url
        item.id = resp.id;
        item.url = 'https://dbouwman.github.io/opendata-pages/#/pages/' + resp.id;
        return this.get('itemsService').update(item);
      });
  },

  update(page){
    let data = {
      'source': 'OPENDATAPAGESBUWHAHAHAH',
      'folderId': null,
      'values': page
    };
    let item = {
      'id':page.id,
      'title':page.title,
      'description':page.description,
      'owner':page.owner,
      'text': JSON.stringify(data)
    };
    return this.get('itemsService').update(item);
  },

  destroy(page){
    return this.get('itemsService').destroy(page.id, page.owner);
  },

  encodePageAsForm(form = {}){
    Ember.merge(form, this.get('defaultParams'));
    return Object.keys(form).map((key) => {
      return [key, form[key]].map(encodeURIComponent).join('=');
    }).join('&');
  },

});
