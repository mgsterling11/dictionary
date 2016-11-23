import elasticsearch from 'elasticsearch';
import React, { Component } from 'react';
import SuggestionsBox from '../autoComplete/SuggestionsBox';
import DefinitionsTable from '../definitions/DefinitionsTable';
import ButtonAnimated from '../../components/ui/ButtonAnimated';
import InputLoading from '../../components/ui/InputLoading';
import Break from '../../components/ui/Break';
import FlashMessage from '../../components/ui/FlashMessage';
import { Container, Divider } from 'semantic-ui-react';

var esUrl = process.env.REACT_APP_ELASTICSEARCH_URL;
let client = new elasticsearch.Client({ host: esUrl });

class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      searchInput: '',
      querySubmitted: false,
      boxSuggestions: [],
      foundDefinitions: [],
      renderFlash: false
    };

    this.autocompleteSearch = this.autocompleteSearch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.searchClicked = this.searchClicked.bind(this);
  }

	autocompleteSearch(event) {
    this.setState({
      searchInput: event.target.value,
      renderFlash: false
    });

		client.search({
			index: process.env.REACT_APP_ELASTICSEARCH_INDEX,
			type: process.env.REACT_APP_ELASTICSEARCH_TYPE,
			body: {
        size: 75,
				query: {
					match: {
						autocomplete: event.target.value
					}
				}
			}
		}).then((resp) => {
      if (resp.hits.hits.length > 0) {
        var suggestions = resp.hits.hits;
        this.setState({boxSuggestions: suggestions, querySubmitted: false});
      }
    })
  };

  handleSearch(event) {
    if (event != null) {
      event.preventDefault();
    }

		client.search({
      index: 'dictionary',
      type: 'free_dictionary',
      body: {
        size: 15,
        query: {
          match: {
            word: this.state.searchInput
          }
        }
      }
		}).then((resp) => {
      if (resp.hits.hits.length > 0) {
        var definitions = resp.hits.hits;
        this.setState({foundDefinitions: definitions, querySubmitted: true});
      } else {
        this.setState({ renderFlash: true })
      }
    })
	}

  searchClicked(event) {
    event.preventDefault();

    var searchInput = event.target.textContent.toLowerCase();

    this.setState({searchInput: searchInput}, function() {
      this.handleSearch();
    });
  }

	render() {
    const {handleSearch, autocompleteSearch} = this;

		return (
	    <div>
        <Container textAlign='center'>
          <Break />
          <h3>Elasticsearch Dictionary</h3>
          <Break />
        </Container>
        <Container textAlign='center'>
          <form onSubmit={handleSearch} onChange={autocompleteSearch}>
            <InputLoading
              type="text"
              inputCharacters={this.state.searchInput}
            />

            <Break />
            <ButtonAnimated />
          </form>

          { this.state.renderFlash ? <FlashMessage searchWord={this.state.searchInput} /> : null }

        </Container>

        <Divider />

        <div>
          {
            this.state.querySubmitted === true ?
              <DefinitionsTable definitions={this.state.foundDefinitions} /> :
                <SuggestionsBox
                  suggestions={this.state.boxSuggestions}
                  searchClicked={this.searchClicked}
                />
          }
        </div>
      </div>
	  )
  }
}

export default SearchBar;
