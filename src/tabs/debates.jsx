var React = require('react');
var { Input } = require('react-bootstrap');

var { EntryTable } = require('../entry-table');

var toStyle = function(b) {
    if (b) {
        return "success";
    } else {
        return "error";
    }
};

var textInput = function(value, binds, validity, onChange) {
    return (<Input
        type="text"
        bsStyle={toStyle(validity)}
        value={value}
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

exports.name = "debates";
exports.title = "Debates";
exports.binds = {
    debates: "debates"
};
exports.body = function(binds, firebase) {
    return (
        <EntryTable
            fields={fields}
            table={binds.debates}
            binds={binds}
            firebase={firebase.child("debates")}
        />
    );
};
