var requireEpitome = require.config({
	baseUrl: '../vendor/epitome/src/'
});

// this will require main module, isequal and model
requireEpitome(['main'], function(Epitome) {

	require.config({
		baseUrl: '../src/'
	})

	require(['formage'], function(formage) {
		console.log(formage);
	});
	console.log(Object.keys(Epitome));
});