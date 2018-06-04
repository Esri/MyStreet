/* jshint node: true */
module.exports = function(deployTarget) {
  const assetBuckets = {
    devext: 'dev-od-assets',
    qaext: 'qa-od-assets',
    production: 'prod-od-assets'
  };

  var ENV = {
    build: {
      environment: deployTarget,
    },
    'revision-data': {
      type: 'git-commit'
    },
    's3-index': {
      bucket: assetBuckets[deployTarget],
      region: 'us-east-1',
      prefix: 'apps/mystreet',
      allowOverwrite: true
    },
    's3': {
      bucket: assetBuckets[deployTarget],
      region: 'us-east-1',
      prefix: 'apps/mystreet',
    }
  };

  return ENV;
};
