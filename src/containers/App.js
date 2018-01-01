import React from 'react';

import Book from '../components/book';
import Search from '../components/search';
import Marquee from '../components/marquee'

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      results: null,
      searchTerm: null,
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
        let results = data.getElementsByTagName("work")
        let result = results[0]
        let bookTitle = result.getElementsByTagName('title')[0].innerHTML
        let bookAuthor = result.getElementsByTagName('name')[0].innerHTML
        let bookImage = result.getElementsByTagName('image_url')[0].innerHTML
        this.setState({ results: results })
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
        <div className="display-box">
          <h2>The Fantastic Book Displayer</h2>
          {bookElement}
          <Search
            getBook={this.getBook}
            handleSearchChange={this.handleSearchChange}
          />
        </div>
        <div className="marquee">
          <Marquee
            books={this.state.results}
          />
        </div>
      </div>
    );
  }
};

export default App;
