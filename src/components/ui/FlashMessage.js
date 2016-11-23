import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';

class FlashMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchWord: props.searchWord
    };
  }

  render() {
    return (
      <Message
        color="red"
        header={"Bummer! Unable to find a definition for " + this.state.searchWord}
        content="Check out the suggestions below or try another search"
      />
    )
  }
}

export default FlashMessage;
