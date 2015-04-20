var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
var _ = require('lodash');

var Field = require('../field-lib');
var { EntryTable } = require('../entry-table');
var { Debate, User, Team } = require('../db');

titleField = {
    property: "title",
    header: "Title",
    render: Field.textInput,
    validate: function(v) {
        return ((v !== "New Debate") && (v.length > 0));
    },
    default: "New Debate",
    binds: {}
};

locationField = {
    property: "location",
    header: "Location",
    render: Field.selectInput('locations', Field.get('name')),
    validate: Field.nonNull,
    default: "",
    binds: function() {
        var query = new Parse.Query('Location');
        return {locations: query};
    }()
};

timeField = {
    property: "time",
    header: "Time",
    render: Field.dateTimeInput,
    validate: Field.nonNull,
    default: new Date(),
    binds: {}
};

judgesField = {
    property: "judges",
    header: "Judges",
    render: Field.selectInput('judges', Field.get('name'), {multi: true}),
    validate: Field.nonNull,
    default: "",
    binds: {judges: new Parse.Query(User) /*TODO: limit to judges*/}
};

affTeamField = {
    property: "affirmative",
    header: "Affirmative",
    render: Field.selectInput('teams', Field.get('name')),
    validate: Field.nonNull,
    default: "",
    binds: {teams: new Parse.Query(Team)}
};

negTeamField = {
    property: "negative",
    header: "Negative",
    render: Field.selectInput('teams', Field.get('name')),
    validate: Field.nonNull,
    default: "",
    binds: {teams: new Parse.Query(Team)}
};

var fields = [
    titleField,
    locationField,
    timeField,
    judgesField,
    affTeamField,
    negTeamField
];

var post = function(data) {
    ParseReact.Mutation.Create(Debate, data).dispatch();
};
var put = function(id, data) {
    ParseReact.Mutation.Set(id, data).dispatch();
};
var del = function(id) {
    ParseReact.Mutation.Destroy(id).dispatch();
}

exports.name = 'debates';
exports.title = 'Debates';
exports.bindSpec = {
    items: new Parse.Query(Debate),
    fields: _.zipObject(
        _.pluck(fields, 'property'),
        _.pluck(fields, 'binds')
    )
};
exports.body = function(binds) {
    return (
        <EntryTable
            fields={fields}
            items={binds.items}
            binds={binds.fields}
            put={put}
            post={post}
            del={del}
        />
    );
};
