require('bootstrap/less/bootstrap.less');
require('react-select/less/default.less');
require('react-bootstrap-datetimepicker/css/bootstrap-datetimepicker.css');

var React = require('react'); //Needed for react-bootstrap
var { Input } = require('react-bootstrap');
var Select = require('react-select');
var DateTimeField = require('react-bootstrap-datetimepicker');
var Parse = require('parse').Parse;
var _ = require('lodash');

var Type = require('react').PropTypes;

exports.fieldType = Type.shape({
    property: Type.string.isRequired,
    header: Type.string.isRequired,
    render: Type.func.isRequired,
    validate: Type.func.isRequired,
    default: Type.any.isRequired,
    binds: Type.objectOf(Type.instanceOf(Parse.Query))
});

exports.bindsType = Type.objectOf(Type.arrayOf(Type.object));

exports.get = function(key) {
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

exports.textInput = function(value, binds, validity, onChange) {
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

exports.selectInput = function(table, show, kwargs) {
    kwargs = kwargs || {multi: false};
    return (function(value, binds, validity, onChange) {
        var options = _.map(binds[table], function(item) {
            return {value: item.id, label: show(item)};
        });
        console.log('table: ' + table);
        console.log('options: ' + JSON.stringify(options));
        console.log('value: ' + JSON.stringify(value));
        // NOTE: We have to check that the key is in the current table before
        // it is loaded, this may not necessarily be the case when the app
        // is first loading, as values are added incrementally
        var values = kwargs.multi ? value : [value]
        console.log('values: ' + JSON.stringify(values));
        values = _.filter(values, function(value) {
            return _(options).pluck('value').contains(value);
        });
        console.log('values: ' + JSON.stringify(values));
        val = values.length > 0 ? values.join(',') : null
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

exports.dateTimeInput = function(value, binds, validity, onChange) {
    return (<DateTimeField dateTime={value} onChange={onChange} />);
};

exports.nonNull = function(v) {
    return (v && v !== null && v.length > 0);
};
