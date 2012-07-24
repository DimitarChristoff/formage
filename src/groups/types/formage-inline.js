/*jshint mootools:true */
;(function(exports) {
	'use strict';

	var Formage = require('formage-main');

	Formage.Inline = new Class({

		Extends: Formage.Main,

		options: {
			// by default, do not attach these to the DOM
			autoInject: false
		}

	});

	if (typeof define === 'function' && define.amd) {
		define('formage-inline', function() {
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