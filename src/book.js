import React, {Component} from 'react'

class Book extends Component{
    render(){
        const { books , status , changeStatus } = this.props
        return(
            <div>
                
                {books&& books.length ?  
                <ol className="books-grid">
                    {
                    books
                    .filter(obj=> obj.shelf === status)
                    .map((book) => (
                        <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                                <select onChange = {(event)=> changeStatus(book , event.target.value)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option value="nothing"></option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="currentlyReading" >Currently Reading</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            {book.authors && book.authors.map(obj => (<div key={obj} className="book-authors">{obj}</div>))}    
                        </div>
                    </li>
                     ) )
                     }
                    
                </ol> : "loading"}
            </div>
        )
    }
}

export default Book;