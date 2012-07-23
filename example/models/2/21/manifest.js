define(['./locale'], function() {
    // this looks for `locale.js` next to the manifest.js for each version

    return [{
        type: 'main',
        title: Locale.get('QS.PageTitle'),
        elements: [{
            id: 'firstName2',
            name: 'firstName2',
            type: 'text',
            defaultValue: 'Dom was here',
            constructorAttributes: {
                'class': 'required',
                'tabindex': 1000
            }
        }]
    }];
});
