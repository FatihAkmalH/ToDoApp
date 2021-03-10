// get all required elements
const inputBox = document.querySelector(".input-field input"),
add_button = document.querySelector(".input-field button"),
Todo_List = document.querySelector(".list"),
delete_all = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
    let userData = inputBox.value; //get user entered list
    if(userData.trim() != 0){ // if user value not only space
        add_button.classList.add("active");
    } else{
        add_button.classList.remove("active");
    }
}

show_task();

//if user click add btn
add_button.onclick = ()=>{
    let userData = inputBox.value; //get user entered list
    let get_Local_Storage = localStorage.getItem("New List"); //getting local storage
    if(get_Local_Storage == null){
        list_array = [];//create blank array
    } else{
        list_array = JSON.parse(get_Local_Storage); //transform json string into js object 
    }
    list_array.push(userData); //pushing or adding user data
    localStorage.setItem("New List", JSON.stringify(list_array)); //transform js object into json string
    show_task();
    add_button.classList.remove("active");
}

// function to add task list inside ul
function show_task(){
    let get_Local_Storage = localStorage.getItem("New List"); //getting local storage
    if(get_Local_Storage == null){
        list_array = [];//create blank array
    } else{
        list_array = JSON.parse(get_Local_Storage); //transform json string into js object 
    }
    const pending = document.querySelector(".pending-task");
    pending.textContent = list_array.length; //passing the length value in pending
    if(list_array.length > 0){ //if array list > 0
        delete_all.classList.add("active");
    } else{
        delete_all.classList.remove("active");
    }
    let newListTag = "";
    list_array.forEach((element, index) => {
        newListTag += `<li>${element} <span onclick="deleteTask(${index});"><i class="bx bx-trash"></i></span></li>`;
    });
    Todo_List.innerHTML = newListTag; //adding new li inside ul tag
    inputBox.value = "";

}

//delete task funstion
function deleteTask(index){
    let get_Local_Storage = localStorage.getItem("New List"); //getting local storage
    list_array = JSON.parse(get_Local_Storage); 
    list_array.splice(index, 1); //delete or remove the particular index li
    
    //after remove li update the local storage again
    localStorage.setItem("New List", JSON.stringify(list_array)); //transform js object into json string
    show_task();
}

//delete all function
delete_all.onclick = ()=>{
    list_array = []; //empty the array
    //after remove all update the local storage again
    localStorage.setItem("New List", JSON.stringify(list_array)); //transform js object into json string
    show_task();
}

