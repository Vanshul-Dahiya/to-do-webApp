const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

// get stored info from local storage
let list = JSON.parse(localStorage.getItem("list"));
if (list) {
  list.forEach((task) => {
    // for each task call the function
    toDoList(task);
  });
}

// To prevent refreshing of site on submitting
// add event.preventDefault()
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  toDoList();
});

function toDoList(task) {
  let newTask = inputEl.value;
  if (task) {
    newTask = task.name;
  }

  const liEl = document.createElement("li");

  if (task && task.checked) {
    liEl.classList.add("checked");
  }

  liEl.innerText = newTask;

  ulEl.appendChild(liEl);
  // !  after adding , clear input
  inputEl.value = "";

  // ! add checkbtn to new list item
  const checkBtn = document.createElement("div");
  checkBtn.innerHTML = `<i class="fa-solid fa-square-check"></i>`;

  liEl.appendChild(checkBtn);

  // ! add deletebtn to new list item
  const deleteBtn = document.createElement("div");
  deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;

  liEl.appendChild(deleteBtn);

  // ! take appropriate actions when buttons are clicked
  checkBtn.addEventListener("click", () => {
    liEl.classList.toggle("checked");
    updateLocalStorage();
  });

  deleteBtn.addEventListener("click", () => {
    liEl.remove();
    updateLocalStorage();
  });

  updateLocalStorage();
}

function updateLocalStorage() {
  const liEls = document.querySelectorAll("li");

  list = [];

  liEls.forEach((liEl) => {
    // list will contain all tasks in local storage
    list.push({
      name: liEl.innerText,
      // checked will store boolean value
      checked: liEl.classList.contains("checked"),
    });
  });
  // convert second parameter to string using JSON.stringify
  localStorage.setItem("list", JSON.stringify(list));
}
