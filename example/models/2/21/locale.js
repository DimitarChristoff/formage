define(function(require) {

    require('mootools-more');

    Locale.define('en-US', 'QS', {
        'PageTitle': 'Welcome to the question set 2 - 21',

        'propertyType': 'What type of property is it?',
        'PleaseSelect': 'Please select...',
        'House': 'House',
        'FlatApartment': 'Flat / Apartment',
        'Bungalow': 'Bungalow',
        'Other': 'Other',

        'propertyTypeHouse': 'Which of these best describes your house?',
        'DetatchedHouse': 'Detatched House',
        'SemiDetatchedHouse': 'Semi Detatched House',
        'MidTerrace': 'Mid Terrace',

        'propertyTypeFlat': 'Which of these best describes your flat / apartment?',
        'FlatPurposeBuilt': 'Purpose built flat',
        'FlatConverted': 'Flat - converted',
        'FlatPurposeBuiltGround': 'Purpose built flat - Ground floor',



        'firstName': 'First Name',
        'statementOfFact': 'Statement Of Fact',
        'Yes': 'Yes',
        'No': 'No',
        'Maybe': 'Not really',
        'Simon': 'Simon',
        'floodDamage': 'Flood Damage, you dig?',
        'coolbar': 'Welcome message'
    });

    Locale.define('bg-BG', 'QS', {
        'firstName': 'Ime'
    }).inherit('en-US');

    return Locale;

});
