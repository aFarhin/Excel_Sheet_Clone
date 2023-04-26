const thead = document.getElementById("table-heading-row");
const tbody = document.getElementById("table-body");
const columns = 26;
const rows = 100;
let currCell;
let cutValue = {};
const boldBtn = document.getElementById("bold-btn");
const italicsBtn = document.getElementById("italics-btn");
const underlineBtn = document.getElementById("underline-btn");

const textColor = document.getElementById("text-color");
const bgColor = document.getElementById("bg-color");

const leftAlign = document.getElementById("left-align");
const rightAlign = document.getElementById("right-align");
const centerAlign = document.getElementById("center-align");

const fontSize = document.getElementById("font-size");
const fontFamily = document.getElementById("font-family");

const cutBtn = document.getElementById("cut-btn");
const copyBtn = document.getElementById("copy-btn");
const pasteBtn = document.getElementById("paste-btn");

let matrix = new Array(rows);
let numSheets = 1;
let arrMatrix = [matrix];
let currSheetNum = 1;

for (let i = 0; i < rows; i++) {
  matrix[i] = new Array(columns);
  for (let j = 0; j < columns; j++) {
    matrix[i][j] = {};
  }
}

console.log("Matrix", matrix);


for (let column = 0; column < columns; column++) {
  let th = document.createElement("th");
  th.innerText = String.fromCharCode(65 + column);
  thead.appendChild(th);

}

for (let row = 0; row < rows; row++) {
  let tr = document.createElement("tr");
  let th = document.createElement("th");
  th.innerText = row + 1;
  tr.appendChild(th);



  for (let col = 0; col < columns; col++) {
    let td = document.createElement("td");
    td.setAttribute("contenteditable", "true");
    td.setAttribute("spellcheck", "false");
    td.setAttribute("id", `${String.fromCharCode(65 + col)}${row + 1}`);
    td.addEventListener("focus", (event) => onFocusFnc(event));
    td.addEventListener("input", (event) => onInputFnc(event));
    tr.appendChild(td);
  }
  tbody.appendChild(tr);
}
function onInputFnc(event) {
  updateJson(event.target);
}


function onFocusFnc(event) {
  console.log("In focus:", event.target);
  currCell = event.target;
  document.getElementById("current-cell").innerText = event.target.id;
  console.log(currCell.style.cssText);
  console.log(currCell.innerText);
  console.log(currCell.id);
}

boldBtn.addEventListener("click", () => {
  if (currCell.style.fontWeight == "bold") {
    currCell.style.fontWeight = "normal";
  } else {
    currCell.style.fontWeight = "bold";
  }
  console.log("bold", currCell);
});

italicsBtn.addEventListener("click", () => {
  if (currCell.style.fontStyle == "italic") {
    currCell.style.fontStyle = "normal";
  } else {
    currCell.style.fontStyle = "italic";
  }
  console.log("italics", currCell);
  updateJson(currCell);
});

underlineBtn.addEventListener("click", () => {
  if (currCell.style.textDecoration == "underline") {
    currCell.style.textDecoration = null;
  } else {
    currCell.style.textDecoration = "underline";
  }
  console.log("underline", currCell);
  updateJson(currCell);
});

bgColor.addEventListener("input", () => {

  console.log("bgColor value:", bgColor.value);
  console.log("currCell:", currCell);
  currCell.style.backgroundColor = bgColor.value;
  updateJson(currCell);
});

textColor.addEventListener("input", () => {
  currCell.style.color = textColor.value;
  updateJson(currCell);
});

leftAlign.addEventListener("click", () => {
  currCell.style.textAlign = "left";
  updateJson(currCell);
});

rightAlign.addEventListener("click", () => {
  currCell.style.textAlign = "right";
  updateJson(currCell);
});
centerAlign.addEventListener("click", () => {
  currCell.style.textAlign = "center";
  updateJson(currCell);
});

fontSize.addEventListener("change", () => {
  currCell.style.fontSize = fontSize.value;
  updateJson(currCell);
});

fontFamily.addEventListener("change", () => {
  currCell.style.fontFamily = fontFamily.value;
  updateJson(currCell);
});

cutBtn.addEventListener("click", () => {
  cutValue = {
    style: currCell.style.cssText,
    text: currCell.innerText,
  };
  updateJson(currCell);
  currCell.style = null;
  currCell.innerText = null;
});

