
generateTasksFromStorage();

const addListTaskButton = document.getElementById("addListButtonTask");
addListTaskButton.onclick = (e) => {
    const whiteBox = document.querySelector("#whiteBox");
    let listStuff = document.createElement("li");
    const unorderedList = document.querySelector("#toDoList");
    let tickBox = document.createElement("input");
    let stuff = document.createElement("span");
    let eraseButton = document.createElement("button");
    tickBox.type = "checkbox";
    if(whiteBox.value != "") {
        eraseButton.classList.add("deleteObject");
        eraseButton.textContent = "x";
        eraseButton.style = "width:20px;height:20px;";
        eraseButton.addEventListener("click",function(event){
            let listItemElement = event.target.parentElement;
            listItemElement.parentElement.removeChild(listItemElement);
        });
        stuff.appendChild(document.createTextNode(whiteBox.value));
        stuff.classList.add("item");
        listStuff.appendChild(eraseButton);
        listStuff.appendChild(tickBox);
        listStuff.appendChild(stuff);
        unorderedList.appendChild(listStuff);
        addTask(whiteBox.value,false);
        whiteBox.value = null;
    }
}

const toDoList = document.querySelector("#toDoList");
toDoList.addEventListener("click", deleteStuff);

function deleteStuff(e) {
    let target = e.target;
    if(target.className.includes("deleteStuff")) {
        target.parentElement.remove();
    }
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(taskList) {
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function addTask(taskText, taskState) {
    let taskList = getTasks();
    taskList.push({
        text: taskText,
        state: taskState
    });
    saveTasks(taskList);
}

function removeTask(taskText) {
    let taskList = getTasks();
    let result = [];
    for(let i=0;i<taskList.length;i++) {
        if(taskList[i].text!==taskText) {
            result.push(taskList[i]);
        }
    }
    saveTasks(result);
}

function generateTasksFromStorage() {
    let taskList = getTasks();
    for(let i=0;i<taskList.length;i++) {
        createTaskItem(taskList[i].text, taskList[i].state);
    }
}

function createTaskItem(taskName, taskState) {
    const unorderedList = document.querySelector("#toDoList");
    const stuff = document.createElement("span");
    const listStuff = document.createElement("li");
    const eraseButton = document.createElement("button");
    const tickBox = document.createElement("input");
    tickBox.type = "checkbox";
    tickBox.checked = taskState;
    eraseButton.classList.add("deleteObject");
    eraseButton.textContent = "x";
    eraseButton.style = "width:20px;height:20px;";
    eraseButton.addEventListener("click",function(event){
        let listItemElement = event.target.parentElement;
        listItemElement.parentElement.removeChild(listItemElement);
    });
    stuff.appendChild(document.createTextNode(taskName));
    stuff.classList.add("item");
    listStuff.appendChild(eraseButton);
    listStuff.appendChild(tickBox);
    listStuff.appendChild(stuff);
    unorderedList.appendChild(listStuff);
}


