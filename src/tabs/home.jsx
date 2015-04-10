require('bootstrap/less/bootstrap.less');

var React = require('react');

exports.name = "home";
exports.bindSpec = {};
exports.title = "Home";
exports.body = function(binds) {
    return <h1>Welcome to the Albany High School Freshman Debates!</h1>;
};
