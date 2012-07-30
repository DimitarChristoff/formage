/*jshint mootools:true */
;(function(exports) {
	'use strict';

	var wrap = function() {

		return Element.implement({
			BSwarn: function(warning) {
				// bootstrap form element reset.
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
				// reset an error
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
	};


	if (typeof define === 'function' && define.amd) {
		// requires epitome object only.
		define(wrap);
	}
}(this));