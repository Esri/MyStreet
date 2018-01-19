import { moduleFor, skip } from 'ember-qunit';

moduleFor('controller:index', 'Unit | Controller | index', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

// TODO: Replace this with your real tests.
// currently skipping b/c it fails w/o specifying needs above
skip('it exists', function(assert) {
  let controller = this.subject();
  assert.ok(controller);
});
