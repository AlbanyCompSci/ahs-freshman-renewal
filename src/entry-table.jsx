// Bootstrap styling
require('bootstrap/less/bootstrap.less');

// Third-party dependencies
// React is the core framework for building, maintaining and updating
// components (chunks of HTML in the DOM)
var React = require('react');
// Bootstrap components for React
var { Table } = require('react-bootstrap');
// Firebase client
var Firebase = require('firebase');

// Local dependencies
// Row for creating new records
var { NewRow } = require('./new-row');
// Row for existing data
var { ExistingRow } = require('./existing-row');
// Types for data structure
var { tableType, bindsType } = require('./types');
// Type of field specifications
var { fieldType } = require('./field-lib');

// Standard React Types
var Type = React.PropTypes;

// Create a new React component class
exports.EntryTable = React.createClass({
    // Specify the type of the properties supplied to the component
    propTypes: {
        // Field specifications specific to the data type
        fields: Type.arrayOf(fieldType).isRequired,
        // Data table (an object with records at each key)
        table: tableType.isRequired,
        // An object of associated data tables (e.g. for providing options in
        // a select field)
        binds: bindsType.isRequired,
        // The Firebase client instance
        firebase: Type.instanceOf(Firebase).isRequired
    },
    // Render function run each time the component is specified or its
    // state changes
    render: function() {
        return (
            // A table that scales (is responsive to) to width of the client's
            // screen
            <Table responsive>
                <thead>
                    <tr>
                        {
                            // Headers specific to the record type
                            this.props.fields.map(function (field, index) {
                                return (<th key={index}>{field.header}</th>);
                            })
                        }
                        /* Universal options */
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // Add a row for each record in the table
                        Object.keys(this.props.table).map(function (key) {
                            return (
                                <ExistingRow
                                    /* makes rendering more efficient in React */
                                    key={key}
                                    /* the value of the current record */
                                    value={this.props.table[key]}
                                    /* the associated tables */
                                    binds={this.props.binds}
                                    /* the field specifications for the record types */
                                    fields={this.props.fields}
                                    /* the firebase reference for the current record */
                                    firebase={this.props.firebase.child(key)}
                                />
                            );
                        }.bind(this))
                    }
                    <NewRow
                        /* the associated tables */
                        binds={this.props.binds}
                        /* the field specifications for the record type */
                        fields={this.props.fields}
                        /* the firebase reference for the table */
                        firebase={this.props.firebase}
                    />
                </tbody>
            </Table>
        );
    }
});
