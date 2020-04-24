import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './book'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Search from './Search'


class BooksApp extends React.Component {
  state = {
    books:[],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }
  
  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState(()=>({
        books
      }))
    })
  }

  changeStatus = (Book , value) => {  
    BooksAPI.update(Book , value).then()  
    for(let i=0 ; i < this.state.books.length ; i++){
      if(this.state.books[i].id === Book.id){
        this.state.books[i].shelf = value;
      }
    }

    this.setState(()=>({
      books: this.state.books
    }))
  }

  render() {
    console.log(this.state.books);
    
    return (
      <div className="app">
        <Route path = '/search' component={Search} />
        <Route exact path='/' render={()=>(
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
                    books = {this.state.books}
                    status = "currentlyReading"
                    changeStatus = {this.changeStatus}
                  />
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <Book
                    books = {this.state.books}
                    status = "wantToRead"
                    changeStatus = {this.changeStatus}
                  />
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <Book 
                    books = {this.state.books}
                    status = "read"
                    changeStatus = {this.changeStatus}
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
        )}/>
          
      </div>
    )
  }
}

export default BooksApp
