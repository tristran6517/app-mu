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
  if (num == 0) {
    return 'Customer'
  } else if (num == 1) {
    return 'Admin'
  } else {
    return 'User'
  }
}

// function changeAge(year) {
//   var date = new Date();
//   var currentYear = date.getFullYear();
//   return currentYear - year;
// }

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
alert('Coming soon....')

  // // Hide/Show form
  // document.getElementsByClassName('formAdd')[0].classList.remove('d-block');
  // document.getElementsByClassName('formAdd')[0].classList.add('d-none');
  // document.getElementsByClassName('formEdit')[0].classList.add('d-block');
  // document.getElementsByClassName('formEdit')[0].classList.remove('d-none');

  // // Edit function
  // var elName = document.getElementById('edit-name');
  // var elAge = document.getElementById('edit-age');
  // var elEmail = document.getElementById('edit-email');
  // var elRole = document.getElementById('edit-role');
  // elName.value = user[item].name;
  // elAge.value = user[item].age;
  // elEmail.value = user[item].email;
  // elRole.value = user[item].role;

  // // Event edit
  // document.getElementsByClassName('formEdit')[0].onsubmit = function () {
  //   var editName = elName.value;
  //   var editAge = elAge.value;
  //   var editEmail = elEmail.value;
  //   var editRole = elRole.value;
  //   user.splice({
  //     name: user[item].name,
  //     age: user[item].age,
  //     email: user[item].email,
  //     role: user[item].role
  //   }, 1, {
  //     name: editName.trim(),
  //     age: editAge.trim(),
  //     email: editEmail.trim(),
  //     role: editRole.trim()
  //   })

  //   elName.value = '';
  //   elAge.value = '';
  //   elEmail.value = '';
  //   elRole.value = 0;
  //   fetchData();
  //   document.getElementsByClassName('formAdd')[0].classList.add('d-block');
  //   document.getElementsByClassName('formAdd')[0].classList.remove('d-none');
  //   document.getElementsByClassName('formEdit')[0].classList.remove('d-block');
  //   document.getElementsByClassName('formEdit')[0].classList.add('d-none');
  // }
}

fetchData();
