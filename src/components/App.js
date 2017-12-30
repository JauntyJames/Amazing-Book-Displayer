import React from 'react';

import Book from './book';
import Search from './search';

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: null,
      book: null,
      title: null,
      author: null,
      imgUrl: null
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
        let bookAuthor = result.getElementsByTagName('name')[0].innerHTML
        let bookImage = result.getElementsByTagName('image_url')[0].innerHTML
        this.setState({ book: result })
        this.setState({ title: bookTitle })
        this.setState({ author: bookAuthor })
        this.setState({ imgUrl: bookImage })
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
    let bookElement;
    if (this.state.title) {
      bookElement = <Book
        title={this.state.title}
        author={this.state.author}
        imgUrl={this.state.imgUrl}
      />

    }
    return (

      <div>
      <h2>The Fantastic Book Displayer</h2>
      {bookElement}
        <Search
        getBook={this.getBook}
        handleSearchChange={this.handleSearchChange}
        />
      </div>
    );
  }
};

export default App;
