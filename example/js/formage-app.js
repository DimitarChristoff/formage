var loaderError = function(err) {
	//The errback, error callback
	//The error has a list of modules that failed
	console.info(err);
};


require.config({
	paths: {
		'mootools': '../../vendor/mootools/mootools-core',
		'epitome': '../../vendor/epitome/src/main'
	},
	shim: {
		epitome: {
			exports: 'Epitome',
			deps: ['mootools']
		}
	}
});

require(['Epitome'], function(e) {

});