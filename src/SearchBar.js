import elasticsearch from 'elasticsearch';
import React, { Component } from 'react';
import SuggestionsBox from './SuggestionsBox';
import DefinitionsDisplay from './DefinitionsDisplay';
import './App.css';

var es_url = process.env.ES_URL
let client = new elasticsearch.Client({
                host: es_url,
                log: 'trace'
              });

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: '',
      querySubmitted: false,
      boxSuggestions: [],
      foundDefinitions: []
    };

    this.autocompleteSearch = this.autocompleteSearch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

	autocompleteSearch(event) {
    this.setState({searchInput: event.target.value});

		client.search({
			index: 'dictionary',
			type: 'free_dictionary',
			body: {
        size: 100,
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
    event.preventDefault();

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
      }
    })
	};

	render() {
    const {handleSearch, autocompleteSearch} = this;

		return (
	    <div className="jumbotron col-sm-6 col-sm-offset-3 text-center SearchBar-background">
	      <h1>SEARCH</h1>
	      <div className>
          <form onSubmit={handleSearch}>
            <input
              className="form-group form-control"
              type="text"
              placeholder="Enter Search . . ."
              onChange={autocompleteSearch} />
            <input
              className="btn btn-success"
              type="submit"
              value="Search" />
          </form>
	      </div>
        <br />
        <br />
        <div>
          {
            this.state.querySubmitted === true ?
              <DefinitionsDisplay definitions={this.state.foundDefinitions} /> :
                <SuggestionsBox suggestions={this.state.boxSuggestions} />
          }
        </div>
	    </div>
	  )
  }
}

export default SearchBar;
