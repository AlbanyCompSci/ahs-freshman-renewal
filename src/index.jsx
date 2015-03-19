var React = require('react');
var RB = require('react-bootstrap');
var Firebase = require('firebase');

var App = React.createClass({
    componentWillMount: function () {
        this.tabs = [
            //Home,
            require('./tabs/home'),
            require('./tabs/debates')
            //require('./tabs/teams');
            //require('./tabs/debaters');
            //require('./tabs/judges');
            //require('./tabs/teachers');
            //require('./tabs/judge-debate');
        ];
        FIREBASE_ROOT = "https://ahs-freshman-renewal.firebaseio.com";
        this.firebase = new Firebase(FIREBASE_ROOT);
    },
    render: function () {
        var panes = this.tabs.map(function(tab, index) {
            return (
                <RB.TabPane key={index} eventKey={index} tab={tab.title}>
                    {tab.body(this.firebase)}
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
