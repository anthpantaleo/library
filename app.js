const modal = document.querySelector("#modal");
const bookButton = document.querySelector(".addbook");
const closeButton = document.querySelector(".close-button");
const exitButton = document.querySelector(".exit");
const userForm = document.querySelector(".form");
const library = document.querySelector(".library");

let myLibrary = [
  {
    booktitle: "The Way of Kings",
    author: "Brandon Sanderson",
    pages: "1007",
    read: "on",
  },
];

bookButton.addEventListener("click", function (e) {
  modal.showModal();
});

closeButton.addEventListener("click", function (e) {
  modal.close();
});

exitButton.addEventListener("click", () => {
  modal.close();
});

userForm.addEventListener("submit", Book);

function Book(event) {
  event.preventDefault();
  let newBook = new FormData(event.target);
  let formDataObj = {};
  newBook.forEach((value, key) => (formDataObj[key] = value));
  addBookToLibrary(formDataObj);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  refreshLibrary();
  userForm.reset();
}

function deleteBooks() {
  let oldBooks = document.querySelectorAll(".book");
  oldBooks.forEach((item) => {
    item.remove();
  });
}
function refreshLibrary() {
  deleteBooks();
  for (let i = 0; i < myLibrary.length; i++) {
    let isRead = false;
    let dataNumber = i;
    if (myLibrary[i].read == "on") {
      isRead = true;
    }
    let libraryBook = document.createElement("div");
    libraryBook.classList.add("book");
    let libraryBooktitle = document.createElement("div");
    libraryBooktitle.innerText = `${myLibrary[i].booktitle}`;
    libraryBooktitle.classList.add("bookcardtitle");
    libraryBook.appendChild(libraryBooktitle);
    let libraryBookauthor = document.createElement("div");
    libraryBookauthor.innerText = `By ${myLibrary[i].author}`;
    libraryBook.appendChild(libraryBookauthor);
    let libraryBookpages = document.createElement("div");
    libraryBookpages.innerText = `${myLibrary[i].pages} pages`;
    libraryBook.appendChild(libraryBookpages);
    let libraryBookRead = document.createElement("button");
    if (isRead) {
      libraryBookRead.classList.add("read");
      libraryBookRead.innerText = "Read";
    } else {
      libraryBookRead.classList.add("unread");
      libraryBookRead.innerText = "Not Read";
    }
    libraryBook.appendChild(libraryBookRead);
    libraryBookRead.dataset.booknumber = dataNumber;
    let libraryBookDelete = document.createElement("button");
    libraryBookDelete.innerText = "Remove";
    libraryBookDelete.classList.add("remove");
    libraryBook.appendChild(libraryBookDelete);
    libraryBookDelete.dataset.booknumber = dataNumber;
    library.appendChild(libraryBook);
  }
  updateListeners();
}

refreshLibrary();

function updateListeners() {
  let readButtons = document.querySelectorAll(".read");
  let notReadButtons = document.querySelectorAll(".unread");
  let removeButtons = document.querySelectorAll(".remove");
  readButtons.forEach((item) => {
    item.addEventListener("click", changeStatus);
  });
  notReadButtons.forEach((item) => {
    item.addEventListener("click", changeStatus);
  });
  removeButtons.forEach((item) => {
    item.addEventListener("click", deleteBook);
  });
}

function changeStatus(item) {
  let currentIndex = event.target.getAttribute("data-booknumber");
  if (myLibrary[currentIndex].read == "on") {
    myLibrary[currentIndex].read = "off";
  } else {
    myLibrary[currentIndex].read = "on";
  }
  refreshLibrary();
}

function deleteBook() {
  let currentIndex = event.target.getAttribute("data-booknumber");
  myLibrary.splice(currentIndex, 1);
  refreshLibrary();
}
