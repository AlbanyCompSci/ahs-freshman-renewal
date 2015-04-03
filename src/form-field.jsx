require('bootstrap/less/bootstrap.less');

var React = require('react');

var { bindsType } = require('./types');
var { fieldType } = require('./field-lib');

var Type = React.PropTypes;

exports.FormField = React.createClass({
    propTypes: {
        value: Type.any.isRequired,
        binds: bindsType.isRequired,
        field: fieldType.isRequired,
        onChange: Type.func.isRequired
    },
    getInitialState: function() {
        return {value: this.props.value};
    },
    onChange: function(newValue) {
        this.props.onChange(newValue);
        this.setState({value: newValue});
    },
    render: function() {
        return this.props.field.render(
            this.state.value,
            this.props.binds,
            this.props.field.validate(this.state.value),
            this.onChange
        );
    }
});
