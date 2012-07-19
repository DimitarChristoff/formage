// author: Chiel Kunkels (@chielkunkels)

var groupTypes = {
	main: require('./groups/main.js')
};

module.exports = new Class({

	Implements: Events,

	/**
	 * Instantiate a new form
	 * @param {Object} spec Specification of how the form should look
	 */
	initialize: function(element, spec){
		this.form = document.id(element);
		this.spec = spec;
		this.parseSpec();
	},

	/**
	 * Parse the provided spec
	 */
	parseSpec: function(){
		Array.each(this.spec, function(group){
			new groupTypes[group.type](this.form, group);
		}, this);
	}
});

