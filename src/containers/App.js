import React from 'react';

import Book from '../components/book';
import Search from '../components/search';
import Marquee from '../components/marquee';

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
        let results = data.getElementsByTagName("work")
        let result = results[0]
        let title = result.getElementsByTagName('title')[0].innerHTML
        let author = result.getElementsByTagName('name')[0].innerhtml
        let imgUrl = result.getElementsByTagName('image_url')[0].innerHTML
        this.setState({ results: results, book: result, title: title, author: author, imgUrl: imgUrl });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));

  }

  handleSearchChange(event){
    event.preventDefault();
    let term = event.target.value
    this.setState({ searchTerm: term })
  }

  selectBook(id){
    let booksArray = [].slice.call(this.state.results)
    booksArray.forEach((book) => {
      let bookId = book.getElementsByTagName('id')[0].innerHTML
      if (bookId === id){
        this.setState({ book: book })
      }
    })
  }

  changeBookProperties(book){
    let title = book.getElementsByTagName('title')[0].innerHTML
    let author = book.getElementsByTagName('name')[0].innerHTML
    let imgUrl = book.getElementsByTagName('image_url')[0].innerHTML
    this.setState({ title: title, author: author, imgUrl: imgUrl })
  }

  componentDidMount() {
    if (this.state.results !== null ){
      debugger
      let book = this.state.book
      this.changeBookProperties(book);
    }
  }

  render() {
    // if (this.state.results !== null && this.state.book === null ){
    //   let book = this.state.results[0]
    //   this.changeBookProperties(book);
    // }
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
