import React from 'react';

const Book = props => {
  let handleClick = (event) => {
    event.preventDefault();
    props.selectBook(props.id);
  }

  return (
    <div className="book-element" onClick={handleClick}>
      <p>{props.title}</p>
      <p>{props.author}</p>
      <p><img src={props.imgUrl} /></p>
    </div>
  )
}

export default Book;
