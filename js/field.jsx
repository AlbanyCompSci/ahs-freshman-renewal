var React = require('react');

exports.fieldType = React.PropTypes.shape({
    property: React.PropTypes.string.isRequired,
    header: React.PropTypes.string.isRequired,
    render: React.PropTypes.func.isRequired,
    validate: React.PropTypes.func.isRequired,
    default: React.PropTypes.any.isRequired,
    boundTables: React.PropTypes.object.isRequired
});
