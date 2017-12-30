import React from 'react';

import Book from './book';

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      book: null
    }
    this.getBook = this.getBook.bind(this)
  }

  getBook(bookData) {
    this.setState({ book: bookData })
  }
  render() {
    return (
      <div>
        poo tee weet
        
        <Book
          book={this.state.book}
          getBook={this.getBook}
        />
      </div>
    );
  }
};

export default App;
