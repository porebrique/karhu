// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-09-15 using
// generator-karma 0.8.3

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',
    //basePath: '/static/ngapp/',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
            
            'bower_components/angular/angular.min.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/jquery/dist/jquery.min.js',

            'bower_components/angular-animate/angular-animate.min.js',
            'bower_components/angular-cookies/angular-cookies.min.js',
            'bower_components/angular-sanitize/angular-sanitize.min.js',
            'bower_components/ngstorage/ngStorage.min.js',
        
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/ng-sortable/dist/ng-sortable.min.js',
//            'bower_components/angular-resource/angular-resource.min.js',
            
        
//            'bower_components/angular-resource/angular-resource.min.js',
            'bower_components/lodash/dist/lodash.compat.min.js',
            'bower_components/restangular/dist/restangular.min.js',
            
            'bower_components/angular-filter/dist/angular-filter.min.js',
        
            'bower_components/angular-file-upload/angular-file-upload.min.js',
            
            'bower_components/angular-loading-bar/build/loading-bar.min.js',
            'bower_components/angular-bootstrap-lightbox/dist/angular-bootstrap-lightbox.min.js',
            'bower_components/textAngular/dist/textAngular.min.js',
        
        
            'bower_components/angular-touch/angular-touch.min.js',
        	 //include the directory where directive templates are stored.
        	//'app/src/**/templates/**/*.html',
        	
        	
//        	'app/src/**/*.config.js',
        	'app/src/**/*.module.js',
        	'app/src/**/*.controllers.js',
        	'app/src/**/*.services.js',
        	'app/src/**/*.directives.js',
        	
        	//'app/src/**/*.*.js',
        	'app/src/**/*.js',
        	'app/src/*.js',
            'app/src/app.js',
              
        	'test/spec/**/*.js',
            'test/mock/**/*.js'
    ],

  
    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8081,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      //'karma-coverage',
      'karma-phantomjs-launcher',
      'karma-jasmine'
      
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
