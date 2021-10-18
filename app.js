// select from the DOM
const feedback = document.querySelector(".feedback");
const inputItem = document.getElementById("item-input");
const submitBtn = document.querySelector(".submit-btn");
const itemList = document.querySelector(".item-list");

const clearBtn = document.querySelector(".clear-btn");
const form = document.querySelector("#todo-form")

let todoList = [];

const handleItem = (itemName) => {
    const items = itemList.querySelectorAll(".item")
    
    items.forEach(item => {
      if (item.querySelector(".item-name").textContent === itemName) {
          //complete event listener
          item.querySelector("#complete-item").addEventListener("click", function () {
              item.querySelector(".item-name").classList.toggle("completed");
              this.classList.toggle("visibility")
          })
          //edit event listener
          item.querySelector("#edit-item").addEventListener("click", function () {
              inputItem.value = itemName;
              itemList.removeChild(item)

              todoList = todoList.filter(function (item) {
                  return item !== itemName;
              })
          })
           //delete event listener
           item.querySelector("#delete-item").addEventListener("click", function () {
               

               removeElement(item)
              itemList.removeChild(item)
             todoList = todoList.filter(function (item) {
                  return item !== itemName;
              })
              
            feedback.innerHTML = "item deleted"
            feedback.classList.add("showItem")
            setTimeout(function () {
                feedback.classList.remove("showItem")
            }, 3000)
           })
      }
    });
    
}
// append the list
const getList = (todoList) => {
    itemList.innerHTML = "";
    todoList.forEach(function (item) {
        itemList.insertAdjacentHTML("beforeend", 
        `
        <div class="item">
        <h5 class="item-name">${item}</h5>
        <div class="item-icons">
            <a href="#" id="complete-item" class="item-icon"><i class="far fa-check-circle"></i></a>
            <a href="#" id="edit-item" class="item-icon"><i class="far fa-edit"></i></a>
            <a href="#" id="delete-item" class="item-icon"><i class="far fa-times-circle"></i></a>
        </div>
    </div>`)

    handleItem(item)
    })
}
const getLocalStorage = () => {
   const todoStorage = localStorage.getItem("todoList")
   if (todoStorage === "undefined" || todoStorage === null) {
       todoList = [];
   } else {
       todoList = JSON.parse(todoStorage)
       getList(todoList)
   }
}

const setLocalStorage = () => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}
// get local storage from page
getLocalStorage();

//add an item to the todoList, including to local storage
form.addEventListener("submit", function (e) {
   e.preventDefault();
   const itemName = inputItem.value;
   if (itemName.length === 0) {
       feedback.innerHTML = "Please Enter valid value";
       feedback.classList.add("showItem")
       setTimeout(function () {
           feedback.classList.remove("showItem")
       }, 3000)
   } else {
       todoList.push(itemName);
       setLocalStorage(todoList)
       getList(todoList);
       //add event listeners to icons;
        //handleItem(itemName);
   }

   inputItem.value = "";
})

//clear all items from the list
clearBtn.addEventListener("click", function () {
    todoList = [];
    localStorage.clear()
    getList(todoList)
    feedback.innerHTML = "empty list";
       feedback.classList.add("showItem")
       setTimeout(function () {
           feedback.classList.remove("showItem")
       }, 3000)
   
})

// remove element from todoList
function removeElement(item) {
    let newTodoList = [...todoList];
    newTodoList.splice(item, 1);
     localStorage.setItem("todoList", JSON.stringify(newTodoList))
}
console.log();

