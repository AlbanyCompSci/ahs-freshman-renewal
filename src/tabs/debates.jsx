var React = require('react');
var _ = require('lodash');

var Field = require('../field-lib');
var { EntryTable } = require('../entry-table');

titleField = {
    property: "title",
    header: "Title",
    render: Field.textInput,
    validate: function(v) {
        return ((v !== "New Debate") && (v.length > 0));
    },
    default: "New Debate",
};

locationField = {
    property: "location",
    header: "Location",
    render: Field.selectInput('locations', _.identity),
    validate: Field.nonNull,
    default: "",
};

timeField = {
    property: "time",
    header: "Time",
    render: Field.dateTimeInput,
    validate: Field.nonNull,
    default: String(_.now()),
};

judgesField = {
    property: "judges",
    header: "Judges",
    render: Field.selectInput('judges', Field.get('name'), {multi: true}),
    validate: Field.nonNull,
    default: "",
};

affTeamField = {
    property: "affTeam",
    header: "Affirmative",
    render: Field.selectInput('teams', Field.get('name')),
    validate: Field.nonNull,
    default: "",
};

negTeamField = {
    property: "negTeam",
    header: "Negative",
    render: Field.selectInput('teams', Field.get('name')),
    validate: Field.nonNull,
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
