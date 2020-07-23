/* Declare
--------------------------------------------------*/
let el = document.getElementById('table__body');
let popupHTML = document.querySelector(".modal-popup__wrapper");
let titleForm = document.querySelector("#title-form");
let btnAdd = document.querySelector("#btn-submit");
let txtInputSearch = '';
let stateForm = true;
let stateSortAge = true;
let indexRow = 0;
let modalPopup = document.getElementsByClassName('modal-popup')[0];
const els = document.getElementsByClassName('input-user');
const btnEdit = document.getElementsByClassName('btn-edit');
const btnDel = document.getElementsByClassName('btn-del');
const btnCheck = document.getElementsByClassName('btn-check');
const modalDesc = document.querySelectorAll('.modal-popup__row .desc');


const users = [
  {
    id: 0,
    name: "Ele 0",
    age: 1994,
    email: "test@gmail.com",
    role: 0
  },
  {
    id: 1,
    name: "Ele 1",
    age: 1994,
    email: "test@gmail.com",
    role: 1
  },
  {
    id: 2,
    name: "Ele 2",
    age: 1994,
    email: "test@gmail.com",
    role: 1
  },
  {
    id: this.guidGenerator(),
    name: "ReactJS",
    age: 2013,
    email: "test@gmail.com",
    role: 0
  },
  {
    id: this.guidGenerator(),
    name: "AngularJS",
    age: 2010,
    email: "test@gmail.com",
    role: 1
  },
  {
    id: this.guidGenerator(),
    name: "VueJS",
    age: 2014,
    email: "test@gmail.com",
    role: 1
  },
];

let listUsers = [];

const permissions = {
  1: 'Admin',
  0: 'Customer',
  2: 'User'
}

const objUser = {
  id: guidGenerator(),
  name: '',
  age: 0,
  email: '',
  role: 0
};

/* Function
--------------------------------------------------*/
function guidGenerator() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function fetchData() {
  listUsers = [...users]
  TableRow(listUsers);
}

function TableRow(data) {
  var str = '';
  if (data.length > 0) {
    data.map(dt => {
      str += '<tr>';
      str += '<td>' + dt.name + '</td>';
      str += '<td>' + dt.age + '</td>';
      str += '<td>' + dt.email + '</td>';
      str += '<td>' + permissions[dt.role] + '</td>';
      str += `<td>
         <button class="btn btn-info btn-check mr-1">Check</button>
         <button class="btn btn-primary mr-1 btn-edit">Edit</button>
         <button class="btn btn-danger btn-del">Delete</button>
       </td>`;
      str += '</tr>';
    })
  }
  return el.innerHTML = str;
}

Array.from(els).forEach((el) => {
  el.addEventListener('change', function (e) {
    objUser[e.target.name] = e.target.value;
    return objUser;
  })
})

function addItem(e) {
  event.preventDefault();
  objUser.id = this.guidGenerator();
  var obj = {
    ...objUser
  };
  if (stateForm) {
    users.push(obj);
  } else {
    editItem(indexRow);
    stateForm = true;
  }
  resetInput();
  fetchData();
  fetchBtn();
}

function delItem(index) {
  var indexUserDelete = users.findIndex(user => user.id === listUsers[index].id);
  listUsers = users.splice(indexUserDelete, 1);
  resetInput();
  fetchData();
  fetchBtn();
}

function setValueEdit(index) {
  titleForm.innerHTML = "Edit User";
  btnAdd.value = "Edit";
  btnAdd.classList.add("btn-danger");
  const obj = users[index];
  Array.from(els).forEach(el => {
    var nameObj = el.name;
    el.value = obj[nameObj];
  });
  stateForm = false;
}

function setValuePopup(index) {
  const obj = users[index];
  popup(obj);
  fetchBtn();
  document.getElementsByClassName("modal-popup__close")[0].addEventListener('click', function () {
    modalPopup.classList.add('d-none')
  })
}

function popup(obj) {
  var str = '';
  str += '<div class="modal-popup__close">X</div>';
  for (o in obj) {
    str += `<div class="modal-popup__row ${(o === "id") ? "d-none" : ""}">`;
    str += `<p class="ttl mr-1">${o}:</p>`;
    if (o == "role") {
      str += `<p class="desc" name=${o}>${permissions[obj[o]]}</p>`;
    } else {
      str += `<p class="desc" name=${o}>${obj[o]}</p>`;
    }
    str += '</div>';
  }
  return popupHTML.innerHTML = str;
}

function editItem(index) {
  Array.from(els).forEach(el => {
    users[index][el.name] = el.value;
  })
}

function validateEmail(email, self) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) {
    self.style.border = '1px solid red';
    alert('Please enter email valid');
  } else {
    self.style.border = '1px solid #fff';
  }
}

function resetInput() {
  document.querySelectorAll("input").value = 0;
  Array.from(els).forEach(el => {
    el.value = '';
    if (el.name === "role") el.value = 0;
  });
  titleForm.innerHTML = "Add User";
  btnAdd.value = "Add User";
  btnAdd.classList.remove("btn-danger");
}

function fetchBtn() {
  Array.from(btnEdit).forEach((btn, index) => {
    btn.addEventListener('click', function (e) {
      var indexUserEdit = users.findIndex(user => user.id === listUsers[index].id);
      setValueEdit(indexUserEdit);
      indexRow = indexUserEdit;
    })
  })

  Array.from(btnDel).forEach((btn, index) => {
    btn.addEventListener('click', function (e) {
      delItem(index);
    })
  })

  Array.from(btnCheck).forEach((btn, index) => {
    btn.addEventListener('click', function (e) {
      modalPopup.classList.remove('d-none');
      var indexUserCheck = users.findIndex(user => user.id === listUsers[index].id)
      setValuePopup(indexUserCheck);
    })
  })
}

function handleSearch(txtCompare) {
  if (txtCompare) {
    listUsers = listUsers.filter(user => user.name.toLowerCase().indexOf(txtCompare) !== -1);
    TableRow(listUsers);
  } else {
    fetchData();
  }
}

document.querySelector('#btn-search').addEventListener('click', function () {
  txtInputSearch = document.querySelector('#input-search').value;
  handleSearch(txtInputSearch);
  document.querySelector('#input-search').value = "";
  fetchBtn();
  resetInput();
})

document.querySelector('.btn-sort').addEventListener('click', function () {
  if (stateSortAge) {
    users.sort((a, b) => a.age - b.age)
  } else {
    users.sort((a, b) => b.age - a.age)
  }
  stateSortAge = !stateSortAge;
  fetchData();
  fetchBtn();
  resetInput();
})

window.onclick = function (event) {
  if (event.target == modalPopup) {
    modalPopup.classList.add('d-none')
  }
}

document.querySelector("#sort-role").addEventListener('change', function (e) {
  resetInput();
  var target = e.target;
  var value = target.value;
  listUsers = users.filter(e => e.role == value);
  if (listUsers.length > 0) {
    TableRow(listUsers);
  } else {
    fetchData();
  }
  fetchBtn();
})

fetchData();
fetchBtn();