require('bootstrap/less/bootstrap.less');

var React = require('react');
var ReactAddons = require('react/addons');
var { Button, Glyphicon } = require('react-bootstrap');
var _ = require('lodash');

var { FormField } = require('./form-field');
var { fieldType, bindsType } = require('./field-lib');

var Type = React.PropTypes;

exports.FormRow = React.createClass({
    propTypes: {
        value: Type.object.isRequired,
        binds: Type.objectOf(bindsType).isRequired,
        fields: Type.arrayOf(fieldType).isRequired,
        red: Type.func,
        green: Type.func
    },
    getInitialState: function() {
        return {item: this.props.value};
    },
    onFieldChange: function(field) {
        return function (newValue) {
            newItem = _.clone(this.state.item);
            newItem[field.property] = newValue;
            this.setState({item: newItem});
        }.bind(this);
    },
    // TODO: should just use setState, which *should* take function arguments
    updateState: function(f) {
        this.setState(f(this.state, this.props));
    },
    validates: function(item) {
        return _.reduce(this.props.fields, function(acc, field) {
            return field.validate(item[field.property]) && acc;
        }, true);
    },
    render: function() {
        return (
            <tr>
                {this.props.fields.map(function(field, index) {
                    var width = (1 / this.props.fields.length) * 100
                    return (
                        <td key={index} width={width + '%'}>
                            <FormField
                                key={index}
                                value={this.state.item[field.property]}
                                binds={this.props.binds[field.property]}
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
                    <Glyphicon glyph='remove' />
                    </Button>
                </td>
                <td>
                    <Button
                        bsStyle="success"
                        onClick={function() {
                            if (this.validates(this.state.item)) {
                                this.updateState(this.props.green);
                            } else {
                                alert('Validation failed');
                            }
                        }.bind(this)}
                        disabled={this.props.green === null}
                    >
                    <Glyphicon glyph='ok' />
                    </Button>
                </td>
            </tr>
        );
    }
});
