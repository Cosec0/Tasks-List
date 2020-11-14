let tasks;

loadEventListners();

function loadEventListners() {
    document.querySelector('#add-task-form').addEventListener('submit', addNewTask);
    document.querySelector('.collection').addEventListener('click', deleteTask);
}

function addNewTask(e) {
    let new_task = document.querySelector('#new-task').value;
    if(new_task === '') {
        alert('Task cannot be empty');
    }
    else {
        createTaskItem(new_task);
    }
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
}