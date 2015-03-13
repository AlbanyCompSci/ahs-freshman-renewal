var React = require('react');
var ReactAddons = require('react/addons');
var RB = require('react-bootstrap');

var FormRow = React.createClass({
    getInitialState: function() {
        return {item: this.props.item};
    },
    onChange: function(field) {
        return function (event) {
            var val = event.target.value;
            newItem = this.state.item
            newItem[field.property] = val;
            this.setState({item: newItem});
        }
    },
    passStateThrough: function(f) {
        return (
            function() {
                console.log("Before: " + JSON.stringify(this.state));
                this.setState(f(this.props, this.state));
                console.log("After: " + JSON.stringify(this.state));
            }.bind(this)
        );
    },
    render: function() {
        return (
            <tr>
                {
                    this.props.fields.map(function(field, index) {
                        return (
                            <td key={index}>
                                {function() {
                                    var val = this.state.item[field.property];
                                    return field.render(
                                        val,
                                        field.validate(val),
                                        this.onChange(field).bind(this)
                                    );
                                }.bind(this)()}
                            </td>
                        );
                    }.bind(this))
                }
                <td>
                    <RB.Button
                        bsStyle="danger"
                        onClick={this.passStateThrough(this.props.red)}
                    >
                        {'\u2717' /* X Mark */}
                    </RB.Button>
                </td>
                <td>
                    <RB.Button
                        bsStyle="success"
                        onClick={this.passStateThrough(this.props.green)}
                    >
                        {'\u2713' /* Check Mark */}
                    </RB.Button>
                </td>
            </tr>
        );
    }
});


exports.FormRow = React.createClass({
    render: function() {
        var put = function(props, state) {
            console.log("PUT");
            return state
        };
        var fdelete = function(props, state) {
            console.log("DELETE");
            return state
        };
        return (
            <FormRow
                { ...this.props }
                green={put}
                red={fdelete}
            />
        );
    }
});

var defaultItem = function(fields) {
    item = {};
    fields.map(function(field) {
        item[field.property] = field.default;
    });
    return item;
};

exports.NewRow = React.createClass({
    render: function() {
        var post = function(props, state) {
            console.log("POST");
            return defaultItem(props.fields);
        };
        var clear = function(props, state) {
            console.log("CLEAR");
            return defaultItem(props.fields);
        };
        return (
            <FormRow
                { ...this.props }
                item={defaultItem(this.props.fields)}
                green={post}
                red={clear}
            />
        );
    },
});
