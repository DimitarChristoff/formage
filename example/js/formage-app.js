var requireEpitome = require.config({
	baseUrl: '../vendor/epitome/src/'
});

// this will require main module, isequal and model
requireEpitome(['main'], function(Epitome) {

	require.config({
		baseUrl: '../src/'
	});

	require(['formage-core'], function(Formage) {

		var i = new Formage(document.id('testform'));

		console.log(i);

	});

});