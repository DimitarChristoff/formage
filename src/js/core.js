var storage = require('storage'),
	model = require('model-sync'),
	settings = require('settings');

var qs = new Class({

	options: {
		page: 1,
		version: 20,
		path: 'models/{page}/{version}/manifest',
		useStorage: true,
		urlRoot: 'scripts/data',
		id: String.uniqueID()
	},

	Implements: [Options, Events, storage],

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

	setPrivateKey: function() {
		var key = 'qs' + this.options.page;
		if (this.options.privateKey === key)
			return this; // already good.

		// else, page has changed.
		this.options.privateKey = key;

		// create a new namespaced storage object for the current page.
		this.setupStorage();

		return this;
	},

	setupModel: function(obj) {
		obj = obj || {};
		obj.id = this.options.id;

		this.model = new model(obj, {
			urlRoot: this.options.urlRoot,
			onChange: function(vals) {
				// console.log('values changed', vals);
			},
			onSync: function(model) {

			}
		});
	},

	getManifest: function() {
		var self = this;
		require([this.options.path.substitute(this.options)], function(manifest) {
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
		this.options.useStorage && this.setPrivateKey();

		Array.each(manifestArray, function(el) {
			var path = 'modules/types/' + el.type;

			require([path], function(Type) {
				new Type(el.elements, el.title, {
					form: form
				});
			});
		});

		this.attachButtons();

	}

});


Element.implement({
	// bootstrap form element reset.
	BSwarn: function(warning) {
		var helpSpan = 'span.help-inline',
			control = 'div.control-group',
			radioWrap = 'div.radioWrapper',
			isRadio = this.getParent(radioWrap),
			errorSpan,
			grp,
			target = this,
			where = 'after';

		this.BSreset();

		grp = this.getParent(control);
		grp && grp.addClass('error');

		!!isRadio && (target = isRadio) && (where = 'bottom');

		errorSpan = (grp && grp.getElement(helpSpan)) || new Element(helpSpan).inject(target, where);
		errorSpan && errorSpan.set('html', warning);

		return this;
	},

	BSreset: function() {
		var helpSpan = 'span.help-inline',
			control = 'div.control-group',
			errorSpan,
			grp;

		grp = this.getParent(control);
		grp && grp.removeClass('error');

		errorSpan = grp.getElement(helpSpan);
		errorSpan && errorSpan.empty();

		return this;
	}
});

module.exports = qs;