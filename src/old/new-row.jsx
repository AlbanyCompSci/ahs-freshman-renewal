require('bootstrap/less/bootstrap.less');

var React = require('react');

var { FormRow } = require('./form-row');
var { fieldType, bindsType } = require('./field-lib');

var Type = React.PropTypes;

exports.NewRow = React.createClass({
    propTypes: {
        fields: Type.arrayOf(fieldType).isRequired,
        binds: Type.objectOf(bindsType).isRequired,
        post: Type.func.isRequired
    },
    componentWillMount: function() {
        this.defaultRow = _.zipObject(
            _.pluck(this.props.fields, 'property'),
            _.pluck(this.props.fields, 'default')
        );
    },
    render: function() {
        return (
            <FormRow
                fields={this.props.fields}
                value={this.defaultRow}
                binds={this.props.binds}
                green={function (state, props) {
                    this.props.post(state.item);
                    return {item: this.defaultRow};
                }.bind(this)}
                red={null}
            />
        );
    },
});
