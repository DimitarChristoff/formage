/*jshint mootools:true */
;(function(exports) {
	'use strict';

	var wrap = function(Epitome, Formage) {

		Formage = new Class({

			options: {
				page: 1,
				version: 20,
				path: 'models/{page}/{version}/manifest',
				useStorage: true,
				urlRoot: 'data',
				id: String.uniqueID()
			},

			Implements: [Options, Events],

			modified: false,

			initialize: function(element, options) {
				// constructor. needs an `Element` or `id` of the form element to work with.
				this.form = document.id(element);
				this.setOptions(options);

				var self = this;
				this.form.addEvent('change:relay(input,select,textarea)', function(e) {
					self.modified = true;
					self.fireEvent('change', this.BSreset());
					self.validator.validateField(this);
					// store persistent data for navigating away
					// self.options.useStorage && self.setItem(this.get('name'), this.get('value'));
					self.model.set(this.get('name'), this.get('value'));
				}).set({
					'method': 'post',
					'action': '#!next'
				});

				this.attachValidators();
				// this.getManifest();
			},

			attachValidators: function() {
				this.form.addEvent('reset', function() {
					this.getElements('input[type=text],input[type=email],select,textarea').BSreset();
				});

				this.validator = new Form.Validator(this.form, {
					useTitles: true,
					errorPrefix: '',
					evaluateFieldsOnBlur: true,
					evaluateFieldsOnChange: true,
					onElementValidate: function(isValid, field, className, warn) {
						if (!isValid) {
							field.BSwarn(this.validators[className].getError(field));
						}
						else {
							field.BSreset();
						}
					}
				});
			},

			attachButtons: function() {
				new Element('button[type=submit][text=Do it]').inject(this.form);
			},

			setupModel: function(obj) {
				obj = obj || {};
				obj.id = this.options.id;

				var modelProto = new Class({
					Extends: Epitome.Model.Sync,
					Implements: Epitome.Storage.sessionStorage()
				});

				this.model = new modelProto(obj, {
					urlRoot: this.options.urlRoot,
					onChange: function(vals) {
						this.store();
					},
					onSync: function(model) {

					}
				});

				this.form.store('model', this.model);
			},

			getManifest: function() {
				var self = this;

				var requireManifests = require.config({
					baseUrl: './'
				});

				requireManifests([this.options.path.substitute(this.options)], function(manifest) {
					self.setupModel();
					var throwAwayEvent = {
						sync: function(enquiry) {
							self.model.removeEvents(throwAwayEvent);
							self.model.set(enquiry);
							self.parseData(manifest);
						}
					};

					self.model.addEvents(throwAwayEvent).read();
				});

			},

			parseData: function(manifestArray) {
				// parse the manifest elements.
				var form = this.form.empty();
				this.modified = false;

				require(['./formage-main'], function(Formage) {
					Array.each(manifestArray, function(el) {
						var Type = el.type.capitalize();
						new Formage[Type](el.elements, el.title, {
							form: form
						});
					});
				});

				this.attachButtons();

			}

		}); // end formage-core

	    return Formage;
	};

	if (typeof define === 'function' && define.amd) {
		// requires epitome object only.
		define(['main', './formage', './formage-main', './formage-element'], wrap);
	}
	else {
		exports.Formage = wrap(exports.Epitome, exports.Formage);
	}
}(this));