import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './book'

 
class Search extends Component{
    state = {
        search:'',
        books:[]
    }

    querySearch = (e) =>{
        this.setState({
                search:e.target.value
        })
        if(this.state.search.length){
            BooksAPI.search(this.state.search).then((books) => {
                if (! (books && books.error)) {
                  const newBooks = books && books.length && books.map(
                      (obj) => {
                        return { ...obj, shelf: "none" };
                      }
                    );
                    this.setState({
                        books: newBooks && newBooks.length ? newBooks : []
                    })
                }
            });
            
        }
    
        
    }
    render(){

        return (
            <div>   
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link to='/'>
                           <button className="close-search" >Close</button>
                        </Link>
                        <div className="search-books-input-wrapper">
                            <input type="text" value={this.state.search}  onChange = {(event)=> this.querySearch(event)} name="bookSearch" placeholder="Search by title or author"/>
                        </div>
                        
                    </div>
                    <div className="search-books-results">
                        <Book 
                            books = {this.state.books}
                            status = 'none'
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Search