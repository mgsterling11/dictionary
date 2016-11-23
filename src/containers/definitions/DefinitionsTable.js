import React, { Component } from 'react';
import DefinitionRow from '../../components/definitions/DefinitionRow';
import { Table, Container } from 'semantic-ui-react'
import _ from 'lodash';
import Break from '../../components/ui/Break';

class DefinitionsTable extends Component {

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

      return groupedDefinitions.map(function(definition, index) {
        return (
          <DefinitionRow key={index}
            definition={definition}
            index={index} />
        )
      })
    }.bind(this))

    return (
      <Container>
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>Word</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Definition</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {definitionComponents}
          </Table.Body>
        </Table>
        <Break />
      </Container>
    )
  }
}

export default DefinitionsTable;
