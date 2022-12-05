
class Book{

    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

class UI{
    addBookToList(book){
        const list=document.getElementById('book-list');
        //Create row element
        const row=document.createElement('tr');
        
        //insert cols
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X </a></td>
        `;
        list.appendChild(row);

    }
    deleteBook(target){
           
        if(target.className==='delete'){
            target.parentElement.parentElement.remove();
            
        }
    }
    clearFields(){
        document.getElementById('title').value='';
        document.getElementById('author').value='';
        document.getElementById('isbn').value='';
    }
    showAlert(message,className){
        const div=document.createElement('div');
        div.className=`alert ${className}`;
        div.appendChild(document.createTextNode(message));
    
        const container=document.querySelector('.container');
        const form=document.querySelector('#book-form')
    
        container.insertBefore(div,form);
    
        setTimeout(function(){
            document.querySelector('.alert').remove();
        },3000);
    }
}

//Local storage class
class Store{
    
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }
        else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        
        return books;
    }
    static displayBooks(){
       let books=Store.getBooks();
       
       books.forEach(function(book){
        const ui=new UI();
        
        //add book to ui
        ui.addBookToList(book);
       })
    }
    static addBook(book){
        let books=Store.getBooks();
        books.push(book);

        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn){
        console.log(isbn);
         let books=Store.getBooks();
         books.forEach(function(book,index){
            if(book.isbn===isbn){
                books.splice(index,1);
            }
         });

         localStorage.setItem('books',JSON.stringify(books));
    }
}
//Dom load event 
document.addEventListener('DOMContentLoaded',Store.displayBooks);


//Get the form data
document.getElementById('book-form').addEventListener('submit',function(e){
    const title=document.getElementById('title').value;
    const author=document.getElementById('author').value;
    const isbn=document.getElementById('isbn').value;
    
    //Instantiate book
    const book=new Book(title,author,isbn);
    
    //Instantiate Ui
    const ui=new UI();
    
    //validate
   
    if(title===''||author===''||isbn===''){
      ui.showAlert('Please fill in all fields','error');
    }
    else{
       ui.addBookToList(book);
       //show success
       ui.showAlert('Book Added!','success')
       //add to local storage
       Store.addBook(book);
       //clear fields
       ui.clearFields();
   
    }
   
    e.preventDefault();
   });
   
   //event listener for delete
   
   document.getElementById('book-list').addEventListener('click',function(e){
   
       const ui=new UI();
       if(e.target.className==='delete')
       ui.showAlert('Book Removed','success');
       ui.deleteBook(e.target);
   
       //Remove from ls
       Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
       
       e.preventDefault();
   })