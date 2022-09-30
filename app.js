const modal = document.querySelector("#modal");
const bookButton = document.querySelector(".addbook");
const closeButton = document.querySelector(".close-button");
const exitButton = document.querySelector(".exit");

let myLibrary = [];

function Book() {}

function addBookToLibrary() {}

bookButton.addEventListener("click", function (e) {
  modal.showModal();
});

closeButton.addEventListener("click", function (e) {
  modal.close();
});

exitButton.addEventListener("click", () => {
  modal.close();
});
