var React = require('react');

var FR = require('./form-row');
var Field = require('./field');
var DB = require('./DB');

exports.ExistingRow = React.createClass({
    propTypes: {
        firebase: React.PropTypes.instanceOf(Firebase).isRequired,
        fields: React.PropTypes.arrayOf(Field.fieldType).isRequired,
        tablePath: React.PropTypes.string.isRequired,
        itemKey: React.PropTypes.string.isRequired
    },
    render: function() {
        return (
            <FR.FormRow
                fields={this.props.fields}
                firebase={this.props.firebase}
                path={this.props.tablePath + '/values/' + this.props.itemKey}
                green={function(state, props) {
                    DB.putTable(
                        this.props.firebase.child(this.props.tablePath),
                        this.props.itemKey,
                        state.item
                    );
                    return {item: state.item};
                }.bind(this)}
                red={function(state, props) {
                    DB.deleteTable(
                        this.props.firebase.child(this.props.tablePath),
                        this.props.itemKey
                    );
                    return {item: state.item};
                }.bind(this)}
            />
        );
    }
});
