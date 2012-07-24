({
	baseUrl: './src/',
	optimize: 'uglify',
	out:'./Formage-min.js',
	name:'formage',
	include:[
		'formage',
		'formage-core',
		'groups/mixin/formage-group',
		'groups/types/formage-inline',
		'groups/types/formage-main'
	]
})