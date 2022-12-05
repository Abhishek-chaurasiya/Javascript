
//Book constructor
function Book(title,author,isbn){
    this.title=title;
    this.author=author;
    this.isbn=isbn;
}
//Ui constructor
function UI(){}

//Add Book to list
UI.prototype.addBookToList=function(book){
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

UI.prototype.deleteBook=function(target){
   
    if(target.className==='delete'){
        target.parentElement.parentElement.remove();
    }

}

UI.prototype.clearFields=function(){
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('isbn').value='';
}

//show alert
UI.prototype.showAlert=function(message,className){
  
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
    //clear fields
    ui.clearFields();

 }



 e.preventDefault();
});

//event listener for delete

document.getElementById('book-list').addEventListener('click',function(e){

    const ui=new UI();
    ui.deleteBook(e.target);

    //show message
    ui.showAlert('Book Removed','success');
    e.preventDefault();
})