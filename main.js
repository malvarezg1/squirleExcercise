let url =
  "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json ";
let data_json;

function recoverData(url, callback) {
  fetch(url)
    .then((response) => response.json())
    .then((json) => callback(json));
}

// Funcion para encoentrar valores distintos
const distinct = (value, index, self) => {
  return self.indexOf(value) === index;
};

// Funcion que renedeiza la pantalla completa
function renderScreen() {
  eventsTable(data_json);
  let events, correlation__values;
  [events, correlation__values] = processData(data_json);
  correaltionTable(events, correlation__values);
}

// Funcion que procesa los datos
function processData(data_json) {
  let listOfEvents = Array();
  data_json.forEach((element) => {
    listOfEvents = listOfEvents.concat(element.events);
  });

  const distintos = listOfEvents.filter(distinct);
  //Caluclo de las matrices confusion
  let MCCs = Array();
  distintos.forEach((dist) => {
    console.log(dist);
    let TP = 0;
    let TN = 0;
    let FP = 0;
    let FN = 0;
    data_json.forEach((element) => {
      let is_included = element.events.includes(dist);
      if (is_included == true && element.squirrel == true) {
        TP++;
      } else if (is_included == false && element.squirrel == true) {
        FN++;
      } else if (is_included == false && element.squirrel == false) {
        TN++; 
      } else if (is_included == true && element.squirrel == false) {
        FP++;
      }
    });
    let MCC = ((TP * TN - FP * FN)/Math.sqrt((TP + FP) * (TP + FN) * (TN + FP) * (TN * FN)));
    MCCs = MCCs.concat(MCC);
    console.log("event", dist, "TP", TP, "TN",TN,"FP",FP,"FN",FN,"MCC",MCC)
  });
  return [distintos, MCCs];
}

// Funcion que renderiza la tabla de correlaciones
function correaltionTable(events, correlation__values) {
  let id = 0;
  events.forEach((event) => {
    tableBody = document.getElementById("CuerpoTablaCorrelacion");

    let row_element = document.createElement("tr");
    let id_element = document.createElement("th");
    let column1_element = document.createElement("td");
    let column2_element = document.createElement("td");
    let id_node = document.createTextNode(id + 1);
    let column1_node = document.createTextNode(event);
    let column2_node = document.createTextNode(correlation__values[id]);
    id_element.appendChild(id_node);
    column1_element.appendChild(column1_node);
    column2_element.appendChild(column2_node);
    row_element.append(id_element);
    row_element.append(column1_element);
    row_element.append(column2_element);
    tableBody.appendChild(row_element);
    id++;
  });
}

// Funcion que renderiza la tabla de eventos
function eventsTable(data_json) {
  // Creacion de table
  tableBody = document.getElementById("CuerpoTablaDatos");
  let id = 0;
  data_json.forEach((element) => {
    id++;
    let row_element = document.createElement("tr");
    let id_element = document.createElement("th");
    let column1_element = document.createElement("td");
    let column2_element = document.createElement("td");
    let id_node = document.createTextNode(id);
    let column1_node = document.createTextNode(element.events);
    let column2_node = document.createTextNode(element.squirrel);
    id_element.appendChild(id_node);
    column1_element.appendChild(column1_node);
    column2_element.appendChild(column2_node);
    row_element.append(id_element);
    row_element.append(column1_element);
    row_element.append(column2_element);
    tableBody.appendChild(row_element);

    if (element.squirrel == true) {
      row_element.style.backgroundColor = "#ffcccc";
    }
  });
}

recoverData(url, (data) => {
  data_json = data;
  renderScreen();
});
