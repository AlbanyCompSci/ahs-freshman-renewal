require('bootstrap/less/bootstrap.less');

var React = require('react');
var ParseReact = require('parse-react');

var { FormRow } = require('./form-row');
var { fieldType, bindsType } = require('./field-lib');

var Type = React.PropTypes;

exports.ExistingRow = React.createClass({
    propTypes: {
        fields: Type.arrayOf(fieldType).isRequired,
        value: Type.object.isRequired,
        binds: Type.objectOf(bindsType).isRequired,
        put: Type.func.isRequired,
        del: Type.func.isRequired
    },
    render: function() {
        return (
            <FormRow
                fields={this.props.fields}
                value={this.props.value}
                binds={this.props.binds}
                green={function(state, props) {
                    this.props.put(state.item.id, state.item);
                    return {item: state.item};
                }.bind(this)}
                red={function(state, props) {
                    this.props.del(state.item.id);
                    return {item: state.item};
                }.bind(this)}
            />
        );
    }
});
