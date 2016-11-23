import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'

class DefinitionTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      definition: props.definition,
      index: props.index
    };
  }

  render() {
    return (
      <Table.Row>
        <Table.Cell>
          {
            this.state.index > 0 ?
              <div></div> :
                <strong>{this.state.definition['_source']['word'].toUpperCase()}</strong>
          }
        </Table.Cell>
        <Table.Cell singleLine>
          {this.state.definition['_source']['type']}
        </Table.Cell>
        <Table.Cell>
          {this.state.definition['_source']['definition']}
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default DefinitionTable;
