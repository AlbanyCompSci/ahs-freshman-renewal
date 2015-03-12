var React = require('react');
var ReactBootstrap = require('react-bootstrap');

var App = React.createClass({
    render: function () {
        return (
            <div>
                <h1>Hello, World!</h1>
                <h1>Goodbye</h1>
            </div>
        );
    }
});

React.render(
    <App />,
    document.getElementById('example')
);
