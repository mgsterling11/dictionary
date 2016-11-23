import React, { Component } from 'react';
import { Container, Card } from 'semantic-ui-react';

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
      {
        key: object['_id'],
        href: object['_source']['word'],
        header: object['_source']['word'].toUpperCase(),
        meta: object['_source']['type'],
        description: object['_source']['definition']
      }
    ));

    if (this.state.suggestionsToDisplay.length !== 0) {
      return (
        <Container>
          <Card.Group
            itemsPerRow={5}
            items={suggestions}
            onClick={this.props.searchClicked} />
        </Container>
      );
    } else {
      return (
  	    <div></div>
  	  )
    }
  }
}

export default SuggestionsBox;
