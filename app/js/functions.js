let el = document.getElementById('table__body');

const user = [{
    name: 'abc',
    age: 1994,
    email: 'test@admin.com',
    role: 0
  },
  {
    name: 'xyz',
    age: 1993,
    email: 'test@admin.com',
    role: 1
  },
  {
    name: 'cba',
    age: 1992,
    email: 'test@admin.com',
    role: 2
  },
  {
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

function fetchData() {
  var data = '';
  if (user.length > 0) {
    for (var i = 0; i < user.length; i++) {
      data += '<tr>';
      data += '<td>' + user[i].name + '</td>';
      data += '<td>' + user[i].age + '</td>';
      data += '<td>' + user[i].email + '</td>';
      data += '<td>' + checkRole(user[i].role) + '</td>';
      data += '<td><button class="btn btn-primary mr-1" onclick="editItem(' + i + ')">Edit</button><button class="btn btn-danger" onclick="delItem(' + i + ')">Delete</button></td>';
      data += '</tr>';
    }
  }
  return el.innerHTML = data;
}

function checkRole(num) {
  for (const ele in permissions) {
    if (num == ele) return permissions[ele];
  }
}

function addItem(e) {
  event.preventDefault();
  var elName = document.getElementById('name');
  var elAge = document.getElementById('age');
  var elEmail = document.getElementById('email');
  var elRole = document.getElementById('role');
  var name = elName.value;
  var age = elAge.value;
  var email = elEmail.value;
  var role = elRole.value;

  if (name && age && email && role) {
    user.push({
      name: name,
      age: age,
      email: email,
      role: role
    });
    elName.value = '';
    elAge.value = '';
    elEmail.value = '';
    elRole.value = 0;
    fetchData();
  } else {
    alert("Please fill information")
  }
}

function delItem(item) {
  user.splice(item, 1)
  fetchData();
}

function editItem(item) {
  // Change title form
  document.getElementById('title-form').innerHTML = "Edit User";

  // Hide/Show form
  document.getElementsByClassName('formAdd')[0].classList.remove('d-block');
  document.getElementsByClassName('formAdd')[0].classList.add('d-none');
  document.getElementById('form-edit').classList.add('d-block');
  document.getElementById('form-edit').classList.remove('d-none');

  // Get value edit
  var elName = document.getElementById('edit-name');
  var elAge = document.getElementById('edit-age');
  var elEmail = document.getElementById('edit-email');
  var elRole = document.getElementById('edit-role');
  elName.value = user[item].name;
  elAge.value = user[item].age;
  elEmail.value = user[item].email;
  elRole.value = user[item].role;

  // Event submit edit
  document.getElementById('form-edit').onsubmit = function () {
    user[item].name = elName.value;
    user[item].age = elAge.value;
    user[item].email = elEmail.value;
    user[item].role = elRole.value;

    elName.value = '';
    elAge.value = '';
    elEmail.value = '';
    elRole.value = 0;
    fetchData();
    document.getElementsByClassName('formAdd')[0].classList.add('d-block');
    document.getElementsByClassName('formAdd')[0].classList.remove('d-none');
    document.getElementById('form-edit').classList.remove('d-block');
    document.getElementById('form-edit').classList.add('d-none');

    // Change title form
    document.getElementById('title-form').innerHTML = "Add User";
  }
}

function validateEmail(email, self) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) {
    self.style.border = '1px solid red';
    alert('Please enter email valid');
  } else {
    self.style.border = '1px solid';
  }
}

fetchData();