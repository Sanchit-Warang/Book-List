// Book Constructor
function Book(title, author, isbn) {
    this.title = title 
    this.author = author
    this.isbn = isbn
}

// UI Constructor
function UI(){}

//UI prototype

//Add book Function 
UI.prototype.addBookToList = function(book){
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

//Delete book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove()
    }
}



//Show Alert
UI.prototype.showAlert = function(message, className){
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


//Clearing the value of the form 
UI.prototype.clearFields = function(){
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('isbn').value = ''
}

//Event Listners 
//Add book
document.getElementById('book-form').addEventListener('submit', function(e){
    //Get form values
    const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value

    
    
    //Creating a UI object
    const ui = new UI()

    //validate
    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please fill in all fields', 'error')
    } else{
        //Createing book object
        const book = new Book(title, author, isbn)
        
        // Add book to the list
        ui.addBookToList(book)

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

    //Show alert

    ui.showAlert('Book removed!', 'success')

    e.preventDefault 
})
