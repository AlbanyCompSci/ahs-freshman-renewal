require('bootstrap/less/bootstrap.less');
require('react-select/less/default.less');
require('react-bootstrap-datetimepicker/css/bootstrap-datetimepicker.css');

var React = require('react'); //Needed for react-bootstrap
var { Input } = require('react-bootstrap');
var Select = require('react-select');
var DateTimeField = require('react-bootstrap-datetimepicker');
var _ = require('lodash');

var Type = require('react').PropTypes;

exports.fieldType = Type.shape({
    property: Type.string.isRequired,
    header: Type.string.isRequired,
    render: Type.func.isRequired,
    validate: Type.func.isRequired,
    default: Type.any.isRequired
});

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

exports.dateTimeInput = function(value, binds, validity, onChange) {
    return (<DateTimeField dateTime={value} onChange={onChange} />);
};

exports.nonNull = function(v) {
    return (v && v !== null && v.length > 0);
};
