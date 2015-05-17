var Type = require('react').PropTypes;

exports.tableType = Type.objectOf(Type.any);
exports.bindsType = Type.objectOf(exports.tableType);
