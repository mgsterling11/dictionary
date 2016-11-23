import React, { Component } from 'react';

class Suggestion extends Component {

  constructor(props) {
    super(props);

    this.state = {
      suggestion: props.suggestion
    };
  }

	render() {
    return (
      <div>
        {this.state.suggestion['_source']['word']}:
        {this.state.suggestion['_source']['definition']}
        <br />
        <br />
      </div>
    );
  }
}

export default Suggestion;
