var form = document.getElementById("addForm");
form.addEventListener("submit",addItem);

var income = [];
var expenses = [];
// function addItemsFromStorage(){
//     var storage = [];
//     for(var i = 1; i <= localStorage.length;i++){
//         storage.push(JSON.parse(localStorage.getItem(`item${i}`)))
//     }

    
//     if(!(storage.length == 0)){
//         for(item of storage){
                    
//             if(localStorage.length === document.getElementsByClassName("list-group-item").length){
//                 break;
//             }
//             var li = document.createElement("li");
//             li.className = "list-group-item";
//             li.appendChild(document.createTextNode(item["title"]+" "));
            
            
         
//             var span = document.createElement("span");
//             if(item["sign"] == "minus"){
//                 span.innerHTML = "- " + String(item["value"]) + " ";
//             }else if(item["sign"] == "plus"){
//                 span.innerHTML = "+ " + String(item["value"]) + " ";
//             }
//             li.appendChild(span);
//             console.log(span)
            
            
//             if(item["sign"] === "minus"){
//                 document.getElementById("expenses").appendChild(li);
//                 var spanPer = document.createElement("span");
//                 spanPer.appendChild(document.createTextNode(`${item["percentage"]}`));

//                 span.appendChild(spanPer);
//                 expenses.push(Number(item["value"]));
//             }else if(item["sign"] === "plus"){
//                 document.getElementById("income").appendChild(li);
//                 income.push(Number(item["value"]));
//             }
            
//             var deleteBtn = document.createElement("button");
//             deleteBtn.className = "btn btn-danger btn-sm float-right delete deleteBtn";
//             deleteBtn.appendChild(document.createTextNode("X"));
//             span.appendChild(deleteBtn);

//             update();
//         }
//     }
// }
// addItemsFromStorage();
if(JSON.parse(localStorage.getItem("data")) !== null){
    var storage = JSON.parse(localStorage.getItem("data"));
    var numberOfObjectInStorage = storage.length;
    addItems(storage);
}

function addItems(storage){
    
    if(storage !== null){
        for(item of storage){
            if(numberOfObjectInStorage == document.getElementsByClassName("list-group-item").length){
                break;
            }
            var sign = item["sign"];
            var description = item["title"];
            var value = item["value"].toFixed(2);

            // New element in ul
            var li = document.createElement("li");
            li.className = "list-group-item";
            li.appendChild(document.createTextNode(description+" "));
            
            var span = document.createElement("span");
            if(sign === "minus"){
                span.innerHTML = "-" + value + " ";
                var spanPer = document.createElement("span");
                var percentage = item["percentage"];
                spanPer.innerHTML = percentage;
            }else if(sign === "plus"){
                span.innerHTML = "+" + value + " ";
            }
            li.appendChild(span);
            

            if(sign === "minus"){
                document.getElementById("expenses").appendChild(li);
                span.appendChild(spanPer);
                expenses.push(Number(value));
            }else if(sign === "plus"){
                document.getElementById("income").appendChild(li);
                income.push(Number(value));
            }

            // add deleteBtn
            var deleteBtn = document.createElement("button");
            deleteBtn.className = "btn btn-danger btn-sm float-right delete deleteBtn";
            deleteBtn.appendChild(document.createTextNode("X"));
            span.appendChild(deleteBtn);
            
            
            update();
        }
    }
}




function getMonthToday(month){
    switch(month){
        case 0: return "January";
        case 1: return "February";
        case 2: return "March";
        case 3: return "April";
        case 4: return "May";
        case 5: return "June"; 
        case 6: return "July";
        case 7: return "August";
        case 8: return "September";
        case 9: return "October";
        case 10: return "November";
        case 11: return "December";
    }
}

var d = new Date();
d = d.getMonth();
document.querySelector(".content > h1").innerHTML += String(getMonthToday(d));



