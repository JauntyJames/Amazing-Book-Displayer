import React from 'react';
import Book from './book';

const Marquee = (props) => {
  let bookCollection;
  if (props.books !== null) {
    let booksArray = [].slice.call(props.books)
    bookCollection = booksArray.map(book => {
      let title = book.getElementsByTagName('title')[0].innerHTML
      let author = book.getElementsByTagName('name')[0].innerHTML
      let imgUrl = book.getElementsByTagName('image_url')[0].innerHTML
      let id = book.getElementsByTagName('id')[0].innerHTML

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
