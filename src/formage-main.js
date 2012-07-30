/*jshint mootools:true */
;(function(exports) {
	'use strict';

	var wrap = function(Epitome, Formage) {

		Formage.Group = new Class({

			Implements: [Options, Events],

			options: {
				// the id of the locale namespace
				id: 'QS',
				radioWrapper: 'div.radioWrapper',
				autoInject: true
			},

			template: function(data, template) {
				// refactor this to work with any other template engine in your constructor
				if (!template.length) {
					return 'error';
				}

				// instantiate a template engine when needed
				var compiler = this.Template || (this.Template = new Epitome.Template());

				return compiler.template(template, data);
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
				var modelVal = this.options.form.retrieve('model') && this.options.form.retrieve('model').get(key),
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


		Formage.Main = new Class({

			Extends: Formage.Group,

			options: {
				// always inject into DOM
				autoInject: true
			},

			elements: [],

			changeAfter: [],

			initialize: function(elements, title, options) {
				this.setOptions(options);

				// handled by proto of Group
				this.createWrapper();
				this.setTitle(title);

				Array.each(elements, this.processElement.bind(this));

				this.fireChangeAfter();
			},

			fireChangeAfter: function() {
				// if any elements got values from the other source, now is the time to let the model know so the
				// deps become visible, if any.
				this.changeAfter.invoke('fireEvent', 'change');
				this.changeAfter = []
			},

			processElement: function(element) {
				var obj = {},
					html,
					template = this.templatesInput;

				if (!template) {
					template = this.templatesInput = document.id('input-container').get('html');
				}

				obj.id = element.id;
				obj.label = this.getLang(element.id);

				html = this.template(obj, template);

				this.elements.push(new Element('div', {
					html: html
				}).inject(this.wrapper));

				var newElement = this[element.type + 'Processor'](element).replaces(this.wrapper.getElement('#replaced')),
					valueObj = this.getValue(element.name),
					value = valueObj.value,
					error = valueObj.error;

				value !== null && this.setValue(newElement, value) && (this.changeAfter.push(newElement));

				error !== null && this.makeError(newElement, error);

				// see dependencies
				element.dependencies && this.grabDependencies(element, newElement);
			},

			makeError: function(elGroup, error) {
				elGroup.BSwarn(error);
				return this;
			},

			grabDependencies: function(element, newElement) {

				var ids = typeOf(element.dependenciesValueTrigger) == 'array' ? element.dependenciesValueTrigger : [element.dependenciesValueTrigger],
					o = this.options;

				ids.each(function(id) {
					if (!element.dependencies[id])
						return;

					var Type = element.dependencies[id]['type'].capitalize(),
						instance = new Formage[Type](element.dependencies[id]['elements'], element.dependencies[id]['title'], o);

					newElement.addEvent('change', function() {
						if (this.retrieve('getValue')() === id) {
							// todo: method that returns where to inject faster than looking at dom
							instance.wrapper.inject(newElement.getParent('div.control-group'), 'after')
						}
						else {
							instance.wrapper.dispose();
						}
					});
				});
			},

			textProcessor: function(element) {

				var el = new Element('input', Object.merge({
					type: 'text',
					id: element.id,
					name: element.name,
					value: element.defaultValue
				}, element.constructorAttributes));

				return el.store('getValue', function() {
					return el.get('value');
				});
			},

			radioProcessor: function(element) {
				var wrapper = new Element(this.options.radioWrapper, element.wrapperAttributes || {}),
					template = this.templatesRadio,
					html = [],
					defaultValue,
					self = this;

				if (!template) {
					template = this.templatesRadio = document.id('radio-input').get('html');
				}

				Array.each(element.values, function(valObj, index) {
					valObj.name = element.name;
					valObj.id = element.id + index;
					valObj['class'] && (valObj['class'] = 'class='+valObj['class']);
					element.defaultValue && element.defaultValue == valObj.value && (valObj.checked = 'checked="checked"') && (defaultValue = valObj.id);

					html.push(self.template(valObj, template));
				});

				// if defaultValue is on the radio group, make label point to that instead.
				defaultValue && this.wrapper.getElement('label[for=' + element.id + ']').set('for', defaultValue);

				element.constructorAttributes && element.constructorAttributes.class && wrapper.addClass(element.constructorAttributes.class);

				return wrapper.set('html', html.join('\n')).store('getValue', function() {
					var el = wrapper.getElement('input[type=radio]:checked');
					return el && el.get('value') || null;
				});
			},

			selectProcessor: function(element) {
				var wrapper = new Element('select', Object.merge({
					id: element.id,
					name: element.name
				}, element.wrapperAttributes));

				Array.each(element.values, function(valueObj) {
					var opt = new Element('option');

					// safer than check as '' is falsy for a string.
					typeof element.defaultValue !== 'undefined' && element.defaultValue == valueObj.value && opt.set('selected', true);

					opt.set({
						'value': valueObj.value,
						'text': valueObj.label,
						'disabled': valueObj.disabled
					}).inject(wrapper);

				});

				return wrapper.store('getValue', function() {
					return wrapper.get('value');
				});
			}

		});

		Formage.Inline = new Class({

			Extends: Formage.Main,

			options: {
				// by default, do not attach these to the DOM
				autoInject: false
			}

		});

		return Formage;
	};

	if (typeof define === 'function' && define.amd) {
		// requires epitome object only.
		define(['main', './formage'], wrap);
	}
	else {
		exports.Formage = wrap(exports.Epitome, exports.Formage);
	}
}(this));