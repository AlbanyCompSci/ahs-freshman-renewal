var React = require('react');
var ReactAddons = require('react/addons');
var { Button } = require('react-bootstrap');
var Underscore = require('underscore');

var { FormField } = require('./form-field');
var { fieldType, bindsType } = require('./types');

var Type = React.PropTypes;

exports.FormRow = React.createClass({
    propTypes: {
        value: Type.object.isRequired,
        binds: bindsType.isRequired,
        fields: Type.arrayOf(fieldType).isRequired,
        red: Type.func,
        green: Type.func
    },
    getInitialState: function() {
        return {item: this.props.value};
    },
    onFieldChange: function(field) {
        return function (value) {
            var val = event.target.value;
            newItem = this.state.item;
            newItem[field.property] = val;
            this.setState({item: newItem});
        }.bind(this);
    },
    // TODO: should just use setState, which *should* take function arguments
    updateState: function(f) {
        this.setState(f(this.state, this.props));
    },
    validates: function(item) {
        return Underscore.reduce(this.props.fields, function(acc, field) {
            return field.validate(item[field.property]) && acc;
        }, true);
    },
    render: function() {
        return (
            <tr>
                {this.props.fields.map(function(field, index) {
                    return (
                        <td key={index}>
                            <FormField
                                key={index}
                                value={this.state.item[field.property]}
                                binds={this.props.binds}
                                field={field}
                                onChange={this.onFieldChange(field)}
                            />
                        </td>
                    );
                }.bind(this))}
                <td>
                    <Button
                        bsStyle="danger"
                        onClick={function() {
                            this.updateState(this.props.red);
                        }.bind(this)}
                        disabled={this.props.red === null}
                    >
                        {'\u2717' /* X Mark */}
                    </Button>
                </td>
                <td>
                    <Button
                        bsStyle="success"
                        onClick={function() {
                            if (this.validates(this.state.item)) {
                                this.updateState(this.props.green);
                            }
                        }.bind(this)}
                        disabled={this.props.green === null}
                    >
                        {'\u2713' /* Check Mark */}
                    </Button>
                </td>
            </tr>
        );
    }
});
