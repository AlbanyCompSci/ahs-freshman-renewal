require('bootstrap/less/bootstrap.less');

var React = require('react');
var Firebase = require('firebase');

var { FormRow } = require('./form-row');
var { fieldType, bindsType } = require('./types');

var Type = React.PropTypes;

exports.ExistingRow = React.createClass({
    propTypes: {
        fields: Type.arrayOf(fieldType).isRequired,
        value: Type.object.isRequired,
        binds: bindsType.isRequired,
        firebase: Type.instanceOf(Firebase).isRequired
    },
    render: function() {
        return (
            <FormRow
                fields={this.props.fields}
                value={this.props.value}
                binds={this.props.binds}
                green={function(state, props) {
                    this.props.firebase.set(state.item);
                    return {item: state.item};
                }.bind(this)}
                red={function(state, props) {
                    this.props.firebase.remove();
                    return {item: state.item};
                }.bind(this)}
            />
        );
    }
});
