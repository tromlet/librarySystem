/* global Requests */

const BASEURL = "https://floating-woodland-64068.herokuapp.com/";
const LIBRARYID = 154;
const REQ = new Requests(LIBRARYID);

let bookTemplate = $('#templates .bookRow');
let bookTable = $('#bookTableBody');

async function getLibraryName() {
  let library = await REQ.getLibrary();
  $('.jumbotron h1').text(library.name);
}

getLibraryName();

async function getBooks() {
  let books = await REQ.getBooks();
  books.forEach((book) => {
    addBookToPage(book);
  });
}

async function addBookToPage(book) {
  let newBook = bookTemplate.clone(true, true);
  newBook.attr('data-id', book.id);
  newBook.find('.bookImg').attr('src', book.image_url);
  newBook.find('.bookTitle').text(book.title);
  newBook.find('.bookDesc').text(book.description);
  bookTable.append(newBook);
}

function listLibraries() {
  for (let i = 0; i <= 100,000; i++) {
    let library = $.ajax({type:"GET",url: "https://floating-woodland-64068.herokuapp.com/libraries",data: {id: i}});

  }
}

async function testAPI() {
  let book1 = await REQ.createBook({
    title: "Test Book",
    description: "A Test Description about Test Book",
    image_url: "http://ricfreeman.com/wp-content/uploads/2015/09/its-only-a-test-book.png"
  });

  console.log("We've created a new book");
  console.log(book1);

  console.log("Now we'll request all the books from the library");

  let books = await REQ.getBooks();

  console.log("After the get all books request comes back");
  console.log(books);

  console.log("Let's delete that book");
}
