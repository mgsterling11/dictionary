import React, { Component } from 'react';
import _ from 'lodash';

class Definition extends Component {

  constructor(props) {
    super(props);

    this.state = {
      definitions: props.definitions,
      word: props.definitions[0]['_source']['word']
    };
  }

	render() {
    var definitions = this.state.definitions.map(function(definition, index) {
      return (
        <div key={index}>
          {definition['_source']['type']}: {definition['_source']['definition']}
          <br />
          <br />
        </div>
      );
    })

    return (
      <div>
        {this.state.word.toUpperCase()}
        {definitions}
      </div>
    )
  }
}

export default Definition;
