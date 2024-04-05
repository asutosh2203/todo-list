// set required variables
let tasks = [
  {
    id: 'task-0',
    title: 'Do homework',
    isComplete: false,
  },
  {
    id: 'task-1',
    title: 'Do Laundry',
    isComplete: true,
  },
  {
    id: 'task-2',
    title: 'Feed cat',
    isComplete: false,
  },
];

// get elements on the page
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const tasksList = document.getElementById('pending-tasks');
const taskCountCont = document.getElementById('task-count');
const taskFilters = document.querySelectorAll('input[name="options"]');
const completeAll = document.getElementById('complete-all');
const clearCompleted = document.getElementById('clear-completed');

// function to create a new task HTML element and insert it in the list
function updateTaskList(updatedTasks = tasks) {
  tasksList.innerHTML = '';
  if (updatedTasks.length === 0) {
    tasksList.innerHTML = '<h3>No tasks here</h3>';
  }
  updatedTasks.forEach((task) => {
    const taskP = document.createElement('p');
    taskP.innerHTML = task.title;
    if (task.isComplete) {
      taskP.classList.add('task-completed');
    }

    const newTask = document.createElement('div');
    newTask.classList.add('pending-task');

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = task.isComplete;
    checkBox.addEventListener('click', () => {
      task.isComplete = checkBox.checked;
      if (checkBox.checked) {
        taskP.classList.add('task-completed');
      } else {
        taskP.classList.remove('task-completed');
      }
    });

    const deleteTask = document.createElement('button');
    const dltTaskBtn = document.createElement('i');
    dltTaskBtn.classList.add('fa-solid');
    dltTaskBtn.classList.add('fa-xmark');
    deleteTask.appendChild(dltTaskBtn);

    deleteTask.addEventListener('click', () => deleteTaskById(task.id));

    newTask.appendChild(checkBox);
    newTask.appendChild(taskP);
    newTask.appendChild(deleteTask);

    tasksList.appendChild(newTask);
  });

  taskCountCont.innerHTML = updatedTasks.length;
}

function deleteTaskById(taskId) {
  tasks = tasks.filter((task) => {
    return task.id != taskId;
  });

  updateTaskList();
}

// complete all tasks
completeAll.addEventListener('click', () => {
  tasks.forEach((task) => (task.isComplete = true));
  updateTaskList();
});

// delete all completed tasks
clearCompleted.addEventListener('click', () => {
  tasks = tasks.filter((task) => task.isComplete === false);
  updateTaskList();
});

// function to add task to the list
function addTaskToList() {
  if (taskInput.value !== '') {
    const id = 'task-' + tasks.length;
    tasks.push({ id, title: taskInput.value, isComplete: false });
    taskInput.value = '';

    updateTaskList();
  } else {
    // alert user if task field is empty
    alert('Please input task to add');
  }
}

// adding event listener to populate tasks list
addTaskBtn.addEventListener('click', addTaskToList);
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTaskToList();
});

// changing tasks on the list based on all/ completed/ incomplete
taskFilters.forEach((taskFilter) => {
  taskFilter.addEventListener('click', () => {
    {
      var selectedOption = document.querySelector(
        'input[name="options"]:checked'
      );
      var labels = document.querySelectorAll('label');

      labels.forEach(function (label) {
        if (label.htmlFor === selectedOption.id) {
          label.style.fontWeight = 'bold';
        } else {
          label.style.fontWeight = 'normal';
        }
      });
    }
  });

  if (taskFilter.id === 'all') {
    taskFilter.addEventListener('click', () => {
      updateTaskList();
    });
  }
  
  if (taskFilter.id === 'completed') {
    taskFilter.addEventListener('click', () => {
      const completedTasks = tasks.filter((task) => task.isComplete === true);
      updateTaskList(completedTasks);
    });
  }

  if (taskFilter.id === 'incomplete') {
    taskFilter.addEventListener('click', () => {
      const incompleteTasks = tasks.filter((task) => task.isComplete === false);
      updateTaskList(incompleteTasks);
    });
  }
});

// initial rendering of the tasks
updateTaskList();
