require('bootstrap/less/bootstrap.less');

var React = require('react');

exports.name = "home";
exports.binds = {};
exports.title = "Home";
exports.body = function(firebase) {
    return <h1>Welcome to the Albany High School Freshman Debates!</h1>;
};
