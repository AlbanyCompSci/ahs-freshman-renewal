var React = require('react');
var RB = require('react-bootstrap');

var FR = require('./form-row');

exports.EntryTable = React.createClass({
    getInitialState: function () {
        return (
            { "items": [
                  {
                      "title": "Guns",
                      "location": "Little Theatre",
                      "time": "20150320T110000",
                      "judges": [1131,2439],
                      "affTeam": 1238,
                      "negTeam": 3245
                  },
                  {
                      "title": "Germs",
                      "location": "Library",
                      "time": "20150320T110000",
                      "judges": [1131,2439],
                      "affTeam": 1238,
                      "negTeam": 3245
                  }
              ]
            }
        );
    },
    render: function() {
        return (
            <RB.Table responsive>
                <thead>
                    <tr>
                        {
                            this.props.fields.map(function (field, index) {
                                return <th key={index}>{field.header}</th>;
                            })
                        }
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.items.map(function (item, index) {
                        return (
                            <FR.FormRow
                                key={index}
                                item={item}
                                fields={this.props.fields}
                            />
                        );
                    }.bind(this))}
                    <FR.NewRow fields={this.props.fields} />
                </tbody>
            </RB.Table>
        );
    }
});
