// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
 if (!nextID){
    nextId = 1;
 }
 return nextId++ 
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    let card = 
    `<div class="card mb-3 task-card" id="task-${task.id}" data-id="${task.id}">
      <div class="card-body">
        <h5 class="card-title">${task.title}</h5>
        <p class="card-text">${task.description}</p>
        <p class="card-text"><small class="text-muted">Due: ${task.dueDate}</small></p>
        <button class="btn btn-danger btn-sm delete-btn">Delete</button>
      </div>
    </div>`;
  return card;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
if (!taskList) {
          taskList = [];
        }
        
$('#todo-cards').empty();
$('#in-progress-cards').empty();
 $('#done-cards').empty();
        
        taskList.forEach(task => {
          let card = createTaskCard(task);
          if (task.status === "todo") {
            $('#todo-cards').append(card);
          } else if (task.status === "in-progress") {
            $('#in-progress-cards').append(card);
          } else if (task.status === "done") {
            $('#done-cards').append(card);
          }
      
          let today = dayjs();
          let dueDate = dayjs(task.dueDate);
          if (dueDate.isBefore(today, 'day')) {
            $(`#task-${task.id}`).addClass('bg-danger');
          } else if (dueDate.diff(today, 'day') <= 3) {
            $(`#task-${task.id}`).addClass('bg-warning');
          }});
      
        $(".task-card").draggable({
          revert: "invalid",
          stack: ".task-card",
          cursor: "move"
        });
        $(".lane").droppable({
            accept: ".task-card",
            drop: handleDrop});}
// Todo: create a function to handle adding a new task
function handleAddTask(event){
 event.preventDefault();
  
  let title = $('#taskTitle').val();
  let description = $('#taskDescription').val();
  let dueDate = $('#taskDueDate').val();
  
  if (title && dueDate) {
    let newTask = {
      id: generateTaskId(),
      title: title,
      description: description,
      dueDate: dueDate,
      status: "todo"
    };
    
    taskList.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    localStorage.setItem("nextId", JSON.stringify(nextId));
    
    renderTaskList();
    $('#formModal').modal('hide');}}
// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    let taskId = $(event.target).closest('.task-card').data('id');
    taskList = taskList.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    let taskId = ui.draggable.data('id');
    let newStatus = $(this).attr('id');
    
    taskList.forEach(task => {
      if (task.id === taskId) {
        task.status = newStatus.split('-')[0];
      }});
    
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
