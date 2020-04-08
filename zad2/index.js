// for(let i = 1; i<= 90;i++){
//     let option = document.createElement("option");
//     option.setAttribute("value",`${((10+i)/10)}`);
//     option.innerHTML = ((10+i)/10).toFixed(1);
//     document.getElementById("selection").appendChild(option);
// }

var loadMoreBtn = document.getElementById("loadMoreBtn");
loadMoreBtn.addEventListener("click", getGames);

var search = document.getElementById("search");
search.addEventListener("click", filterHandler);

var filter = document.getElementById("filter");
// filter.addEventListener("keyup" , filterHandler)


var numOfGames = 1;
var altBr = 4;

function done(){
    fetch('games.json')
        .then((res) => res.json())
        .then((data) => {
    
            for(let i = 0; i < data.length; i++) {
                var game = data[i];
                document.getElementById('output').innerHTML += `
                <tr>
                    <td>${numOfGames++}.</td>
                    <td class="img"><img src="${game["slika"]}" alt="something"><p>${game["naziv"]}</p></td>
                    <td>${game["datum"]}</td>
                    <td>${game["izdavac"]}</td>
                    <td>${[...game["zanr"]]}</td>
                    <td>${game["ocjena"]}</td>
                    <td><button class="delete">X</button></td>
                </tr>`;
    
                for(let i = 0; i < document.getElementsByClassName("delete").length; i++) {
                    document.getElementsByClassName("delete")[i].addEventListener("click" , removeFromList);
                }
            
            }
            var items = document.querySelectorAll("tr");
            for(let i = 4; i <= data.length; i++){
                items[i].style.visibility = "hidden";
                items[i].style.position = "absolute";
                items[i].style.bottom = "0";
                items[i].style.right = "0";
                items[i].style.width = "0";;
                
            }            
        })
}
done();
// function getGames() {
//     fetch('games.json')
//         .then((res) => res.json())
//         .then((data) => {
//             for(let i = 0; i < 3; i++) {
//                 if(!data[numOfGames-1]){
//                     document.body.removeChild(document.getElementById("button"));
//                     break;
//                 }
//                 var game = data[numOfGames-1];
//                 document.getElementById('output').innerHTML += `
//                 <tr>
//                     <td>${numOfGames++}.</td>
//                     <td class="img"><img src="${game["slika"]}" alt="something"><p>${game["naziv"]}</p></td>
//                     <td>${game["datum"]}</td>
//                     <td>${game["izdavac"]}</td>
//                     <td>${[...game["zanr"]]}</td>
//                     <td>${game["ocjena"]}</td>
//                     <td><button class="delete">X</button></td>
//                 </tr>`;
//                 if(numOfGames === data.length+1){
//                     document.body.removeChild(document.getElementById("button"));
//                     break;
//                 }
//             }
//             for(let i = 0; i < document.getElementsByClassName("delete").length; i++) {
//                 document.getElementsByClassName("delete")[i].addEventListener("click" , removeFromList);
//             }
        
//     })
// }


function getGames(){
    if(filter.value == ""){
        var temp = altBr+3;
        var items = document.querySelectorAll("tr");
        if(altBr === items.length){
            document.body.removeChild(document.getElementById("button"));
            return;
        }
        for(altBr; altBr < temp;altBr++){
            items[altBr].style.removeProperty("position");
            items[altBr].style.removeProperty("bottom");
            items[altBr].style.removeProperty("right");
            items[altBr].style.removeProperty("visibility");
            items[altBr].style.removeProperty("width");
        }
    }
}

function removeFromList(e){

    if (e.currentTarget.classList.contains("delete")) {
        if (confirm("Are you sure?")) {
          var tr = e.target.parentElement.parentElement;
          e.target.parentElement.parentElement.parentElement.removeChild(tr);
        }
      }
}


function filterHandler(){

    var text = filter.value.toLowerCase();

    var items = document.querySelectorAll("tr");
    items = Array.from(items);
    items.shift(); /// in items -> all visible data
    if(text == ""){
        refresh();
    }
    for(let i = 0; i< 9;i++){
        if(document.getElementById("selection").children[i].selected){
            var rate = parseInt(document.getElementById("selection").children[i].value);
            if(document.getElementById("ime").checked){
                items.forEach((item) => {
                    if(rate <= Number(item.children[5].innerHTML)){
                        var itemName = item.children[1].children[1].innerHTML;
                        
                        if (itemName.toLowerCase().indexOf(text) != -1) {
                            item.style.removeProperty("position");
                            item.style.removeProperty("bottom");
                            item.style.removeProperty("right");
                            item.style.removeProperty("visibility");
                            item.style.removeProperty("width");
                        
                        } else {
                            item.style.visibility = "hidden";
                            item.style.position = "absolute";
                            item.style.bottom = "0";
                            item.style.right = "0";
                            item.style.width = "0";
                        }
                    }else{
                        item.style.visibility = "hidden";
                        item.style.position = "absolute";
                        item.style.bottom = "0";
                        item.style.right = "0";
                        item.style.width = "0";
                    }
                })
            }else if(document.getElementById("zanr").checked){
                items.forEach((item) => {
                    if(rate <= Number(item.children[5].innerHTML)){
                        var itemCategory = item.children[4].innerHTML.split(",");
                        itemCategory = itemCategory.map( category => {return category.toLowerCase()})
                        console.log(itemCategory)
                        if (itemCategory.indexOf(text) != -1) {
                            item.style.removeProperty("position");
                            item.style.removeProperty("bottom");
                            item.style.removeProperty("right");
                            item.style.removeProperty("visibility");
                            item.style.removeProperty("width");
                        
                        } else {
                            item.style.visibility = "hidden";
                            item.style.position = "absolute";
                            item.style.bottom = "0";
                            item.style.right = "0";
                            item.style.width = "0";
                        }
                    }else{
                        item.style.visibility = "hidden";
                        item.style.position = "absolute";
                        item.style.bottom = "0";
                        item.style.right = "0";
                        item.style.width = "0";
                    }
                })
                
        }else continue;
    
    }
}

}

function refresh(){
    numOfGames = 1;
    altBr = 4;
      document.getElementById("output").innerHTML = 
    `<tr>
        <th>Broj</th>
        <th>Slika</th>
        <th>Datum izlaska</th>
        <th>Izdavač</th>
        <th>Žanr</th>
        <th>Ocjena</th>
        <th></th>
    </tr>`
    console.log(document.getElementById("button") == 0)
    if(document.getElementById("button") == null){
        var div = document.createElement("div");
        div.id = "button";
        var btn = document.createElement("button");
        btn.className = "loadMoreBtn";
        btn.id = "loadMoreBtn";
        btn.innerHTML = "Load more";
        div.appendChild(btn);
        document.body.appendChild(div);
    }
    document.getElementById("loadMoreBtn").addEventListener("click", getGames);
    search.addEventListener("click", filterHandler);
    done();
    return;
}