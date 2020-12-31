// Add your javascript here

var items = [ ]


function render(items){
    for(var i = 0; i < 5; i++){
        var ielem = document.getElementById(i + 1);
        if(i < items.length){
            ielem.innerText = items[i]
        }
        else if(ielem){
            ielem.innerText = ""
        }
    }
}

function handle(action){
    return function(){
        action();
        render(items);
    }
}

function push(){
    let inputElem = document.getElementById("inputElem");
    let value = inputElem.value;

    if(value == null || value == ""){
        alert("Please enter a value!");
        return;
    }

    if(items.length == 5) {
        alert("Stack was already full!");
        return;
    }

    items.push(value);
    inputElem.value = "";
}

function empty(){
    if(items.length > 0){
        alert("No, Stack is not empty");
        return;
    }
    else{
        alert("Yes, Stack is empty");
        return;
    }
}

function peek(){
    if(items.length == 0){
        alert("Operation not allowed!");
        return
    }
    alert("Top Value is: " + items[items.length - 1]);
}

let pushBtn = document.querySelector(".action.push-btn")
let emptyBtn = document.querySelector(".action.empty-btn")
let peekBtn = document.querySelector(".action.peek-btn")

pushBtn.addEventListener('click', handle(push))
emptyBtn.addEventListener('click', handle(empty))
peekBtn.addEventListener('click', handle(peek))



render(items);