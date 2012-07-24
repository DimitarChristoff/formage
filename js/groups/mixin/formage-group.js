/*jshint mootools:true */
;(function(exports) {
	'use strict';

	// Base Class for a group of items - this is not meant to be used as a standalone
    // instead, you should `Extends: require('types/qs')` in subclasses.


    var Settings = require('settings'),
        QSI = require('formage-controller'),
	    Formage = require('formage');

    Formage.Group = new Class({

        Implements: [Options, Events],

        options: {
            // the id of the locale namespace
            id: 'QS',
            radioWrapper: 'div.radioWrapper',
            autoInject: true,
            form: Settings.form // fallback, unsafe.
        },

        setValue: function(elGroup, value) {
            // this is a proxy method that can set values - including the values of select radio groups.
            var props = elGroup.get(['tag','class']),
                el,
                c = this.options.radioWrapper.split('.').getLast();

            switch(props.tag) {
                case 'div':
                    // other groups - checkboxes and radios
                    if (props['class'].contains(c)) {
                        // radios
                        el = elGroup.getElement('input[type=radio][value=' + value + ']');
                        el && el.set('checked', true)
                    }
                    break;
                default:
                    // this will cover input[type=text], select, textarea
                    elGroup.set('value', value);
            }

            return this;
        },

        getValue: function(key) {
            // try to return a sensible value from enquiry object or local storage
            var modelVal = QSI.model && QSI.model.get(key),
                exportedObject = {
                    value: null,
                    error: null
                };

            if (modelVal) {
                if (typeOf(modelVal) == 'array') {
                    exportedObject.value = modelVal[0];
                    exportedObject.error = modelVal[1];
                }
                else {
                    exportedObject.value = modelVal;
                }
            }

            return exportedObject;
        },

        getLang: function(string) {
            // wrapper that returns translations for a label or the original `label` as the string.
            return Locale.get(this.options.id + '.' + string) || string;
        },

        createWrapper: function() {
            // each group is wrapped in a fieldset, which may or may not be appended to the DOM
            this.wrapper = new Element('fieldset.clear');
            this.options.autoInject && this.wrapper.inject(this.options.form);
        },

        setTitle: function(title) {
            // this sets the title of a group, normally a legend.
            if (title && title.length) {
                new Element('legend', {
                    html: title
                }).inject(this.wrapper, 'top');
            }
        }
    });


	if (typeof define === 'function' && define.amd) {
		define('formage-group', function() {
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