copyBtn.addEventListener("click", () => {
  cutValue = {
    style: currCell.style.cssText,
    text: currCell.innerText,
  };
  updateJson(currCell);
});

pasteBtn.addEventListener("click", () => {
  currCell.style.cssText = cutValue.style;
  currCell.innerText = cutValue.text;
  updateJson(currCell);
});


var select = document.getElementById("font-size");
for (var i = 1; i <= 45; i++) {
  var option = document.createElement("option");
  option.value = i + "px";
  option.text = i;
  select.appendChild(option);
}


////// SAVE  DATA IN JSON //////

function updateJson(cell) {
  var json = {
    style: cell.style.cssText,
    text: cell.innerText,
    id: cell.id,
  };

  // update this json in  matrix
  var id = cell.id.split(""); //A1,A2,A3,A4

  var i = id[1] - 1;
  var j = id[0].charCodeAt(0) - 65;

  matrix[i][j] = json;
  const matrix2 = matrix;
}


function downloadJson() {
  // Define your JSON data

  // Convert JSON data to a string
  const jsonString = JSON.stringify(matrix);

  // Create a Blob with the JSON data and set its MIME type to application/json
  const blob = new Blob([jsonString], { type: "application/json" });

  // Create an anchor element and set its href attribute to the Blob URL
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.json"; // Set the desired file name

  // Append the link to the document, click it to start the download, and remove it afterward
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.getElementById("jsonFile").addEventListener("change", readJsonFile);

function readJsonFile(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileContent = e.target.result;

      // {id,style,text}
      // Parse the JSON file content and process the data
      try {
        const jsonData = JSON.parse(fileContent);
        console.log("matrix2", jsonData);
        matrix = jsonData;
        jsonData.forEach((row) => {
          row.forEach((cell) => {
            if (cell.id) {
              var myCell = document.getElementById(cell.id);
              myCell.innerText = cell.text;
              myCell.style.cssText = cell.style;
            }
          });
        });
        // Process the JSON data as needed
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };

    reader.readAsText(file);
  }
}


document.getElementById("add-sheet-btn").addEventListener("click", () => {
  alert("Adding a new sheet...");

  if (numSheets == 1) {
    var myArr = [matrix];
    localStorage.setItem("ArrMatrix", JSON.stringify(myArr));
  } else {
    var localStorageArr = JSON.parse(localStorage.getItem("ArrMatrix"));
    var myArr = [...localStorageArr, matrix];
    localStorage.setItem("ArrMatrix", JSON.stringify(myArr));
  }

  numSheets++;
  currSheetNum = numSheets;
  // Emptying our matrix
  for (let i = 0; i < rows; i++) {
    matrix[i] = new Array(columns);
    for (let j = 0; j < columns; j++) {
      matrix[i][j] = {};
    }
  }

  // Emptying body and creating table again
  tbody.innerHTML = ``;
  for (let row = 0; row < rows; row++) {
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.innerText = row + 1;
    tr.appendChild(th);

    for (let col = 0; col < columns; col++) {
      let td = document.createElement("td");
      td.setAttribute("contenteditable", "true");
      td.setAttribute("spellcheck", "false");
      td.setAttribute("id", `${String.fromCharCode(65 + col)}${row + 1}`);
      td.addEventListener("focus", (event) => onFocusFnc(event));
      td.addEventListener("input", (event) => onInputFnc(event));
      tr.appendChild(td);
    }
    //append the row into the bodyw
    tbody.appendChild(tr);
  }
  document.getElementById("sheet-num").innerText = "Sheet" + currSheetNum;
});

document.getElementById("sheet-1").addEventListener("click", () => {
  var myArr = JSON.parse(localStorage.getItem("ArrMatrix"));
  let tableData = myArr[0];
  matrix = tableData;
  tableData.forEach((row) => {
    row.forEach((cell) => {
      if (cell.id) {
        var myCell = document.getElementById(cell.id);
        myCell.innerText = cell.text;
        myCell.style.cssText = cell.style;
      }
    });
  });
});

document.getElementById("sheet-2").addEventListener("click", () => {
  var myArr = JSON.parse(localStorage.getItem("ArrMatrix"));
  let tableData = myArr[1];
  matrix = tableData;
  tableData.forEach((row) => {
    row.forEach((cell) => {
      if (cell.id) {
        var myCell = document.getElementById(cell.id);
        myCell.innerText = cell.text;
        myCell.style.cssText = cell.style;
      }
    });
  });
});
