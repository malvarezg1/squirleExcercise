let url = "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json " 
let data_json;

function recoverData(url, callback){
    fetch(url)
    .then(response => response.json())
    .then(json => callback(json));
}


// Funcion que renedeiza la pantalla completa
function renderScreen(){
    console.log(data_json)
    eventsTable(data_json)
    correaltionTable()
}

// Funcion que renderiza la tabla de correlaciones
function correaltionTable{
    
}


// Funcion que renderiza la tabla de eventos
function eventsTable(data_json){
     // Creacion de table
     tableBody = document.getElementById("CuerpoTablaDatos");
     let id = 0; 
     data_json.forEach((element, id) => {
         id++;
         console.log(element)
         let row_element = document.createElement("tr");
         let id_element = document.createElement("th");
         let column1_element = document.createElement("td");
         let column2_element = document.createElement("td");
         let id_node = document.createTextNode(id) 
         let column1_node = document.createTextNode(element.events) 
         let column2_node = document.createTextNode(element.squirrel) 
         id_element.appendChild(id_node)
         column1_element.appendChild(column1_node)
         column2_element.appendChild(column2_node)
         row_element.append(id_element)
         row_element.append(column1_element)
         row_element.append(column2_element)
         tableBody.appendChild(row_element)
         
         if(element.squirrel== true){
             row_element.style.backgroundColor = "#ffcccc"
         }
     });
}

recoverData(url,  data =>{
     data_json =data
     renderScreen()
    ;});


