var requireEpitome = require.config({
	baseUrl: '../vendor/epitome/src/'
});

var App = {};

// this will require main module, isequal and model
requireEpitome(['main'], function(Epitome) {

	require.config({
		baseUrl: '../src/',
		urlArgs: 'bust=' +  (new Date()).getTime()
	});

	require(['formage-core'], function(Formage) {

		App.qs = new Formage(document.id('testform'));

		App.qs.setOptions({
			page: 1
		}).getManifest();
	});

});