import React from 'react';

import Book from './book';
import Search from './search';

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      book: null,
      title: null,
      searchTerm: "Slaughterhouse Five"
    }
    this.getBook = this.getBook.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  getBook(event) {
    event.preventDefault();
      fetch(`/api/v1/${this.state.searchTerm}`)
      .then(response => {
        console.log(response);
        console.log(response.ok);
        if (response.ok) {
          return response.text();
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
      .then(data => {
        let result = data.getElementsByTagName("work")[0]
        let bookTitle = result.getElementsByTagName('title')[0].innerHTML
        this.setState({ book: result })
        this.setState({ title: bookTitle })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));

  }

  handleSearchChange(event){
    let term = event.target.value
    this.setState({ searchTerm: term })
  }

  componentDidMount() {

  }

  render() {
    return (

      <div>

        <Book
          title={this.state.title}
        />
        <Search
        getBook={this.getBook}
        handleSearchChange={this.handleSearchChange}
        />
      </div>
    );
  }
};

export default App;
