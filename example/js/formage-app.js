require.config({
	paths: {
		'text': 'text',
		'epitome': '../../vendor/epitome/src/epitome',
		'epitome-isequal': '../../vendor/epitome/src/epitome-isequal',
		'epitome-model': '../../vendor/epitome/src/epitome-model'
	}
});


require(['epitome-model'], function(e){
	console.log(e);
});