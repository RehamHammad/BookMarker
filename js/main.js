var bookNameInput=document.getElementById('bookName');
var bookUrlInput=document.getElementById('bookUrl');
var addBtn=document.getElementById('addBtn');
var inputs=document.getElementsByClassName('form-control');
var book=[];
var currentIndex=0;

if (JSON.parse(localStorage.getItem('bookMark')!=null)){
    book=JSON.parse(localStorage.getItem('bookMark'));
    display()
}

 addBtn.onclick=function(){
    if(addBtn.innerHTML=='update'){
       addBtn.innerHTML='add';
       updateBook();
    }else{
        add();
    }
 resetForm();
 display();
}

function add(){
  var  bookMark={
        name:bookNameInput.value,
        url:bookUrlInput.value,
    }
    book.push(bookMark);
   localStorage.setItem('bookMark',JSON.stringify(book));
}

function display(){
    var marks=``
    for(var i=0;i<book.length;i++){
        marks+=
        `
        <tr>
        <td>${book[i].name}</td>
       <td><a class="btn my-2 btn-primary" href="${book[i].url}">Visit</a></td>
        <td><button onclick='getBookInfo(${i})' class="btn my-2 btn-success">Update</button></td>
        <td><button onclick='deleteBook(${i})' class="btn my-2 btn-danger">Delete</button></td>
        </tr>
        `
    }
    document.getElementById('tBody').innerHTML=marks
}

function deleteBook(index){
     book.splice(index,1)
     localStorage.setItem('bookMark',JSON.stringify(book));
     display();
}

function resetForm(){
for(var i=0;i<inputs.length;i++){
  inputs[i].value='';
}

}
function getBookInfo(index){
    currentIndex=index;
    currentBook=book[index];
    bookNameInput.value=currentBook.name;
    bookUrlInput.value=currentBook.url;
    addBtn.innerHTML='update'
}

function updateBook(index){
    var bookMark={
        name:bookNameInput.value,
        url:bookUrlInput.value,
    }
    book[currentIndex]=bookMark;
    localStorage.setItem('bookMark',JSON.stringify(book));
}

var nameRegex=/^[A-Za-z_]{1,}$/
 function isNameValid(){
    if(nameRegex.test(bookNameInput.value)){
        return true;
    }else{
        return false;
    }
 }

var urlRegex =/^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}$/
function isUrlValid(){
    if(urlRegex.test(bookUrlInput.value)){
        return true;
    }else{
        return false;
    }
 }

 bookNameInput.onkeyup=function(){
    if (isNameValid() && isUrlValid()){
        addBtn.removeAttribute('disabled');
    }else{
        addBtn.disabled="true"
    }
 }
 bookUrlInput.onkeyup=function(){
    if (isNameValid() && isUrlValid()){
        addBtn.removeAttribute('disabled');
    }else{
        addBtn.disabled="true"
    }
 }
