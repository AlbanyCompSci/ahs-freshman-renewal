var Parse = require('parse').Parse;
var _ = require('lodash');
// deterministic conversion of objects to strings
var stringify = require('json-stable-stringify');

exports.Debate = Parse.Object.extend('Debate');
exports.Team = Parse.Object.extend('Team');
exports.User = Parse.Object.extend('User');
exports.Score = Parse.Object.extend('Score');
exports.Evaluation = Parse.Object.extend('Evaluation');

var badBind = function(spec, k) {
    console.log('Bind value ' + stringify(spec[k]) + ' at key ' + k + ' is not of a recognized bind type.');
}

var hashQuery = function(q) {
    return stringify(_.assign({className: q.className}, q.toJSON()));
}

// Condense all bound queries into a flat dictionary of bindings, this reduces
// the number or observed queries and consequently requests made to Parse
// TODO: allow merging of queries to the same table with different parameters
exports.makeObserves = function(spec) {
    return _.reduce(spec, function(observes, val, key) {
        // If the value (val) at the current key is a query, add it to the
        // observed queries under its hash, this means that queries with
        // equal hashes (and that are equal themselves) will not be repeated
        // in the observes.
        if (val instanceof Parse.Query) {
            var curr = {};
            curr[hashQuery(val)] = val;
            return _.assign(observes, curr);
        }
        // If the value is another type of object, we assume that the object
        // is a dictionary specifying binds, which make the observes for and
        // merge them with the current observes. This ensures that observes
        // remains flat.
        else if (val instanceof Object) {
            return _.assign(observes, exports.makeObserves(val));
        }
        // Otherwise, the specification is badly formatted and we log the
        // error to the console.
        else {
            badBind(spec, key);
        }
    }, {});
};

exports.makeBinds = function(spec, observed) {
    return _.mapValues(spec, function(val, key) {
        // If the value (val) is a query, bind the queries result in observed
        // at the query's hash.
        if (val instanceof Parse.Query) {
            return observed[hashQuery(val)];
        }
        // If the value (val) is another type of object, we assume it is a
        // dictionary specifying binds, and build it from the observed query
        // results.
        else if (val instanceof Object) {
            return exports.makeBinds(val, observed);
        }
        // Otherwise, the specification is badly formatted and we log the
        // error to the console.
        else {
            badBind(spec, key);
        }
    });
};
