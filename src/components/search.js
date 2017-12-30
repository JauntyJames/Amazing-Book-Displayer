import React from 'react'

const Search = (props) => {
  return (
    <div>
      <form>
        <input name="search" placeholder="Enter title, author, or ISBN" onChange={props.handleSearchChange}/>
        <button onClick={props.getBook}>Get a book.</button>
      </form>
    </div>
  )
}

export default Search
