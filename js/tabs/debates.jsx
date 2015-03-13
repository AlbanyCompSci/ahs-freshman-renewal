var React = require('react');
var RB = require('react-bootstrap');
//var RBDT = require('react-bootstrap-datetimepicker');

var ET = require('../entry-table');

var toStyle = function(b) {
    if (b) {
        return "success"
    } else {
        return "error"
    }
};

var textInput = function(x, validity, onChange) {
    return (<RB.Input
        type="text"
        bsStyle={toStyle(validity)}
        defaultValue={x}
        onChange={onChange}
        hasFeedback
    />);
};

var always = function(a) { return function(b) { return a; }; }

titleField = {
    property: "title",
    header: "Title",
    render: textInput,
    validate: function(v) {
        return v == "Danube";
    },
    default: "Volga"
}

locationField = {
    property: "location",
    header: "Location",
    render: textInput,
    validate: always(true),
    default: ""
}

timeField = {
    property: "time",
    header: "Time",
    render: textInput,
    validate: always(true),
    default: ""
}

judgesField = {
    property: "judges",
    header: "Judges",
    render: textInput,
    validate: always(true),
    default: ""
}

affTeamField = {
    property: "affTeam",
    header: "Affirmative",
    render: textInput,
    validate: always(true),
    default: ""
}

negTeamField = {
    property: "negTeam",
    header: "Negative",
    render: textInput,
    validate: always(true),
    default: ""
}

var fields = [
    titleField,
    locationField,
    timeField,
    judgesField,
    affTeamField,
    negTeamField
];

exports.title = "Debates"
exports.body = <ET.EntryTable
    fields={fields}
/>
