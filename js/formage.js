/*jshint mootools:true */
;(function(exports) {
	'use strict';

	var Epitome = require('../vendor/Epitome'),
		Formage = {};

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