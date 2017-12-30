import React from 'react';

const Book = props => {

  let handleClick = () => {
    fetch('https://www.goodreads.com/search/index.xml?key=EVb4hJ6R1XTbUtJctBuQtQ&q=Ender%27s+Game')
    .then(response => {
      console.log(response);
      console.log(response.ok);
      if (response.ok) {
        return response.json();
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(responseData => {
      debugger
      props.getBook(responseData)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  return (
    <div>
      {props.book}
      <button onClick={handleClick}>Get a book.</button>
    </div>
  )
}

export default Book;