function addItem(e){
    e.preventDefault();

    // Values
    var sign = document.getElementById("sign").value;
    var description = document.getElementById("description").value;
    var value = Number(document.getElementById("value").value).toFixed(2);

    // Percentage
    var sum = income.reduce((sum, element) => sum+element ,0)
    var percentage = parseInt((Number(document.getElementById("value").value/sum))*100) + "%"
    var spanPer = document.createElement("span");
    spanPer.innerHTML = percentage;

    // New element in ul
    var li = document.createElement("li");
    li.className = "list-group-item";
    li.appendChild(document.createTextNode(description+" "));
    
    var span = document.createElement("span");
    if(sign === "minus"){
        span.innerHTML = "-" + value + " ";
    }else if(sign === "plus"){
        span.innerHTML = "+" + value + " ";

    }
    li.appendChild(span);
    
    if(sign === "minus"){
        document.getElementById("expenses").appendChild(li);
        span.appendChild(spanPer);
        expenses.push(Number(value));
    }else if(sign === "plus"){
        document.getElementById("income").appendChild(li);
        income.push(Number(value));
    }

    // add deleteBtn
    var deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger btn-sm float-right delete deleteBtn";
    deleteBtn.appendChild(document.createTextNode("X"));
    span.appendChild(deleteBtn);
    
   
    update();
    
}

function update(){
    var sumIncome = income.reduce((sum, element) => sum+element ,0);
    var sumExpenses = expenses.reduce((sum, element) => sum+element,0);
    

    document.getElementById("amountPlus").innerHTML = "+ " + sumIncome.toFixed(2);
    document.getElementById("amountMinus").innerHTML = "- " + sumExpenses.toFixed(2);

    if(sumIncome-sumExpenses >= 0){
        document.getElementById("budget").innerHTML = "+" +  (sumIncome-sumExpenses).toFixed(2);
    }else{
        document.getElementById("budget").innerHTML =  (sumIncome-sumExpenses).toFixed(2);
    }

    var sumOfPercentages = 0;
    var percentages = document.querySelectorAll("span > span");
    for(percentage of percentages){
        percentage.innerHTML = Math.abs(parseInt((parseInt(percentage.parentElement.innerHTML) / sumIncome) * 100)) + "%";
        sumOfPercentages += Math.abs(parseInt((parseInt(percentage.parentElement.innerHTML) / sumIncome) * 100))
    }

    document.getElementById("amountMinus").innerHTML += " " + sumOfPercentages + "%";
    
}

var itemList1 = document.getElementById("income");
var itemList2 = document.getElementById("expenses");
itemList1.addEventListener("click", removeItem);
itemList2.addEventListener("click", removeItem);

function removeItem(e) {
    if (e.target.classList.contains("delete")) {
        if(e.target.parentElement.parentElement.parentElement.id === "income"){
            if (confirm("Are you sure?")) {
                var li = e.target.parentElement.parentElement;
                itemList1.removeChild(li);

                var value = String(e.target.parentElement.parentElement.innerHTML.split(" ")[1]);
                value = value.substring(6).split(" ")[0];
                value = Math.abs(Number(value));

                const index = income.indexOf(value);
                console.log(index)
                if (index > -1) {
                    income.splice(index, 1);
                }
                update();
            }
        }else if(e.target.parentElement.parentElement.parentElement.id === "expenses"){
            if (confirm("Are you sure?")) {
                var li = e.target.parentElement.parentElement;
                itemList2.removeChild(li);

                var value = String(e.target.parentElement.parentElement.innerHTML.split(" ")[1]);
                value = value.substring(6).split(" ")[0];
                value = Math.abs(Number(value));

                const index = expenses.indexOf(value);
                console.log(index)
                if (index > -1) {
                    expenses.splice(index, 1);
                }
                update();
            }
        }
    }
    console.log(expenses, income);
}


var save = document.getElementById("save");
save.addEventListener("click", saveHandler);


function saveHandler(){
    var arr = [];
    for(item of document.getElementsByClassName("list-group-item")){
        
        console.log(item.children[0])
        
        var object = {};
        var title = item.innerHTML.split(" ")[0];

        var value = String(item.innerHTML.split(" ")[1]);
        value = value.substring(6).split(" ")[0];
        value = Math.abs(Number(value));

        var sign;
        if(item.parentElement.id === "income"){
            sign = "plus";
        }else if(item.parentElement.id === "expenses"){
            sign = "minus";
            var percentage = item.children[0].children[0].innerHTML;
            object.percentage = percentage;
        }
        
        object.title = title;
        object.value = value;
        object.sign = sign;
        
        arr.push(object);
    }
    
    localStorage.setItem("data",JSON.stringify(arr));
}

