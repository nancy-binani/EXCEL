let allAlignmentOptions = document.querySelectorAll(".align-cell-content span");
let allColorOptions = document.querySelectorAll(".cell-color-options span");
let allbiuOptions = document.querySelectorAll(".bold-italics-underline .material-icons");
let menuBarOptions = document.querySelectorAll(".menu-bar-section div");
let font_fam = document.querySelectorAll(".font_fam option");
let font_siz = document.querySelectorAll(".font_siz option");

let fileOptions = menuBarOptions[0];

let body = document.querySelector("body");


let bold = allbiuOptions[0];
let italicss = allbiuOptions[1];
let underline = allbiuOptions[2];

bold.addEventListener("click",function(){
  if (lastCell) {
    lastCell.style.fontWeight = "bold";
    let address = lastCell.getAttribute("data-address");
    dataObj[address].fontWeight = "bold";
  }
})

italicss.addEventListener("click",function(){
  if (lastCell) {
    lastCell.style.fontStyle = "italic";
    let address = lastCell.getAttribute("data-address");
    dataObj[address].fontStyle = "italic";
  }
})

underline.addEventListener("click",function(){
  if (lastCell) {
    lastCell.style.textDecoration = "underline";
    let address = lastCell.getAttribute("data-address");
    dataObj[address].textDecoration = "underline";
  }
})

let leftAlign = allAlignmentOptions[0];
let centerAlign = allAlignmentOptions[1];
let rightAlign = allAlignmentOptions[2];

let bgColorPicker = allColorOptions[0];
let fontColorPicker = allColorOptions[1];

leftAlign.addEventListener("click", function () {
  if (lastCell) {
    lastCell.style.textAlign = "left";
    let address = lastCell.getAttribute("data-address");
    dataObj[address].align = "left";
  }
});

rightAlign.addEventListener("click", function () {
  if (lastCell) {
    lastCell.style.textAlign = "right";
    let address = lastCell.getAttribute("data-address");
    dataObj[address].align = "right";
  }
});

centerAlign.addEventListener("click", function () {
  if (lastCell) {
    lastCell.style.textAlign = "center";
    let address = lastCell.getAttribute("data-address");
    dataObj[address].align = "center";
  }
});

bgColorPicker.addEventListener("click", function () {
  let colorPickerElement = document.createElement("input");
  colorPickerElement.type = "color";
  body.append(colorPickerElement);
  colorPickerElement.click();

  colorPickerElement.addEventListener("input", function (e) {
   // console.log(e.currentTarget.value);
    if (lastCell) {
      lastCell.style.backgroundColor = e.currentTarget.value;
      let address = lastCell.getAttribute("data-address");
      dataObj[address].bgColor = e.currentTarget.value;
    }
  });
});

fontColorPicker.addEventListener("click", function () {
  let colorPickerElement = document.createElement("input");
  colorPickerElement.type = "color";
  body.append(colorPickerElement);
  colorPickerElement.click();

  colorPickerElement.addEventListener("input", function (e) {
    console.log(e.currentTarget.value);
    if (lastCell) {
      lastCell.style.color = e.currentTarget.value;
      let address = lastCell.getAttribute("data-address");
      dataObj[address].color = e.currentTarget.value;
    }
  });
});


fileOptions.addEventListener("click", function (e) {
  
  if (e.currentTarget.classList.length == 0) {
    e.currentTarget.innerHTML = `File
    <span>
     <span>Clear</span>
     <span>Open</span>
     <span>Save</span>
    </span>`;

    let allFileOptions = e.currentTarget.querySelectorAll("span>span");

    //clear
    allFileOptions[0].addEventListener("click", function () {
      let allCells = document.querySelectorAll(".cell");
      for (let i = 0; i < allCells.length; i++) {
        localStorage.setItem("sheet", "");
        allCells[i].innerHTML = "";
        allCells[i].style.backgroundColor="white";
        let cellAdd = allCells[i].getAttribute("data-address");
        // console.log(cellAdd);
        dataObj[cellAdd] = {
          value: "",
          formula: "",
          upstream: [],
          downstream: [],
          align: "left",
          fontStyle: "none",
          fontWeight: "normal",
          textDecoration:"none",
          color: "black",
          bgColor: "white",
          fontFamily: "Arial",
          fontSize: 14,
        };
      }
    });

       //open
       allFileOptions[1].addEventListener("click", function () {
        //1 - Fetch dataObj from localstorage
        //2 - replace current dataObj with fetched obj
        dataObj = JSON.parse(localStorage.getItem("sheet"));
        //3 - Populate UI with this data
  
        for (let j = 1; j <= 100; j++) {
          for (let i = 0; i < 26; i++) {
            let address = String.fromCharCode(i + 65) + j;
            let cellObj = dataObj[address];
            let cellOnUi = document.querySelector(`[data-address=${address}]`);
            cellOnUi.innerHTML = cellObj.value;
            cellOnUi.style.backgroundColor = cellObj.bgColor;
            cellOnUi.style.textAlign = cellObj.align;
            cellOnUi.style.fontWeight = cellObj.fontWeight;
            cellOnUi.style.fontStyle = cellObj.fontStyle;
            cellOnUi.style.textDecoration = cellObj.textDecoration;
            cellOnUi.style.color = cellObj.colorolor;
            //same kaam css styling kelie kr sakte h?
          }
        }
      });

    //save
    allFileOptions[2].addEventListener("click", function () {
      localStorage.setItem("sheet", JSON.stringify(dataObj));
    });
  } else {
    e.currentTarget.innerHTML = `File`;
  }
});

let changeFontStyle = function(font){
  if(lastCell){
    lastCell.style.fontFamily = font.value;
    let address = lastCell.getAttribute("data-address");
    dataObj[address].fontFamily = font.value;
  }
}

let changeFontSize = function(font){
  if(lastCell){
    lastCell.style.fontSize = font.value;
    let address = lastCell.getAttribute("data-address");
    dataObj[address].fontSize = font.value;
    
  }
}