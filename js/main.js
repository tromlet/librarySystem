/* global Requests */

const BASEURL = "https://floating-woodland-64068.herokuapp.com/";
const LIBRARYID = 154;
const REQ = new Requests(LIBRARYID);
const FADESPEED = 300;

let bookTemplate = $('#templates .bookRow');
let bookTable = $('#bookTableBody');
let borrowerTemplate = $('#templates .borrowerRow');
let borrowerTable = $('#borrowersTableBody');

async function getLibraryName() {
  let library = await REQ.getLibrary();
  $('.jumbotron h1').text(library.name);
}

async function getBooks() {
  let books = await REQ.getBooks();
  books.forEach((book) => {
    addBookToPage(book);
  });
}

async function deleteBook(bookRow) {
  let bookID = bookRow.attr('data-id');
  await REQ.deleteBook({id: bookID});
  bookRow.fadeOut(FADESPEED, () => bookRow.remove());
}

function deleteAllBooks() {
  $('.bookRow').each(function() {
    deleteBook($(this));
  });
}

$('.deleteBook').click(async function() {
  let bookRow = $(this).parents('.bookRow');
  deleteBook(bookRow);
});

$('#addBookForm').on('submit', async function(event) {
  event.preventDefault();
  let newBook = {
    title: event.target.bookTitleInput.value,
    description: event.target.bookDescInput.value,
    image_url: event.target.bookCoverImageURL.value
  };

  // Create the book on the server
  newBook = await REQ.createBook(newBook);

  // Add the book to our books table
  addBookToPage(newBook);

  // Reset the form fields
  event.target.reset();

  // Finally, close the #addBookModal modal
  $('#addBookModal').modal('hide');
});

async function addBookToPage(book) {
  let newBook = bookTemplate.clone(true, true);
  newBook.attr('data-id', book.id);
  newBook.find('.bookImg').attr('src', book.image_url);
  newBook.find('.bookImg').attr('alt', `Cover image of ${book.title}`);
  newBook.find('.bookTitle').text(book.title);
  newBook.find('.bookDesc').text(book.description);
  bookTable.append(newBook);
}

function populateBorrowers(borrower) {
  let borrowerOption = $('#templates .borrowerOption');
  let newBorrowerOption = borrowerOption.clone();
  newBorrowerOption.attr('data-id', borrower.id);
  newBorrowerOption.text(`${borrower.firstname} ${borrower.lastname}`);
  newBorrowerOption.removeClass('borrowerOption');
  $('.bookBorrower').append(newBorrowerOption);
}

async function getBorrowers() {
  let borrowers = await REQ.getBorrowers();
  borrowers.forEach((borrower) => {
    addBorrowerToPage(borrower);
    populateBorrowers(borrower);
  });
}

async function deleteBorrower(borrowerRow) {
  let borrowerID = borrowerRow.attr('data-id');
  await REQ.deleteBorrower({id: borrowerID});
  borrowerRow.fadeOut(FADESPEED, () => borrowerRow.remove());
}

async function deleteAllBorrowers() {
  $('.borrowerRow').each(function() {
    deleteBorrower($(this));
  });
}

$('.deleteBorrower').click(async function() {
  let borrowerRow = $(this).parents('.borrowerRow');
  deleteBorrower(borrowerRow);
});

$('#addBorrowerForm').on('submit', async function(event) {
  event.preventDefault();
  let newBorrower = {
    firstname: event.target.borrowerFirstNameInput.value,
    lastname: event.target.borrowerLastNameInput.value
  };

  // Create the book on the server
  newBorrower = await REQ.createBorrower(newBorrower);

  // Add the book to our books table
  addBorrowerToPage(newBorrower);

  // Reset the form fields
  event.target.reset();

  // Finally, close the #addBookModal modal
  $('#addBorrowerModal').modal('hide');
});

async function addBorrowerToPage(borrower) {
  let newBorrower = borrowerTemplate.clone(true, true);
  newBorrower.attr('data-id', borrower.id);
  newBorrower.find('.borrowerFirstName').text(borrower.firstname);
  newBorrower.find('.borrowerLastName').text(borrower.lastname);
  borrowerTable.append(newBorrower);
}

getLibraryName();

getBorrowers();

getBooks();

/* Experimental bullshit for now */

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
