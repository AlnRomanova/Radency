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
    .map((rowData) => {
      const cells = Object.values(rowData)
        .map((value) => `<td>${value}</td>`)
        .join("");
      return `<tr>${cells}</tr>`;
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
