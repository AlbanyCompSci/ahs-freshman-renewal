var React = require('react');

var FR = require('./form-row');
var DB = require('./DB');

exports.NewRow = React.createClass({
    propTypes: {
        firebase: React.PropTypes.instanceOf(Firebase).isRequired,
        tablePath: React.PropTypes.string.isRequired
    },
    render: function() {
        return (
            <FR.FormRow
                fields={this.props.fields}
                firebase={this.props.firebase}
                path={null}
                green={function (state, props) {
                    DB.postTable(
                        this.props.firebase.child(this.props.tablePath),
                        state.item
                    );
                    return {item: null};
                }.bind(this)}
                red={null}
            />
        );
    },
});
