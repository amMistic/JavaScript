// get the input bar and task container 
const input = document.getElementById('input-box');
const taskContainer = document.getElementById('tasks-container');

// define the addTask Event Listner
function addTask() {
    if (input.value === ''){
        alert(`You must've something in input box to add into To-Do List`);
    } else {
        // create new list element
        let li = document.createElement('li');
    
        // set the values of newly created element
        let strong = document.createElement('strong')
        strong.innerHTML = input.value;
        
        li.appendChild(strong);
        input.value = '';   // empty input box 

        // append into the container to display on the web page
        taskContainer.appendChild(li);

        // add the "cancle" span 
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';

        // append this span node into 'li' node as child node 
        li.appendChild(span);
    }
};


// Add the event listner
taskContainer.addEventListener( "click" ,function(e){
    if (e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove();
    }
}, false);