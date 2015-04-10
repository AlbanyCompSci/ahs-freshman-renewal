require('bootstrap/less/bootstrap.less');

var React = require('react');
var {TabbedArea, TabPane} = require('react-bootstrap');
var Parse = require('parse').Parse;
var ReactParse = require('parse-react');
var _ = require('lodash');

var Config = require('../config');
var DB = require('./db');

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
    mixins: [ReactParse.Mixin],
    getInitialState: function() {
        return {key: 0};
    },
    componentWillMount: function() {
        Parse.initialize(
            Config.PARSE_APPLICATION_ID,
            Config.PARSE_JAVASCRIPT_KEY
        );
    },
    componentDidMount: function() {
        document.title = 'AHS Freshman Debates';
    },
    observe: function(nextProps, nextState) {
        var observes = DB.makeObserves(tabs[nextState.key].bindSpec);
        return observes;
    },
    onSelect: function(key) {
        this.setState({key: key});
    },
    render: function () {
        var panes = tabs.map(function(tab, index) {
            // If the tab is not currently selected, we are not observing its
            // bindings and so we cannot render it.
            body = null;
            if (this.state.key === index) {
                var binds = DB.makeBinds(
                    tabs[this.state.key].bindSpec,
                    this.data
                );
                body = tab.body(binds);
            }
            return (
                <TabPane key={index} eventKey={index} tab={tab.title}>
                    {body}
                </TabPane>
            );
        }.bind(this));
        return (
            <TabbedArea activeKey={this.state.key} onSelect={this.onSelect}>
                {panes}
            </TabbedArea>
        );
    }
});

React.render(
    <App />,
    document.body
);
