var React = require('react');
var ReactAddons = require('react/addons');
var RB = require('react-bootstrap');
var Firebase = require('firebase');

var FF = require('./form-field');
var Field = require('./field');
var DB = require('./DB');

exports.FormRow = React.createClass({
    propTypes: {
        firebase: React.PropTypes.instanceOf(Firebase).isRequired,
        path: React.PropTypes.string,
        fields: React.PropTypes.arrayOf(Field.fieldType).isRequired,
        red: React.PropTypes.func,
        green: React.PropTypes.func
    },
    getInitialState: function() {
        return {item: {}};//DB.get(this.props.firebase.child(this.props.path))};
    },
    onFieldChange: function(field) {
        return function (value) {
            var val = event.target.value;
            newItem = this.state.item;
            newItem[field.property] = val;
            console.log("newItem: " + JSON.stringify(newItem));
            this.setState({item: newItem});
        }.bind(this);
    },
    // TODO: should just use setState, which *should* take function arguments
    updateState: function(f) {
        this.setState(f(this.state, this.props));
    },
    render: function() {
        return (
            <tr>
                {this.props.fields.map(function(field, index) {
                    if (this.props.path) {
                        path = this.props.path + '/' + field.property;
                    } else {
                        path = null;
                    }
                    return (
                        <td key={index}>
                            <FF.FormField
                                key={index}
                                field={field}
                                firebase={this.props.firebase}
                                path={path}
                                onChange={this.onFieldChange(field)}
                            />
                        </td>
                    );
                }.bind(this))}
                <td>
                    <RB.Button
                        bsStyle="danger"
                        onClick={function() {
                            this.updateState(this.props.red);
                        }.bind(this)}
                        disabled={this.props.red === null}
                    >
                        {'\u2717' /* X Mark */}
                    </RB.Button>
                </td>
                <td>
                    <RB.Button
                        bsStyle="success"
                        onClick={function() {
                            this.updateState(this.props.green);
                        }.bind(this)}
                        disabled={this.props.green === null}
                    >
                        {'\u2713' /* Check Mark */}
                    </RB.Button>
                </td>
            </tr>
        );
    }
});

exports.handleError = function(action, item) {
    return function(error) {
        if (error) {
            console.log("Error on action: \'" + action + "\' for item " + item);
        } else {
            console.log("Successfully completed action: \'" + action + "\' for item " + item);
        }
    };
};
