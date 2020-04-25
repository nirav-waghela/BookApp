import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './book'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Search from './Search'


class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books: books
      }))
    })
  }

  changeStatus = (Book, value) => {
    BooksAPI.update(Book, value).then(
      books => this.getBooks()
    )
  }

  render() {

    return (
      <div className="app">
        <Route path='/search' ><Search changeStatus={this.changeStatus} /></Route>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <Book
                      books={this.state.books}
                      status="currentlyReading"
                      changeStatus={this.changeStatus}
                    />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <Book
                      books={this.state.books}
                      status="wantToRead"
                      changeStatus={this.changeStatus}
                    />
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <Book
                      books={this.state.books}
                      status="read"
                      changeStatus={this.changeStatus}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>
                <button
                >Add a book</button>
              </Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
