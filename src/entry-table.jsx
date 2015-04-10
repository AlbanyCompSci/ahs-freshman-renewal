// Bootstrap styling
require('bootstrap/less/bootstrap.less');

// Third-party dependencies
// React is the core framework for building, maintaining and updating
// components (chunks of HTML in the DOM)
var React = require('react');
// Bootstrap components for React
var { Button, Table } = require('react-bootstrap');
var Parse = require('parse');

// Local dependencies
// Row for creating new records
var { NewRow } = require('./new-row');
// Row for existing data
var { ExistingRow } = require('./existing-row');
// Type of field specifications
var { fieldType, bindsType } = require('./field-lib');

// Standard React Types
var Type = React.PropTypes;

// Create a new React component class
exports.EntryTable = React.createClass({
    // Specify the type of the properties supplied to the component
    propTypes: {
        // Field specifications specific to the data type
        fields: Type.arrayOf(fieldType).isRequired,
        // Data table (an object with records at each key)
        items: Type.arrayOf(Type.object).isRequired,
        binds: Type.objectOf(bindsType).isRequired,
        put: Type.func.isRequired,
        post: Type.func.isRequired,
        del: Type.func.isRequired
    },
    // Render function run each time the component is specified or its
    // state changes
    render: function() {
        return (
            <div>
                <Table> 
                    <thead>
                        <tr>
                            {
                                // Headers specific to the record type
                                this.props.fields.map(function (field, index) {
                                    return (<th key={index}>{field.header}</th>);
                                })
                            }
                            {/* Universal options */}
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // Add a row for each record in the table
                            this.props.items.map(function (item) {
                                return (
                                    <ExistingRow
                                        /* makes rendering more efficient in React */
                                        key={item.objectId}
                                        /* the value of the current record */
                                        value={item}
                                        /* the associated tables */
                                        binds={this.props.binds}
                                        /* the field specifications for the record types */
                                        fields={this.props.fields}
                                        /* function to update a record in the database */
                                        put={this.props.put}
                                        /* function to delete a record in the database */
                                        del={this.props.del}
                                    />
                                );
                            }.bind(this))
                        }
                        <NewRow
                            /* the associated tables */
                            binds={this.props.binds}
                            /* the field specifications for the record type */
                            fields={this.props.fields}
                            /* function to post a new record to the database */
                            post={this.props.post}
                        />
                    </tbody>
                </Table>
                {/* TODO */}
                <Button>Upload</Button>
            </div>
        );
    }
});
