var React = require('react');
var Firebase = require('firebase');

var Field = require('./field');

exports.FormField = React.createClass({
    propTypes: {
        firebase: React.PropTypes.instanceOf(Firebase).isRequired,
        field: Field.fieldType.isRequired,
        path: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired,
    },
    getInitialState: function() {
        boundTables = {};
        for (var k in this.props.field.boundTables) {
            boundTables[k] = [];
        }
        return {
            value: this.props.field.default,
            boundTables: boundTables
        };
    },
    componentWillMount: function() {
        if (this.props.path) {
            this.props.firebase.child(this.props.path).on("value",
                function(snap) {
                    if (snap && snap.val()) {
                        this.props.onChange(snap.val());
                        this.setState({value: snap.val()});
                    }
                }.bind(this)
            );
        }
        for (var k in this.props.field.boundTables) {
            table = this.props.field.boundTables[k];
            this.props.firebase.child(table).child("values").on("value",
                function(snap) {
                    boundTables = this.state.boundTables;
                    boundTables[k] = snap.val();
                    this.setState({boundTables: boundTables});
                }.bind(this)
            );
        }
    },
    onChange: function(event) {
        this.props.onChange(event);
        var val = event.target.value;
        this.setState({value: val});
    },
    render: function() {
        return this.props.field.render(
            this.state.value,
            this.props.field.validate(this.state.value),
            this.onChange
        );
    }
});
