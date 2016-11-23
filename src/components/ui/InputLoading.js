import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

class InputLoading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputCharacters: props.inputCharacters
    };

    this.timedLoader = this.timedLoader.bind(this);
  }

  componentWillReceiveProps(newInput) {
    this.setState({ inputCharacters: newInput });
    setTimeout(this.timedLoader, 1500);
  }

  timedLoader() {
    this.setState({ inputCharacters: "" });
  }

  render() {
    if (this.state.inputCharacters.length !== 0) {
      return (
        <Input fluid loading icon='user' />
      );
    } else {
      return (
        <Input fluid placeholder='Search . . .' />
  	  )
    }
  }
}

export default InputLoading;
