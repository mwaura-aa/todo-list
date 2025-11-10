const inputContent = document.getElementById("input");
const date = document.getElementById('date');
const addBtn = document.getElementById('add');
const display = document.getElementById('display');

let inputArray = JSON.parse(localStorage.getItem('todos')) || [];

addBtn.onclick = function (){
  const todoTask = inputContent.value.trim();
  const todoDate = date.value;

  if(todoTask === '' || todoDate === ''){
    alert("Please Enter a Todo and a Date");
  }

  inputArray.push({task: todoTask, date: todoDate});

  localStorage.setItem('todos', JSON.stringify(inputArray));

  inputContent.value = '';
  date.value = '';
  inputContent.focus();//  this puts the cursor back in the text box
  
  renderTask();
}

function renderTask(){
  display.innerHTML = '';

  inputArray.forEach(function(todo, index){
    const todoItem = document.createElement('div');
    todoItem.classList.add('div-todoItem')
    const todoText = document.createElement('span');
    const todoDate = document.createElement('span');
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('deleteBtn');

    todoText.textContent = todo.task;
    todoDate.textContent = todo.date;
    deleteBtn.textContent = 'Delete';

    deleteBtn.onclick = function(){
      inputArray.splice(index, 1);
      localStorage.setItem('todos', JSON.stringify(inputArray));
      renderTask();
    }

    todoItem.appendChild(todoText);
    todoItem.appendChild(todoDate);
    todoItem.appendChild(deleteBtn);

    display.appendChild(todoItem);
  })
}

window.onload = renderTask;

document.addEventListener('keydown', function(event){
  if(event.key === 'Enter'){
    addBtn.click();
  }
})
