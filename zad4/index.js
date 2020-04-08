var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
var filter = document.getElementById("filter");
// Form submit event
form.addEventListener("submit", addItem);
// Delete event
itemList.addEventListener("click", removeItem);
// Filter event
filter.addEventListener("keyup", filterItems);
// Add item
var checkboxes = document.getElementsByClassName("checkbox");

var storage = JSON.parse(localStorage.getItem("data"));

function addItems(storage){
    titlesOnScreen = [];
    for(item of document.getElementsByClassName("list-group-item")){
        var title = item.innerText.slice(0, item.innerText.length-3);
        titlesOnScreen.push(title);
    }
    if(storage !== null){
        for(item of storage){
            if(titlesOnScreen.includes(item.title)){
                continue;
            }
            var li = document.createElement("li");
            li.className = "list-group-item";
            li.appendChild(document.createTextNode(item.title+" "));
    
            var checkbox = document.createElement("input");
            checkbox.setAttribute("type","checkbox");

            if(item.done == true){
                checkbox.checked = true;
                li.classList.add("isChecked");
            }
            checkbox.classList.add("checkbox");
            checkbox.addEventListener("click", checkHandler);
            li.appendChild(checkbox);
    
            var deleteBtn = document.createElement("button");
            deleteBtn.className = "btn btn-danger btn-sm float-right delete";
            deleteBtn.appendChild(document.createTextNode("X"));
            li.appendChild(deleteBtn);
            itemList.appendChild(li);
        }
    }
}
addItems(storage);

for(checkbox of checkboxes){
    checkbox.addEventListener("click", checkHandler);
}
function checkHandler(e){
    if(e.target.checked === true){
        this.parentElement.classList.add("isChecked");
    }else{
        this.parentElement.classList.remove("isChecked");
    }
}


function addItem(e) {
  e.preventDefault();
  //Get input value
  var newItem = document.getElementById("item").value;
  // Create new li element
  var li = document.createElement("li");
  // Add class
  li.className = "list-group-item";
  // Add text node with input value
  li.appendChild(document.createTextNode(newItem+" "));
  
  var checkbox = document.createElement("input");
  checkbox.setAttribute("type","checkbox");
  checkbox.className = "checkbox";
  checkbox.addEventListener("click", checkHandler);
  li.appendChild(checkbox);
  // Create del button element

  var deleteBtn = document.createElement("button");
  // Add classes to del button
  deleteBtn.className = "btn btn-danger btn-sm float-right delete";
  // Append text node
  deleteBtn.appendChild(document.createTextNode("X"));
  // Append button to li
  li.appendChild(deleteBtn);
  // Append li to list
  itemList.appendChild(li);
}

// Remove item
function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure?")) {
      var li = e.target.parentElement;
      itemList.removeChild(li);
    }
  }
}

// Filter items
function filterItems(e) {
  // convert text to lowercase
  var text = e.target.value.toLowerCase();

  // Get list items
  var items = itemList.getElementsByTagName("li");

  // Convert HTMLCollection to an array
  Array.from(items).forEach(function(item) {
    var itemName = item.firstChild.textContent;
    if (itemName.toLowerCase().indexOf(text) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

var save = document.getElementById("save");
save.addEventListener("click", saveHandler);


function saveHandler(){
    var arr = [];
    for(item of document.getElementsByClassName("list-group-item")){
        var object = {};
        var title = item.innerText.slice(0, item.innerText.length-3);
        var done = item.children[0].checked;
        object.title = title;
        object.done = done;
        arr.push(object);
    }
    
    localStorage.setItem("data",JSON.stringify(arr));
    

    fetch("https://jsonblob.com/api/jsonBlob/3e6a5cd0-78f5-11ea-8599-75f4482d2e1a",{
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(arr)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
});
}
