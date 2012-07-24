/*jshint mootools:true */
;(function(exports) {
	'use strict';

	require('../vendor/epitome/src/epitome');
	require('../vendor/epitome/src/epitome-model-sync');
	require('../vendor/epitome/src/epitome-collection-sync');
	require('../vendor/epitome/src/epitome-view');
	require('../vendor/epitome/src/epitome-storage');

	var Formage = {};

	if (typeof define === 'function' && define.amd) {
		define('formage', function() {
			return Formage;
		});
	}
	else if (typeof module === 'object') {
		module.exports = Formage;
	}
	else {
		exports.Formage = Formage;
	}
}(this));