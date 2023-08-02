const closeModalBtn = document.querySelector("[data-modal-close]");
const backdropEl = document.querySelector("[data-modal]");
const modalBodyEl = document.querySelector(".modal__body");

backdropEl.addEventListener("click", onBackdropClick);
const buttonCreateNote = document.querySelector(".btn");


buttonCreateNote.addEventListener("click", onOpenModal);

function onOpenModal() {
  window.addEventListener("keydown", onEscKeydown);
  backdropEl.classList.remove("is-hidden");
  closeModalBtn.addEventListener("click", onCloseModal);
  document.body.classList.add("modal-show");
}

function onCloseModal() {
  window.removeEventListener("keydown", onEscKeydown);
  backdropEl.classList.add("is-hidden");
  modalBodyEl.innerHTML = "";
  document.body.classList.remove("modal-show");
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onCloseModal();
  }
}

function onEscKeydown(e) {
  const ESC_KEY_CODE = "Escape";
  if (e.code === ESC_KEY_CODE) {
    onCloseModal();
  }
}
const notes = [];

function renderNotes() {
  const table = document.getElementById("table");
  const tbody = table.querySelector("tbody");

  const rows = notes
    .map((rowData, index) => {
      const cells = Object.values(rowData)
        .map((value) => `<td>${value}</td>`)
        .join("");
      return `<tr id=${index}>${cells}
      <td></td>
      <td>
      <button class="table__btn">
      <svg class="table__icon" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="32px" height="32px"><path d="M 23.90625 3.96875 C 22.859375 3.96875 21.8125 4.375 21 5.1875 L 5.1875 21 L 5.125 21.3125 L 4.03125 26.8125 L 3.71875 28.28125 L 5.1875 27.96875 L 10.6875 26.875 L 11 26.8125 L 26.8125 11 C 28.4375 9.375 28.4375 6.8125 26.8125 5.1875 C 26 4.375 24.953125 3.96875 23.90625 3.96875 Z M 23.90625 5.875 C 24.410156 5.875 24.917969 6.105469 25.40625 6.59375 C 26.378906 7.566406 26.378906 8.621094 25.40625 9.59375 L 24.6875 10.28125 L 21.71875 7.3125 L 22.40625 6.59375 C 22.894531 6.105469 23.402344 5.875 23.90625 5.875 Z M 20.3125 8.71875 L 23.28125 11.6875 L 11.1875 23.78125 C 10.53125 22.5 9.5 21.46875 8.21875 20.8125 Z M 6.9375 22.4375 C 8.136719 22.921875 9.078125 23.863281 9.5625 25.0625 L 6.28125 25.71875 Z"/></svg>
      </button>
      </td>
      <td>
      <button class="table__btn">
      <svg class="table__icon" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 20 8 C 13.539063 8 8.367188 13.109375 8.09375 19.5 C 3.417969 20.777344 0 24.996094 0 30 C 0 36.046875 4.953125 41 11 41 L 41 41 C 45.945313 41 50 36.945313 50 32 C 50 28.101563 47.402344 24.792969 43.90625 23.625 C 43.695313 17.761719 38.910156 13 33 13 C 31.960938 13 30.992188 13.257813 30.03125 13.53125 C 27.882813 10.261719 24.21875 8 20 8 Z M 20 10 C 23.726563 10 26.992188 12.09375 28.71875 15.09375 L 29.15625 15.8125 L 29.9375 15.53125 C 30.9375 15.167969 31.910156 15 33 15 C 37.953125 15 42 19.046875 42 24 L 42 25.09375 L 42.78125 25.28125 C 45.714844 25.972656 48 28.769531 48 32 C 48 35.855469 44.855469 39 41 39 L 11 39 C 6.046875 39 2 34.953125 2 30 C 2 25.671875 5.058594 21.996094 9.1875 21.1875 L 10 21.03125 L 10 20 C 10 14.433594 14.433594 10 20 10 Z M 24 20 L 24 31.5625 L 19.71875 27.28125 L 18.28125 28.71875 L 24.28125 34.71875 L 25 35.40625 L 25.71875 34.71875 L 31.71875 28.71875 L 30.28125 27.28125 L 26 31.5625 L 26 20 Z"/></svg>
      </button>
      </td>
      <td>
      <button id="removeButton" class="table__btn">
      <svg  class="table__icon" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 6.0683594 22 L 17.931641 22 L 19.634766 7 L 4.3652344 7 z"/></svg>
      </button>
      </td>
      </tr>`;
    })
    .join("");

  tbody.innerHTML = rows;
}

let form = document.querySelector(".create-note-form");
form.addEventListener("submit", createNote);

function createNote(e) {
  e.preventDefault();
  const data = new FormData(form);

  const formObj = {};
  for (const pair of data.entries()) {
    formObj[pair[0]] = pair[1];
  }
  notes.push(formObj);

  renderNotes();
  onCloseModal();
}

function createSVGElement(tag, attributes) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const attribute in attributes) {
    element.setAttribute(attribute, attributes[attribute]);
  }
  return element;
}

const svgIcon = [
  `<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 20 8 C 13.539063 8 8.367188 13.109375 8.09375 19.5 C 3.417969 20.777344 0 24.996094 0 30 C 0 36.046875 4.953125 41 11 41 L 41 41 C 45.945313 41 50 36.945313 50 32 C 50 28.101563 47.402344 24.792969 43.90625 23.625 C 43.695313 17.761719 38.910156 13 33 13 C 31.960938 13 30.992188 13.257813 30.03125 13.53125 C 27.882813 10.261719 24.21875 8 20 8 Z M 20 10 C 23.726563 10 26.992188 12.09375 28.71875 15.09375 L 29.15625 15.8125 L 29.9375 15.53125 C 30.9375 15.167969 31.910156 15 33 15 C 37.953125 15 42 19.046875 42 24 L 42 25.09375 L 42.78125 25.28125 C 45.714844 25.972656 48 28.769531 48 32 C 48 35.855469 44.855469 39 41 39 L 11 39 C 6.046875 39 2 34.953125 2 30 C 2 25.671875 5.058594 21.996094 9.1875 21.1875 L 10 21.03125 L 10 20 C 10 14.433594 14.433594 10 20 10 Z M 24 20 L 24 31.5625 L 19.71875 27.28125 L 18.28125 28.71875 L 24.28125 34.71875 L 25 35.40625 L 25.71875 34.71875 L 31.71875 28.71875 L 30.28125 27.28125 L 26 31.5625 L 26 20 Z"/></svg>
  `,
  ` <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 6.0683594 22 L 17.931641 22 L 19.634766 7 L 4.3652344 7 z"/></svg>`,
];

function addSVGIconsToHeaders() {
  const thElements = document.querySelectorAll(".icon-header");

  thElements.forEach((thElement, index) => {
    const svgContainer = document.createElement("div");
    svgContainer.innerHTML = svgIcon[index].trim();
    thElement.appendChild(svgContainer.firstChild);
  });
}
addSVGIconsToHeaders();


const deleteNoteBtn = document.querySelector('.table__delete');

