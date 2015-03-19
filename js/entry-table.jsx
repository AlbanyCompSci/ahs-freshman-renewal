var React = require('react');
var RB = require('react-bootstrap');
var Firebase = require('firebase');
//var ReactFire = require('reactfire');

var NR = require('./new-row');
var ER = require('./existing-row');
var Field = require('./field');

exports.EntryTable = React.createClass({
    mixins: [ReactFireMixin],
    propTypes: {
        firebase: React.PropTypes.instanceOf(Firebase).isRequired,
        tablePath: React.PropTypes.string.isRequired,
        fields: React.PropTypes.arrayOf(Field.fieldType).isRequired
    },
    getInitialState: function() {
        return {itemKeys: []}
    },
    componentWillMount: function() {
        this.bindAsArray(
            this.props.firebase.child(this.props.tablePath).child('keys'),
            "itemKeys"
        );
    },
    render: function() {
        return (
            <RB.Table responsive>
                <thead>
                    <tr>
                        {
                            this.props.fields.map(function (field, index) {
                                return <th key={index}>{field.header}</th>;
                            })
                        }
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.itemKeys.map(function (key) {
                        return (
                            <ER.ExistingRow
                                key={key}
                                itemKey={key}
                                fields={this.props.fields}
                                firebase={this.props.firebase}
                                tablePath={this.props.tablePath}
                            />
                        );
                    }.bind(this))}
                    <NR.NewRow
                        fields={this.props.fields}
                        firebase={this.props.firebase}
                        tablePath={this.props.tablePath}
                    />
                </tbody>
            </RB.Table>
        );
    }
});
