import React from 'react';

const Book = props => {


  return (
    <div>
      <p>{props.title}</p>
      <p>{props.author}</p>
      <p><img src={props.imgUrl} /></p>
    </div>
  )
}

export default Book;
