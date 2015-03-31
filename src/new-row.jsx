var React = require('react');

var { FormRow } = require('./form-row');
var { fieldType, bindsType } = require('./types');

var Type = React.PropTypes;

exports.NewRow = React.createClass({
    propTypes: {
        fields: Type.arrayOf(fieldType).isRequired,
        binds: bindsType.isRequired,
        firebase: Type.instanceOf(Firebase).isRequired
    },
    componentWillMount: function() {
        this.defaultRow = {};
        this.props.fields.map(function(f) {
            this.defaultRow[f.property] = f.default;
        }.bind(this));
    },
    render: function() {
        return (
            <FormRow
                fields={this.props.fields}
                value={this.defaultRow}
                binds={this.props.binds}
                green={function (state, props) {
                    this.props.firebase.push(state.item);
                    return {item: state.item};
                }.bind(this)}
                red={null}
            />
        );
    },
});
