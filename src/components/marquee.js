import React from 'react';
import Book from './book';

const Marquee = (props) => {
  let bookCollection;
  if (props.books !== null) {
    bookCollection = props.books.map(book => {
      let title = book.best_book.title['#text']
      let author = book.best_book.author.name['#text']
      let imgUrl = book.best_book.image_url['#text']
      let id = book.best_book.id['#text']

      return (
        <Book
          id={id}
          key={id}
          title={title}
          author={author}
          imgUrl={imgUrl}
          selectBook={props.selectBook}
        />
      )
    })
  }

  return(
    <div>
      {bookCollection}
    </div>
  )
}

export default Marquee;
