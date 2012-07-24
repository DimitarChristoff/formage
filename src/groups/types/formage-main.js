/*jshint mootools:true */
;(function(exports) {
	'use strict';

	var Mustache = require('mustache'),
		Formage = require('formage-group');

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
				template = require('text!templates/input-container.html');

			obj.id = element.id;
			obj.label = this.getLang(element.id);

			html = Mustache.render(template, obj);

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
			var props = elGroup.get(['tag','class']);

			elGroup.BSwarn(error);

			return this;

		},

		grabDependencies: function(element, newElement) {

			var ids = typeOf(element.dependenciesValueTrigger) == 'array' ? element.dependenciesValueTrigger : [element.dependenciesValueTrigger];

			ids.each(function(id) {
				if (!element.dependencies[id])
					return;

				var path = 'modules/types/' + element.dependencies[id]['type'];

				require([path], function(Type) {
					var instance = new Type(element.dependencies[id]['elements'], element.dependencies[id]['title']);

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
				template = require('text!templates/radio-input.html'),
				html = [],
				defaultValue;

			Array.each(element.values, function(valObj, index) {
				valObj.name = element.name;
				valObj.id = element.id + index;
				valObj['class'] && (valObj['class'] = 'class='+valObj['class']);
				element.defaultValue && element.defaultValue == valObj.value && (valObj.checked = 'checked="checked"') && (defaultValue = valObj.id);

				html.push(Mustache.render(template, valObj));
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


	if (typeof define === 'function' && define.amd) {
		define('formage-main', function() {
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