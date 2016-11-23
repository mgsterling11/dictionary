import React, { Component } from 'react';
import Suggestion from './Suggestion'
import './App.css';

class SuggestionsBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      suggestionsToDisplay: props.suggestions
    };
  }

  componentWillReceiveProps(props) {
    this.setState({suggestionsToDisplay: props.suggestions});
  }

	render() {
    const suggestions = this.state.suggestionsToDisplay.map((object, i) => (
      <div key={object['_id']}>
        <Suggestion suggestion={object} />
      </div>
    ));

    if (this.state.suggestionsToDisplay.length !== 0) {
      return (
        <ul>
          {suggestions}
        </ul>
      );
    } else {
      return (
  	    <div></div>
  	  )
    }
  }
}

export default SuggestionsBox;
