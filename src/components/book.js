import React from 'react';

const Book = props => {
  let title = "Slaughterhouse Five"
  let handleClick = () => {
    fetch(`/api/v1/${title}`)
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
      let resultTitle = result.getElementsByTagName('title')[0]
      let title = resultTitle.innerHTML
      debugger
      props.getBook(title);
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
