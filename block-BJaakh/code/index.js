let ulRoot = document.querySelector('.todos');
let todoInput = document.querySelector('input[type="text"]');
const baseURL = `https://basic-todo-api.vercel.app/api/`;

function handleDelete(id) {
  fetch(baseURL + `todo/${id}`, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(data), // body data type must match "Content-Type" header
  }).then(() => {
    displayTodos();
  });
}

function handleToggle(id, status) {
  let data = {
    todo: {
      isCompleted: !status,
    },
  };
  fetch(baseURL + `todo/${id}`, {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    // body: JSON.stringify(data), // body data type must match "Content-Type" header
  }).then(() => {
    displayTodos();
  });
}

function handleEdit(event, id, title) {
  let input = document.createElement('input');
  input.classList.add('input-2');
  input.value = title;
  let p = event.target;
  let parent = event.target.parentElement;
  parent.replaceChild(input, p);
  console.log(input, p, parent);
  input.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && event.target.value) {
      let data = {
        todo: {
          title: event.target.value,
        },
      };
      fetch(baseURL + `todo/${id}`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        // body: JSON.stringify(data), // body data type must match "Content-Type" header
      }).then(() => {
        displayTodos();
      });
    }
  });
}

function createUI(data) {
  ulRoot.innerHTML = '';
  data.forEach((todo) => {
    let li = document.createElement('li');
    let input = document.createElement('input');
    input.addEventListener('click', () =>
      handleToggle(todo._id, todo.isCompleted)
    );
    input.type = 'checkbox';
    input.checked = todo.isCompleted;
    input.setAttribute('data-id', todo._id);
    let p = document.createElement('p');
    p.addEventListener('dblclick', (event) =>
      handleEdit(event, todo._id, todo.title)
    );
    p.innerText = todo.title;
    let span = document.createElement('span');
    span.innerText = '❌';
    span.addEventListener('click', () => handleDelete(todo._id));
    span.setAttribute('data-id', todo._id);
    li.append(input, p, span);
    ulRoot.append(li);
  });
}

function displayTodos() {
  fetch(baseURL + 'todo')
    .then((response) => response.json())
    .then((allTodos) => {
      console.log(allTodos.todos);
      createUI(allTodos.todos);
    });
}

function addTodo(event) {
  if (event.keyCode === 13 && event.target.value.trim()) {
    let data = {
      todo: {
        title: event.target.value,
        isCompleted: false,
      },
    };
    fetch(baseURL + 'todo', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    }).then(() => {
      event.target.value = '';
      displayTodos();
    });
  }
}

todoInput.addEventListener('keyup', addTodo);
displayTodos();
