var React = require('react');
var RB = require('react-bootstrap');
//var RBDT = require('react-bootstrap-datetimepicker');

var ET = require('../entry-table');

var toStyle = function(b) {
    if (b) {
        return "success";
    } else {
        return "error";
    }
};

var textInput = function(x, validity, onChange) {
    return (<RB.Input
        type="text"
        bsStyle={toStyle(validity)}
        value={x}
        onChange={onChange}
        hasFeedback
    />);
};

var always = function(a) { return function(b) { return a; }; };

var nonNull = function(v) {
    return (v && v !== null && v.length > 0);
};

titleField = {
    property: "title",
    header: "Title",
    render: textInput,
    validate: function(v) {
        return ((v !== "New Debate") && (v.length > 0));
    },
    default: "New Debate",
    boundTables: {}
};

locationField = {
    property: "location",
    header: "Location",
    render: textInput,
    validate: nonNull,
    default: "",
    boundTables: {}
};

timeField = {
    property: "time",
    header: "Time",
    render: textInput,
    validate: nonNull,
    default: "",
    boundTables: {}
};

judgesField = {
    property: "judges",
    header: "Judges",
    render: textInput,
    validate: nonNull,
    default: "",
    boundTables: {
        "judges": "judges"
    }
};

affTeamField = {
    property: "affTeam",
    header: "Affirmative",
    render: textInput,
    validate: nonNull,
    default: "",
    boundTables: {
        "teams": "teams"
    }
};

negTeamField = {
    property: "negTeam",
    header: "Negative",
    render: textInput,
    validate: nonNull,
    default: "",
    boundTables: {
        "teams": "teams"
    }
};

var fields = [
    titleField,
    locationField,
    timeField,
    judgesField,
    affTeamField,
    negTeamField
];

exports.title = "Debates";
exports.body = function(firebase) {
    return (
        <ET.EntryTable
            tablePath={"debates"}
            fields={fields}
            firebase={firebase}
        />
    );
};
