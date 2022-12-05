
//define ui variable
const taskInput=document.querySelector('#task');
const form=document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');

//Load all event listeners
loadEventListeners();

//Load all event listener
function loadEventListeners(){
    
  //dom load event
 document.addEventListener('DOMContentLoaded',getTasks);  
  //Add task event
  form.addEventListener('submit',addTasks);

  //Remove task event
  taskList.addEventListener('click',removeTask);

  //clear task
  clearBtn.addEventListener('click',clearTasks);

  //filter
  filter.addEventListener('keyup',filterTasks);
}

//Get task from ls
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  }
  else {
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }

 
  tasks.forEach(function(task){
      //Create li element to be added to unordered list
    const li=document.createElement('li');
    //Add class
    li.className='collection-item';
    //create a textnode and append to li
    li.appendChild(document.createTextNode(task));

    //create a new link element
    const link=document.createElement('a');
    //add class 
    link.className='delete-item secondary-content';
    //add icon html
    link.innerHTML='<i class="fa fa-remove"></i>';
    //append link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);
  });

}



function addTasks(e){
 
  if(taskInput.value===''){
    alert('Add a task');
  }  
  //Create li element to be added to unordered list
  const li=document.createElement('li');
  //Add class
  li.className='collection-item';
  //create a textnode and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  //create a new link element
  const link=document.createElement('a');
  //add class 
  link.className='delete-item secondary-content';
  //add icon html
  link.innerHTML='<i class="fa fa-remove"></i>';
  //append link to li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);
  
  //store in local storage
  storeTaskInLocalStorage(taskInput.value);
  taskInput.value='';
  e.preventDefault();
}
//store task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  }
  else {
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
 
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeTask(e){
   
  if(e.target.parentElement.classList.contains('delete-item')){
   if(confirm('Are you sure')){
    e.target.parentElement.parentElement.remove();
   }
  }

    e.preventDefault();
}

function clearTasks(){
  
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
}

function filterTasks(e){
  const text=e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item=task.firstChild.textContent.toLowerCase();
    if(item.indexOf(text)!=-1){
       task.style.display='block';
    }
    else{
      task.style.display='none';
    }
  })
  
}
