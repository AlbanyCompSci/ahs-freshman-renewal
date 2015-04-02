var css = require('bootstrap/less/bootstrap.less');

var React = require('react');
var RB = require('react-bootstrap');
var Firebase = require('firebase');
var _ = require('lodash');

var FIREBASE_ROOT = "https://ahs-freshman-renewal.firebaseio.com";

var tabs = [
    require('./tabs/home'),
    require('./tabs/debates')
    //require('./tabs/teams');
    //require('./tabs/debaters');
    //require('./tabs/judges');
    //require('./tabs/teachers');
    //require('./tabs/judge-debate');
];

var App = React.createClass({
    binds: function() {
        var tabBinds = function(tab) {
            return _.values(tab.binds);
        };
        // List all bindings (as child paths) in the tabs
        var binds = _.reduce(
            _.map(tabs, tabBinds),
            function(a,b) { return a.concat(b) }
        );
        return binds;
    },
    getInitialState: function() {
        var initState = {binds: {}};
        _.map(this.binds(), function(bind) {
            initState.binds[bind] = {};
        });
        return initState;
    },
    componentWillMount: function () {
        this.firebase = new Firebase(FIREBASE_ROOT);
        _.map(this.binds(), function(bind) {
            table = this.firebase.child(bind);
            table.on('child_added', function(dataSnapshot) {
                allBinds = _.clone(this.state.binds);
                allBinds[bind] = _.clone(allBinds[bind]);
                allBinds[bind][dataSnapshot.key()] = dataSnapshot.val();
                this.setState({binds: allBinds});
            }.bind(this));
            table.on('child_removed', function(dataSnapshot) {
                allBinds = _.clone(this.state.binds);
                allBinds[bind] = _.clone(allBinds[bind]);
                delete allBinds[bind][dataSnapshot.key()];
                this.setState({binds: allBinds});
            }.bind(this));
        }.bind(this));
    },
    componentWillUnmount: function() {
        this.firebase.off();
    },
    render: function () {
        var specificBinds = function(binds) {
            specBinds = {};
            for (var k in binds) {
                specBinds[k] = this.state.binds[binds[k]];
            }
            return specBinds;
        }.bind(this);
        var panes = tabs.map(function(tab, index) {
            return (
                <RB.TabPane key={index} eventKey={index} tab={tab.title}>
                    {tab.body(specificBinds(tab.binds), this.firebase)}
                </RB.TabPane>
            );
        }.bind(this));
        return (<RB.TabbedArea defaultActiveKey={0}>{panes}</RB.TabbedArea>);
    }
});

React.render(
    <App />,
    document.getElementById('example')
);
