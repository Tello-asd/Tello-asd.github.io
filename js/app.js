if ('serviceWorker' in navigator){
  navigator.serviceWorker.register('./sw.js').then(function(registration){
    console.log('service worker registration succeeded:',registration);
  },
function(error){
  console.log('service worker registration failed:',error);
});
}
else{
  console.log('service workers are not supported.');
}

$(function(){
    $("#button-wrapper button").click(function(){

        $("#button-wrapper").html('<input type="text" id="input" placeholder="Añadir Tarea..">');

    });
});


// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});



// add to do
function addToDo(toDo, id, done, trash){

    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `<li class="item">
    <p class="text ${LINE}" contenteditable = true>${toDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    <i class="fa fa-window-close we" id="Cancel" onClick="window.location = 'index.html'"></i>
    </li>
    `;

    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

// add an item to the list
document.getElementById("buttonSave").addEventListener("click",function(even){

    const toDo = input.value;

    // if the input isn't empty
    if(toDo){
        addToDo(toDo, id, false, false);

        LIST.push({
            name : toDo,
            id : id,
            done : false,
            trash : false
        });

        // add item to localstorage
        localStorage.setItem("TODO", JSON.stringify(LIST));

        id++;
    }
    input.value = "";

});


// complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function(event){
    const element = event.target; // return the clicked element inside list
    const elementJob = element.attributes.job.value; // complete or delete

    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }

    // add item to localstorage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
