import React from 'react';

import Book from '../components/book';
import Search from '../components/search';
import Marquee from '../components/marquee';
import xmlToJson from '../constants/parser';

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: null,
      results: null,
      book: null,
      title: null,
      author: null,
      imgUrl: null
    }
    this.getBook = this.getBook.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.selectBook = this.selectBook.bind(this)
  }

  getBook(event) {
    event.preventDefault();
      fetch(`/api/v1/${this.state.searchTerm}`)
      .then(response => {
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
        let json = xmlToJson(data)
        let results = json.GoodreadsResponse.search.results.work
        let result = results[0]
        let title = result.best_book.title['#text']
        let author = result.best_book.author.name['#text']
        let imgUrl = result.best_book.image_url['#text']
        this.setState({
          results: results,
          book: result,
          title: title,
          author: author,
          imgUrl: imgUrl,
          searchTerm: null
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));

  }

  handleSearchChange(event){
    event.preventDefault();
    let term = event.target.value
    this.setState({ searchTerm: term })
  }

  selectBook(id){
    let booksArray = this.state.results
    booksArray.forEach((book) => {
      let bookId = book.best_book.id['#text']
      if (bookId === id){
        this.setState({
          book: book,
          title: book.best_book.title['#text'],
          author: book.best_book.author.name['#text'],
          imgUrl: book.best_book.image_url['#text']
        })
      }
    })
  }


  render() {
    let bookElement;
    if (this.state.results !== null) {
      bookElement = <Book
        title={this.state.title}
        author={this.state.author}
        imgUrl={this.state.imgUrl}
        selectBook={this.selectBook}
      />
    }
    return (

      <div>
        <div className="display-box">
          <h2>The Fantastic Book Displayer</h2>
          {bookElement}
          <Search
            getBook={this.getBook}
            handleSearchChange={this.handleSearchChange}
            searchTerm={this.props.searchTerm}
          />
        </div>
        <div className="marquee">
          <Marquee
            books={this.state.results}
            selectBook={this.selectBook}
          />
        </div>
      </div>
    );
  }
};

export default App;
