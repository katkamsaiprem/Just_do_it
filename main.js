const taskform = document.querySelector(".taskform")
const taskInput = document.querySelector(".taskInput")
const addTaskBtn = document.querySelector(".taskBtn")
const tasksContainer = document.querySelector(".tasksContainer")


let TODOS = [];

document.addEventListener("DOMContentLoaded", () => {//executes when browser renders the html, this event will trigger after js runs
    const areTodosLoaded = loadTodos()
    areTodosLoaded && renderTodos(TODOS)//shorthand code for if condition
})

function loadTodos() {//gets the string array from local storage ,then converts into orignal data form , if array contains data then create copy of it then push to TODOS
    console.log(TODOS);
    const stringifiedTodos = localStorage.getItem("todos");
    const todosArray = JSON.parse(stringifiedTodos)
    if (todosArray && todosArray.length) {
        TODOS = todosArray;//using spread operator, we are creating copy of todosArray
        console.log(TODOS)
        return true
    }
    return false
}

const saveTodosInLocalStorage = (todos) => {
    const stringifiedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", stringifiedTodos);
    return;




}
const renderTodos = (todos) => {
    for (let index = 0; index < todos.length; index++) {
        createAndPushPtag(todos[index])
    }
}



const newTaskFunction = () => {
    //trim removes whitespace between start and end

    if (!taskInput.value.trim()) {
        alert("enter something")
        return;
        //js comes out of function
    }

    const newTask = {
        taskId: Math.random(),
        taskText: taskInput.value.trim(),
        isTaskDone: true,
        timeStamp: new Date(),
    }
    console.log(newTask);
    createAndPushPtag(newTask);
    TODOS.push(newTask)
    console.log(TODOS);

}
const handleTaskDelete = (taskIdToDelete) => {
    TODOS = TODOS.filter((task) => task.taskId != taskIdToDelete)
    localStorage.setItem("todos", JSON.stringify(TODOS));
    const listITemToBeRemoved = document.getElementById(taskIdToDelete);
    listITemToBeRemoved.remove();
}
const handleTaskDone = (taskIdToUpdateIsTaskDone) => {
    for (let index = 0; index < TODOS.length; index++) {
        if (TODOS[index].taskId == taskIdToUpdateIsTaskDone) {
            TODOS[index].isTaskDone = !TODOS[index].isTaskDone;
        }
        localStorage.setItem("todos", JSON.stringify(TODOS));
    }

}
const handleTaskEdit = () => {

}
taskform.addEventListener("submit", (e) => {
    e.preventDefault();

    newTaskFunction();

    saveTodosInLocalStorage(TODOS)

    taskInput.value = "";
    taskInput.focus();

})
const createAndPushPtag = (task) => {
    console.log(task);


    const newListItem = document.createElement("li");
    newListItem.setAttribute("class", "taskItem");
    newListItem.setAttribute("id", task.taskId)

    const checkBoxInput = document.createElement("input");
    checkBoxInput.setAttribute("type", "checkbox");
    checkBoxInput.addEventListener("change", () => handleTaskDone(task.taskId))

    console.log(`before checked ${checkBoxInput.checked}`);

    checkBoxInput.checked = task.isTaskDone;
    console.log(`after checked ${checkBoxInput.checked}`);



    const taskContentContainer = document.createElement("div");

    const taskTextPTag = document.createElement("p");
    taskTextPTag.setAttribute("class", "task")
    taskTextPTag.textContent = task.taskText;

    const timeStampPTag = document.createElement("p");
    timeStampPTag.textContent = task.timeStamp;

    taskContentContainer.appendChild(taskTextPTag);
    taskContentContainer.appendChild(timeStampPTag);

    const taskActionButtonContainer = document.createElement("div")

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => handleTaskEdit(task.taskId))

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.addEventListener("click", () => handleTaskDelete(task.taskId))

    taskActionButtonContainer.appendChild(editButton);
    taskActionButtonContainer.appendChild(deleteButton)

    newListItem.appendChild(taskContentContainer);
    newListItem.appendChild(taskActionButtonContainer);
    newListItem.appendChild(checkBoxInput)

    tasksContainer.appendChild(newListItem)





}

/* 13/12/25
--store todo data inside obj without empty string✔️

-- newListItem -class name taskItem✔️
-- checkBoxInput -type checkbox , checked should be value of obj prop✔️

-- taskContentContainer ✔️
-- taskTextPTag -class name task, textContent = obj prop✔️
-- timeStampPTag -textContent=obj prop✔️

--make two elements as child of taskContentContainer✔️

--taskActionButtonContainer✔️
--editButton -textContent = edit✔️
--deleteButton -AeL click and callback✔️

--same for deleteButton✔️

-append these two as child of taskActionButtonContainer✔️


make taskActionButtonContainer ,taskContentContainer and checkBoxinput as child of newLIstItem✔️

newListItem as child of tasksContainer✔️
*/