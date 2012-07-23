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
                'class': 'required name-check',
                'tabindex': 1000,
                'events': {
                    mouseenter: function() {
                        console.log('hai bois input')
                    }
                }
            }
        }, {
            id: 'propertyType',
            name: 'propertyType',
            type: 'select',
            defaultValue: '',
            values: [{
                label: Locale.get('QS.PleaseSelect'),
                value: '',
                disabled: true
            }, {
                label: Locale.get('QS.House'),
                value: 'property_type_1'
            }, {
                label: Locale.get('QS.FlatApartment'),
                value: 'property_type_2'
            }, {
                label: Locale.get('QS.Bungalow'),
                value: 'property_type_3'
            }, {
                label: Locale.get('QS.Other'),
                value: 'property_type_4'
            }],
            dependenciesValueTrigger: [
                'property_type_1',
                'property_type_2',
                'property_type_3',
                'property_type_4'
            ],
            dependencies: {
                'property_type_1': {
                    type: 'inline',
                    elements: [{
                        id: 'propertyTypeHouse',
                        name: 'propertyTypeHouse',
                        type: 'select',
                        defaultValue: '',
                        values: [{
                            label: Locale.get('QS.PleaseSelect'),
                            value: '',
                            disabled: true
                        }, {
                            label: Locale.get('QS.DetatchedHouse'),
                            value: 'Detatched house'
                        }, {
                            label: Locale.get('QS.SemiDetatchedHouse'),
                            value: 'Semi-detatched house'
                        }, {
                            label: Locale.get('QS.MidTerrace'),
                            value: 'Mid terrace'
                        }]
                    }]
                },
                'property_type_2': {
                    type: 'inline',
                    elements: [{
                        id: 'propertyTypeFlat',
                        name: 'propertyTypeFlat',
                        type: 'select',
                        defaultValue: '',
                        values: [{
                            label: Locale.get('QS.PleaseSelect'),
                            value: '',
                            disabled: true
                        }, {
                            label: Locale.get('QS.FlatPurposeBuilt'),
                            value: 'Purpose built'
                        }, {
                            label: Locale.get('QS.FlatConverted'),
                            value: 'Converted flat'
                        }, {
                            label: Locale.get('QS.FlatPurposeBuiltGround'),
                            value: 'Purpose Built - Ground'
                        }]
                    }]
                }
            }
        },{
            id: 'statementOfFact',
            name: 'statementOfFact',
            type: 'radio',
            values: [{
                label: Locale.get('QS.Yes'),
                value: 'Yes',
                'class': 'validate-one-required'
            }, {
                label: Locale.get('QS.No'),
                value: 'No'
            }, {
                label: Locale.get('QS.Maybe'),
                value: 'Maybe'
            }],
            // defaultValue: 'Yes',
            dependencies: {
                No: {
                    type: 'inline',
                    title: 'If Maybe, then what?',
                    elements: [{
                        id: 'coolbar',
                        name: 'coolbar',
                        type: 'text',
                        defaultValue: 'Hello',
                        constructorAttributes: {
                            'class': 'required'
                        }
                    },  {
                        id: 'floodDamage',
                        name: 'floodDamage',
                        type: 'text',
                        defaultValue: '',
                        constructorAttributes: {
                            'class': 'required',
                            'placeholder': 'Type \'Simon\' and blur'
                        },
                        dependencies:  {
                            'Simon': {
                                type: 'inline',
                                elements: [{
                                    id: 'foobar',
                                    name: 'foobar',
                                    type: 'select',
                                    defaultValue: '',
                                    values: [{
                                        label: Locale.get('QS.Yes'),
                                        value: 'Yes'
                                    }, {
                                        label: Locale.get('QS.No'),
                                        value: 'No'
                                    }, {
                                        label: Locale.get('QS.Simon'),
                                        value: 'Simon'
                                    }],
                                    constructorAttributes: {
                                        'class': 'required'
                                    },
                                    dependencies: {
                                        'Simon': {
                                            type: 'inline',
                                            elements: [{
                                                id: 'foobar2',
                                                name: 'foobar2',
                                                type: 'text',
                                                defaultValue: '',
                                                constructorAttributes: {
                                                    'class': 'required'
                                                }
                                            }]
                                        },
                                        'No': {
                                            type: 'inline',
                                            elements: [{
                                                id: 'foobar3',
                                                name: 'foobar3',
                                                type: 'text',
                                                defaultValue: '',
                                                constructorAttributes: {
                                                    'class': 'required'
                                                }
                                            }]
                                        }
                                    },
                                    dependenciesValueTrigger: ['Simon','No']
                                }]
                            }
                        },
                        dependenciesValueTrigger: ['Simon']
                    }]
                }
            },
            dependenciesValueTrigger: 'No',
            constructorAttributes: {
                'class': 'validate-two-required'
            },
            wrapperAttributes: {
                'events': {
                    mouseenter: function() {
                        console.log('hai bois mouse event')
                    }
                }
            }
        }]
    }];

});
