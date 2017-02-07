import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('address-typeahead', 'Integration | Component | address typeahead', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{address-typeahead}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#address-typeahead}}
      template block text
    {{/address-typeahead}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
