require('bootstrap/less/bootstrap.less');

var React = require('react');
var { Table } = require('react-bootstrap');
var Firebase = require('firebase');

var { NewRow } = require('./new-row');
var { ExistingRow } = require('./existing-row');
var { fieldType, tableType, bindsType } = require('./types');

var Type = React.PropTypes;

exports.EntryTable = React.createClass({
    propTypes: {
        fields: Type.arrayOf(fieldType).isRequired,
        table: tableType.isRequired,
        binds: bindsType.isRequired,
        firebase: Type.instanceOf(Firebase).isRequired
    },
    render: function() {
        return (
            <Table responsive>
                <thead>
                    <tr>
                        {
                            this.props.fields.map(function (field, index) {
                                return (<th key={index}>{field.header}</th>);
                            })
                        }
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(this.props.table).map(function (key) {
                        return (
                            <ExistingRow
                                key={key}
                                value={this.props.table[key]}
                                binds={this.props.binds}
                                fields={this.props.fields}
                                firebase={this.props.firebase.child(key)}
                            />
                        );
                    }.bind(this))}
                    <NewRow
                        binds={this.props.binds}
                        fields={this.props.fields}
                        firebase={this.props.firebase}
                    />
                </tbody>
            </Table>
        );
    }
});
