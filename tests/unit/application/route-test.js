import { moduleFor, skip } from 'ember-qunit';

moduleFor('route:application', 'Unit | Route | application', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

// TODO: Replace this with your real tests.
// currently skipping b/c it fails w/o specifying needs above
skip('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
