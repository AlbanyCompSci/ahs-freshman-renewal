require('bootstrap/less/bootstrap.less');
require('react-select/less/default.less');
require('react-bootstrap-datetimepicker/css/bootstrap-datetimepicker.css');

var React = require('react');
var { Input } = require('react-bootstrap');
var Select = require('react-select');
var DateTimeField = require('react-bootstrap-datetimepicker');
var _ = require('lodash');

var { EntryTable } = require('../entry-table');

var get = function(key) {
    return function(obj) {
        return obj[key];
    };
};

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

var selectInput = function(table, show, kwargs) {
    kwargs = kwargs || {multi: false};
    return (function(value, binds, validity, onChange) {
        var options = _.transform(binds[table], function(acc, val, key) {
            acc.push({value: key, label: show(val)});
        }, []);
        // NOTE: We have to check that the key is in the current table before
        // it is loaded, this may not necessarily be the case when the app
        // is first loading, as values are added incrementally
        var values = kwargs.multi ? value.split(',') : [value]
        values = _.filter(values, function(key) {
            return _.has(binds[table], key)
        });
        var val = values.length > 0 ? values.join(',') : null
        return (
            <Select
                multi={kwargs.multi}
                value={val}
                options={options}
                onChange={onChange}
            />
        );
    });
};

var dateTimeInput = function(value, binds, validity, onChange) {
    return (<DateTimeField dateTime={value} onChange={onChange} />);
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
    render: dateTimeInput,
    validate: nonNull,
    default: String(_.now()),
};

judgesField = {
    property: "judges",
    header: "Judges",
    render: selectInput('judges', get('name'), {multi: true}),
    validate: nonNull,
    default: "",
    boundTables: {
        "judges": "judges"
    }
};

affTeamField = {
    property: "affTeam",
    header: "Affirmative",
    render: selectInput('teams', get('name')),
    validate: nonNull,
    default: "",
    boundTables: {
        "teams": "teams"
    }
};

negTeamField = {
    property: "negTeam",
    header: "Negative",
    render: selectInput('teams', get('name')),
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
