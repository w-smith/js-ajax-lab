// Wait for page to load
$(document).ready(function(){
  $('form#new-book').on('submit', sendOurDataViaAJAX);
  getBooks();
});

function sendOurDataViaAJAX(e){
  e.preventDefault();

  // our API uses JSON, so we need to make a javascript object! There are a lot of ways to do this, this just a basic example.
  let book = {
    title: $('form#new-book input#book-title').val(),
    author: $('form#new-book input#book-author').val(),
    image: $('form#new-book input#book-image').val(),
    releaseDate: $('form#new-book input#book-releaseDate').val()
  };

  // create a new AJAX request
  $.post('https://super-crud.herokuapp.com/books', book)
    .done(function(data){
      addBook(data);
    });

  // clear our input boxes!
  $('form#new-book input#book-title').val(null);
  $('form#new-book input#book-author').val(null);
  $('form#new-book input#book-image').val(null);
  $('form#new-book input#book-releaseDate').val(null);
}

function getBooks(){
  let books = $.get('https://super-crud.herokuapp.com/books')
    .done(function(data){
      console.log(data);
      data.books.forEach(function(book){
        console.log(book);
        addBook(book);
      });
    });
}

function addBook(book) {
  $("ul#books").prepend(
    `<li>
      <ul>
        <li>${book.title}</li>
        <li>${book.author}</li>
        <li>${book.releaseDate}</li>
        <li><img src=${book.image}></li>
      </ul>
    </li>`
  );
}