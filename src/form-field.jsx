var React = require('react');

var { fieldType, bindsType } = require('./types');

var Type = React.PropTypes;

exports.FormField = React.createClass({
    propTypes: {
        value: Type.any.isRequired,
        binds: bindsType.isRequired,
        field: fieldType.isRequired,
        onChange: Type.func.isRequired,
    },
    getInitialState: function() {
        return {value: this.props.value};
    },
    onChange: function(event) {
        this.props.onChange(event);
        var val = event.target.value;
        this.setState({value: val});
    },
    render: function() {
        return this.props.field.render(
            this.state.value,
            this.state.binds,
            this.props.field.validate(this.state.value),
            this.onChange
        );
    }
});
