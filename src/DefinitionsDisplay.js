import React, { Component } from 'react';
import _ from 'lodash';
import Definition from './Definition';

class DefinitionsDisplay extends Component {

  constructor(props) {
    super(props);

    var uniqueWords = this.uniqueWords(props)
    var groupedDefinitions = this.groupedDefinitions(props);

    this.state = {
      definitions: props.definitions,
      dictionaryEntries: uniqueWords,
      groupedDefinitions: groupedDefinitions
    };
  }

  groupedDefinitions(props) {
    return _.groupBy(props.definitions, function(object) {
      return object['_source']['word']
    });
  }

  uniqueWords(props) {
    return _.uniq(props.definitions.map((object, i) =>
      (object['_source']['word'])
    ));
  }

  render() {
    const definitionComponents = this.state.dictionaryEntries.map(function(word, index) {
      var groupedDefinitions = this.state.groupedDefinitions[word];

      return (
        <div key={index}>
          <Definition definitions={groupedDefinitions} key={index} />
        </div>
      )
    }.bind(this));

    return (
      <ul>
        {definitionComponents}
      </ul>
    )
  }
}

export default DefinitionsDisplay;
