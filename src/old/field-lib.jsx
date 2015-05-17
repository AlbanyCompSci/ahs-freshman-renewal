require('bootstrap/less/bootstrap.less');
require('react-select/less/default.less');
require('react-bootstrap-datetimepicker/css/bootstrap-datetimepicker.css');

import * as React from 'react'; //Needed for react-bootstrap
import { Input } from 'react-bootstrap';
import * as Select from 'react-select';
import * as DateTimeField from 'react-bootstrap-datetimepicker';
import { Parse } from 'parse';
import * as _ from 'lodash';

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
            return {value: item.objectId, label: show(item)};
        });
        // NOTE: We have to check that the key is in the current table before
        // it is loaded, this may not necessarily be the case when the app
        // is first loading, as values are added incrementally
        var values = kwargs.multi ? value : [value]
        values = _.filter(values, function(value) {
            return _(options).pluck('value').contains(value);
        });
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
    var val = String(value.getTime());
    return (<DateTimeField dateTime={val} onChange={onChange} />);
};

exports.nonNull = function(v) {
    return (v && v !== null && v.length > 0);
};
