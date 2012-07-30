<?PHP


$response = Array(
    'firstName' => Array('coda','This is shit'),
    'foobar' => 'No',
    'foobar2' => 'Pre-populated',
    'propertyType' => 'property_type_1',
    // 'statementOfFact' => Array('', 'This is a required field'),
    'propertyTypeHouse' => 'Detatched house',
    'id' => $_REQUEST['id']
);

echo json_encode($response);

?>