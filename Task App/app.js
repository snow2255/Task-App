// define UI variables

const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearbtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter');
const taskinput = document.querySelector('#task');

// load event listeners 
loadEventListeners();


//load all event 
function loadEventListeners(){
    //add submit event
    form.addEventListener('submit', addTask);
    //add remove task event 
    tasklist.addEventListener('click', removeTask);
    //clear all task event
    clearbtn.addEventListener('click', clearTask);
    //filter the task event
    filter.addEventListener('keydown', filterTask);
    //load DOM load event
    document.addEventListener('DOMContentLoaded', loadTasks);


}

//load stored tasks
function loadTasks(e){
      let tasks ;
      if(localStorage.getItem('tasks') === null){
          tasks = [];
      }
      else{
          tasks =JSON.parse(localStorage.getItem('tasks'));
      }

      tasks.forEach((task) =>{
        const li = document.createElement('li');
        li.className = 'collection-item';
        // add text to the list item
        li.appendChild(document.createTextNode(task));
    
        // create a delete link element 
    
        const link = document.createElement('a');
        // add class name to link element
    
        link.className = 'delete-item secondary-content';
        // add icon to link element 
        const icon = document.createElement('i');
        icon.className = 'fa fa-remove'
        link.appendChild(icon)
    
        // instead of doing the three above steps this one will do
    
        //link.innerHTML = `<i class="fa fa-remove"> </i>`
    
        li.appendChild(link)
        
        tasklist.appendChild(li)

      });

}



//add task event function

function addTask(e){
    if(taskinput.value === ''){
        
        alert('Please Add A Task')
    }

    // if taskinput is not empty we create a new task 
    const li = document.createElement('li');
    li.className = 'collection-item';
    // add text to the list item
    li.appendChild(document.createTextNode(taskinput.value));

    // create a delete link element 

    const link = document.createElement('a');
    // add class name to link element

    link.className = 'delete-item secondary-content';
    // add icon to link element 
    const icon = document.createElement('i');
    icon.className = 'fa fa-remove'
    link.appendChild(icon)

    // instead of doing the three above steps this one will do

    //link.innerHTML = `<i class="fa fa-remove"> </i>`

    li.appendChild(link)
    
    tasklist.appendChild(li)

    //add task to storage
    storeTaskInLocalStorage(taskinput.value)
  
    //clear the input file
    taskinput.value = '';
    e.preventDefault();
}

//remove task from list of task

function removeTask(e){
    let tasks  ;
    if(e.target.parentElement.classList.contains('delete-item')){
        var check = window.confirm('Are you sure you want to Delete this task?');
        if(check){
            e.target.parentElement.parentElement.remove();

            // remove deleted task form storage
            tasks = JSON.parse(localStorage.getItem('tasks'));

            tasks.forEach((task, index) =>{
                if(task === e.target.parentElement.parentElement.textContent){
                    tasks.splice(index, 1);
                    
                }
            localStorage.setItem('tasks', JSON.stringify(tasks));
            });
          
        



        }
    }
}

//clear all the task 

function clearTask(e){
    //first way to do this 
    //tasklist.innerHTML = '';

    // or use the faster removenode 
    if(confirm('Delete All Task')){
        while(tasklist.firstChild){
         
            tasklist.removeChild(tasklist.firstChild);
            localStorage.removeItem('tasks');
        }
    }
}


function filterTask(e){
    
    const filter_text = e.target.value.toLowerCase()
    document.querySelectorAll('.collection-item').forEach(function (task){
        
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(filter_text) != -1){
                task.style.display = 'block';
            }
            else{
                task.style.display = 'none';
            }
        
        });
}


//store task to local storage

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];

    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearLocalStorage(task){

}