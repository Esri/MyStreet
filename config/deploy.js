/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    build: {}
    // include other plugin configuration that applies to all deploy targets here
  };

  ENV.s3 = {
    accessKeyId: 'AKIAIBPMW5O5PVAFU3ZA',
    secretAccessKey: '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',
    bucket: 'dev-od-assets',
    region: 'us-east-1',
    prefix: 'apps/mystreet',
    filePattern: '**/*.{js,css,png,gif,ico,jpg,map,xml,txt,svg,swf,eot,ttf,woff,woff2,otf,html,json}'
  }

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';

  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
