define(['./locale'], function() {
    // this looks for `locale.js` next to the manifest.js for each version

    return [{
        type: 'main',
        title: Locale.get('QS.PageTitle'),
        elements: [{
            id: 'firstName',
            name: 'firstName',
            type: 'text',
            defaultValue: '',
            constructorAttributes: {
                'class': 'required'
            }
        }, {
            id: 'surName',
            name: 'surName',
            type: 'text',
            defaultValue: '',
            constructorAttributes: {
                'class': 'required'
            }
        }]
    }];
});
