require('bootstrap/less/bootstrap.less');
require('react-select/less/default.less');

var React = require('react');
var { Input } = require('react-bootstrap');
var Select = require('react-select');
var _ = require('lodash');

var { EntryTable } = require('../entry-table');

var toStyle = function(b) {
    if (b) {
        return "success";
    } else {
        return "error";
    }
};

var textInput = function(value, binds, validity, onChange) {
    var onChangeEvent = function(event) {
        return onChange(event.target.value)
    };
    return (<Input
        type="text"
        bsStyle={toStyle(validity)}
        value={value}
        onChange={onChangeEvent}
        hasFeedback
    />);
};

var selectInput = function(table, show) {
    return (function(value, binds, validity, onChange) {
        console.log('binds: ' + JSON.stringify(binds));
        var options = _.transform(binds[table], function(acc, val, key) {
            acc.push({value: key, label: show(val)});
        }, []);
        return (
            <Select value={value} options={options} onChange={onChange} />
        );
    });
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
};

locationField = {
    property: "location",
    header: "Location",
    render: selectInput('locations', _.identity),
    validate: nonNull,
    default: "",
};

timeField = {
    property: "time",
    header: "Time",
    render: textInput,
    validate: nonNull,
    default: "",
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
    render: selectInput("teams", function (team) { return team.name }),
    validate: nonNull,
    default: "",
    boundTables: {
        "teams": "teams"
    }
};

negTeamField = {
    property: "negTeam",
    header: "Negative",
    render: selectInput("teams", function (team) { return team.name }),
    validate: nonNull,
    default: "",
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
    debates: 'debates',
    judges: 'judges',
    teams: 'teams',
    locations: 'locations'
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
