let tasks;

loadEventListners();

function loadEventListners() {
    loadTasks();
    document.querySelector('#add-task-form').addEventListener('submit', addNewTask);
    document.querySelector('.collection').addEventListener('click', deleteTask);
    document.querySelector('#clear-tasks-button').addEventListener('click', clearTasks);
    document.querySelector('#search').addEventListener('input', onSearch);
}

function onSearch(e) {
    tasks = Array.from(document.querySelector('.collection').children);
    tasks.forEach(function(task){
        task.remove();
    });
    tasks = JSON.parse(localStorage.getItem('tasks'));
    let filteredTask;
    if(e.target.value != '') {
        filteredTask = tasks.filter(task => task.indexOf(e.target.value) != -1);
    }
    else {
        filteredTask = tasks;
    }
    filteredTask.forEach(function(task) {
        createTaskItem(task);
    })    
}

function addNewTask(e) {
    let new_task = document.querySelector('#new-task').value;
    if(new_task === '') {
        alert('Task cannot be empty');
    }
    else {
        createTaskItem(new_task);
        new_task = '';
    }
    storeTasktoLocalStorage(new_task);
}

function createTaskItem(new_task) {
    let task = document.createElement('li');
    task.className = 'collection-item';
    task.appendChild(document.createTextNode(new_task));

    let deleteBtn = document.createElement('a');
    deleteBtn.setAttribute('href', '#');
    deleteBtn.className = 'secondary-content';
    deleteBtn.appendChild(document.createTextNode('X'));

    task.appendChild(deleteBtn);

    document.querySelector('.collection').appendChild(task);
}

function deleteTask(e) {
    if(e.target.className == 'secondary-content') {
        if(confirm('Are you sure you want to delete?')) {
            e.target.parentElement.remove();
        }
    }
    removeTaskFromLocalStorage(e.target.parentElement.innerText);
}

function clearTasks(e, p = "not_search") {
    e.preventDefault();
    tasks = Array.from(document.querySelector('.collection').children);
    tasks.forEach(function(task){
        task.remove();
    });
    localStorage.removeItem('tasks');
}

function loadTasks() {
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {
        createTaskItem(task);
    })
}

function storeTasktoLocalStorage(new_task) {
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(new_task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function removeTaskFromLocalStorage(deleted_task) {
    deleted_task = deleted_task.substr(0, deleted_task.length-1);
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(tasks.indexOf(deleted_task), 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}