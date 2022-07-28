class Book {
    constructor(title, author, isbn){
        this.title = title 
        this.author = author
        this.isbn = isbn
    }
}
class UI {
    addBookToList(book) {
        //Selecting the tbody
        const list  = document.getElementById('book-list')

        //Creating a tr
        const row = document.createElement('tr')

        //Creating columns
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td> <a href = "#" class="delete">X</a> </td>
        `
        list.appendChild(row)
    }
    showAlert(message, className) {
        //Create a div
        const div = document.createElement('div')

        //Add class
        div.className = `alert ${className}`

        //Add Text
        div.appendChild(document.createTextNode(message))

        //Get a parent 
        const container = document.querySelector('.container')
        //Get the form
        const form = document.querySelector('#book-form')
        //Insert Alert
        container.insertBefore(div, form)

        // Timeout after alert
        setTimeout(function(){
            document.querySelector('.alert').remove()
        }, 3000)
    }
    deleteBook(target) {
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove()
        }
    }
    
    clearFields() {
        document.getElementById('title').value = ''
        document.getElementById('author').value = ''
        document.getElementById('isbn').value = ''
    } 
}

//Local Storage Class
class Store {
    static getBooks() {
      let books
      if(localStorage.getItem('books') === null) {
        books = []
      } else {
        books = JSON.parse(localStorage.getItem('books'))
      }
  
      return books
    }
  
    static displayBooks() {
      const books = Store.getBooks()
  
      books.forEach(function(book){
        const ui  = new UI
  
        // Add book to UI
        ui.addBookToList(book)
      })
    }
  
    static addBook(book) {
      const books = Store.getBooks()
  
      books.push(book)
  
      localStorage.setItem('books', JSON.stringify(books))
    }
  
    static removeBook(isbn) {
      const books = Store.getBooks()
  
      books.forEach(function(book, index){
       if(book.isbn === isbn) {
        books.splice(index, 1)
       }
      })
  
      localStorage.setItem('books', JSON.stringify(books))
    }
  }

//DOM load event

document.addEventListener('DOMContentLoaded',Store.displayBooks)


//Event Listners 
//Add book
document.getElementById('book-form').addEventListener('submit', function(e){
    //Get form values
    const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value

    const book = new Book(title, author, isbn)
    
    
    //Creating a UI object
    const ui = new UI()

    //validate
    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please fill in all fields', 'error')
    } else{
        
        // Add book to the list
        ui.addBookToList(book)

        //Adding to Local storage
        Store.addBook(book)

        //show success alert
        ui.showAlert('Book Added!', 'success')

        // Clear Fields
        ui.clearFields()
    }
    
    

    e.preventDefault()
})

//Delete book evnt listner
document.getElementById('book-list').addEventListener('click', function(e){
    
    const ui = new UI()

    ui.deleteBook(e.target)

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    //Show alert

    ui.showAlert('Book removed!', 'success')

    e.preventDefault 
})
