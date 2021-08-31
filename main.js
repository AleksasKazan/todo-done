var todoInput = document.getElementById('todo-input');
var todoForm = document.getElementById('todo-form');
var todos = document.getElementById('todos');
var dones = document.getElementById('dones');
// SITA ATSIKOMENTUOTI PIRMAM UZKROVIMUI
// var duomenys = [{
//         todo: 'Pirmas',
//         done: true,
//     },
//     {
//         todo: 'Antras',
//         done: false,
//     },
//     {
//         todo: 'Trecias',
//         done: false,
//     }
// ];
// duomenys = JSON.stringify(duomenys);
// localStorage.setItem('Sarasas', duomenys);
var duomenys = localStorage.getItem('Sarasas');
duomenys = JSON.parse(duomenys);
console.log('pakraunant puslapi pirma karta', duomenys);
duomenys.forEach(value => {
    console.log(value.done);
    if (value.done) {
        var card = `
    <div class="border border-1 shadow-sm p-3 mb-3 bg-body rounded todo-item">
        <h4 class="mb-3 input-name">${value.todo}</h4>
        <button type="button" class="btn btn-danger delete">Delete</button>
        <button type="button" class="btn btn-success move-todo">Move to Done</button>
        <button type="button" class="btn btn-warning edit" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
    </div>
    `;
        todos.innerHTML += card;
    } else {
        var card = `
    <div class="border border-1 shadow-sm p-3 mb-3 bg-body rounded todo-item">
        <h4 class="mb-3 input-name">${value.todo}</h4>
        <button type="button" class="btn btn-danger delete">Delete</button>
        <button type="button" class="btn btn-success move-done">Move Back</button>
        <button type="button" class="btn btn-warning edit" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
    </div>
    `;
        dones.innerHTML += card;
    }
});
todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var duomenys = localStorage.getItem('Sarasas');
    duomenys = JSON.parse(duomenys);
    if (todoInput.value.length > 0) {
        var card = `
        <div class="border border-1 shadow-sm p-3 mb-3 bg-body rounded todo-item">
            <h4 class="mb-3 input-name">${todoInput.value}</h4>
            <button type="button" class="btn btn-danger delete">Delete</button>
            <button type="button" class="btn btn-success move-todo">Move to Done</button>
            <button type="button" class="btn btn-warning edit" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
        </div>
        `;
        duomenys.push({ todo: todoInput.value, done: true });
        duomenys = JSON.stringify(duomenys);
        localStorage.setItem('Sarasas', duomenys);
        todos.innerHTML += card;
        todoForm.reset();
    } else {
        todoInput.classList.add('is-invalid');
    }
});
document.addEventListener('click', function(e) {
    if (e.target.matches('.delete')) {
        var duomenys = localStorage.getItem('Sarasas');
        duomenys = JSON.parse(duomenys);
        var duomenys = duomenys.filter(item => item.todo != e.target.closest('.todo-item').querySelector('h4').innerText);
        console.log(duomenys);
        duomenys = JSON.stringify(duomenys);
        localStorage.setItem('Sarasas', duomenys);
        e.target.closest('.todo-item').remove();

    } else if (e.target.matches('.move-todo')) {
        var duomenys = localStorage.getItem('Sarasas');
        duomenys = JSON.parse(duomenys);
        var text = e.target.closest('.todo-item').querySelector('h4').innerText;
        console.log(text);

        var duomenys = duomenys.map(item => item.todo == text ? {...item, done: !item.done } : item);

        console.log(duomenys);
        duomenys = JSON.stringify(duomenys);
        localStorage.setItem('Sarasas', duomenys);

        var cardTodo = e.target.closest('.todo-item');
        e.target.classList.remove('move-todo');
        e.target.classList.add('move-done');
        e.target.innerText = 'Move Back';
        dones.appendChild(cardTodo);
    } else if (e.target.matches('.move-done')) {
        var duomenys = localStorage.getItem('Sarasas');
        duomenys = JSON.parse(duomenys);
        var cardDone = e.target.closest('.todo-item');
        e.target.classList.remove('move-done');
        e.target.classList.add('move-todo');
        e.target.innerText = 'Move to Done';
        todos.appendChild(cardDone);
    } else if (e.target.matches('.edit')) {
        // var duomenys = localStorage.getItem('Sarasas');
        // duomenys = JSON.parse(duomenys);
        h4 = e.target.closest('.todo-item').querySelector('h4');
        // var modalInput = h4;
        modalInput = document.getElementById('modal-input');
        modalInput.value = h4.innerText;
    } else if (e.target.matches('.save')) {
        var duomenys = localStorage.getItem('Sarasas');
        duomenys = JSON.parse(duomenys);
        // var modalInput2 = document.getElementById('modal-input');
        h4.innerText = modalInput.value;
    }
});