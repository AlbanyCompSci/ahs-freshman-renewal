var React = require('react');
var RB = require('react-bootstrap');

var Home = require('./tabs/home');
var Debates = require('./tabs/debates');
/*
var Teams = require('./tabs/teams');
var Debaters = require('./tabs/debaters');
var Judges = require('./tabs/judges');
var Teachers = require('./tabs/teachers');
var JudgeDebate = require('./tabs/judge-debate');
*/

var App = React.createClass({
    componentWillMount: function () {
        this.tabs = [
            Home,
            Debates
            /*
            Teams,
            Debaters,
            Judges,
            Teachers,
            JudgeDebate
            */
        ];
    },
    render: function () {
        var panes = this.tabs.map(function(tab, index) {
            return (
                <RB.TabPane key={index} eventKey={index} tab={tab.title}>
                    {tab.body}
                </RB.TabPane>
            );
        });
        return (<RB.TabbedArea defaultActiveKey={1}>{panes}</RB.TabbedArea>);
    }
});

React.render(
    <App />,
    document.getElementById('example')
);
