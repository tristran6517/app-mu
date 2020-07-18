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


const users = [{
    id: 0,
    name: 'abc',
    age: 1994,
    email: 'test@admin.com',
    role: 0
  },
  {
    id: 1,
    name: 'xyz',
    age: 1993,
    email: 'test@admin.com',
    role: 1
  },
  {
    id: 2,
    name: 'cba',
    age: 1992,
    email: 'test@admin.com',
    role: 2
  },
  {
    id: 3,
    name: 'zyx',
    age: 1991,
    email: 'test@admin.com',
    role: 0
  }
]

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
  var data = '';
  if (users.length > 0) {
    for (var i = 0; i < users.length; i++) {
      data += '<tr>';
      data += '<td>' + users[i].name + '</td>';
      data += '<td>' + users[i].age + '</td>';
      data += '<td>' + users[i].email + '</td>';
      data += '<td>' + permissions[users[i].role] + '</td>';
      data += `<td>
        <button class="btn btn-info btn-check mr-1">Check</button>
        <button class="btn btn-primary mr-1 btn-edit">Edit</button>
        <button class="btn btn-danger btn-del">Delete</button>
      </td>`;
      data += '</tr>';
    }
  }
  return el.innerHTML = data;
}

Array.from(els).forEach((el) => {
  el.addEventListener('change', function (e) {
    objUser[e.target.name] = e.target.value;
    return objUser;
  })
})

function addItem(e) {
  event.preventDefault();
  if (stateForm) {
    users.push(objUser);
  } else {
    editItem(indexRow);
    stateForm = true;
  }
  resetInput();
  fetchData();
  fetchBtn();
}

function delItem(item) {
  users.splice(item, 1)
  fetchData();
  Array.from(btnDel).forEach((btn, index) => {
    btn.addEventListener('click', function (e) {
      delItem(index);
    })
  })
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
  Array.from(els).forEach(el => {
    el.value = '';
    if (el.name === "role") el.value = 0;
  });
  titleForm.innerHTML = "Add User";
  btnAdd.value = "Add";
  btnAdd.classList.remove("btn-danger");
}

function fetchBtn() {
  Array.from(btnEdit).forEach((btn, index) => {
    btn.addEventListener('click', function (e) {
      setValueEdit(index);
      indexRow = index;
    })
  })

  Array.from(btnDel).forEach((btn, index) => {
    btn.addEventListener('click', function (e) {
      delItem(index);
    })
  })

  Array.from(btnCheck).forEach((btn, index) => {
    btn.addEventListener('click', function (e) {
      modalPopup.classList.remove('d-none')
      setValuePopup(index);
    })
  })
}

function handleSearch(txtCompare) {
  users.find((o, i) => {
    if (o.name == txtCompare) {
      var data = '';
      data += '<tr>';
      data += '<td>' + users[i].name + '</td>';
      data += '<td>' + users[i].age + '</td>';
      data += '<td>' + users[i].email + '</td>';
      data += '<td>' + permissions[users[i].role] + '</td>';
      data += `<td>
            <button class="btn btn-info btn-check mr-1">Check</button>
            <button class="btn btn-primary mr-1 btn-edit">Edit</button>
            <button class="btn btn-danger btn-del">Delete</button>
          </td>`;
      data += '</tr>';
      return el.innerHTML = data;
    } else {
      fetchData();
    }
  })
}

function handleSelectSort(objs) {
  var data = '';
  if (objs.length > 0) {
    for (var i = 0; i < objs.length; i++) {
      data += '<tr>';
      data += '<td>' + objs[i].name + '</td>';
      data += '<td>' + objs[i].age + '</td>';
      data += '<td>' + objs[i].email + '</td>';
      data += '<td>' + permissions[objs[i].role] + '</td>';
      data += `<td>
        <button class="btn btn-info btn-check mr-1">Check</button>
        <button class="btn btn-primary mr-1 btn-edit">Edit</button>
        <button class="btn btn-danger btn-del">Delete</button>
      </td>`;
      data += '</tr>';
    }
  }
  return el.innerHTML = data;
}

document.querySelector('#input-search').addEventListener('keyup', function (e) {
  txtInputSearch = e.target.value;
  return txtInputSearch;
})


document.querySelector('#btn-search').addEventListener('click', function () {
  handleSearch(txtInputSearch);
  fetchBtn();
})


document.querySelector('.btn-sort').addEventListener('click', function () {
  stateSortAge = !stateSortAge;
  if (stateSortAge) {
    users.sort((a, b) => a.age - b.age)
  } else {
    users.sort((a, b) => b.age - a.age)
  }
  fetchData();
  fetchBtn();
  resetInput()
})

window.onclick = function (event) {
  if (event.target == modalPopup) {
    modalPopup.classList.add('d-none')
  }
}

document.querySelector("#sort-role").addEventListener('change', function (e) {
  var target = e.target;
  var value = target.value;
  var result = users.filter(e => e.role == value);
  if (result.length > 0) {
    handleSelectSort(result);
  } else {
    fetchData();
  }
  fetchBtn();
})

fetchData();
fetchBtn();