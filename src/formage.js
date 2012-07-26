/*jshint mootools:true */
;(function(exports) {
	'use strict';

	var Formage = {};

	if (typeof define === 'function' && define.amd) {
		define(function() {
			return Formage;
		});
	}
	else {
		exports.Formage = Formage;
	}
}(this));