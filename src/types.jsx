var Type = require('react').PropTypes;

exports.fieldType = Type.shape({
    property: Type.string.isRequired,
    header: Type.string.isRequired,
    render: Type.func.isRequired,
    validate: Type.func.isRequired,
    default: Type.any.isRequired,
    boundTables: Type.object.isRequired
});

exports.tableType = Type.objectOf(Type.object);
exports.bindsType = Type.objectOf(exports.tableType);
