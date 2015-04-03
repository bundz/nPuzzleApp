var $ = require("jquery");

var MainView = function (document) {
  
  this.document = document;
  this.title = document.getElementById("title");
  this.generateButton = document.getElementById("generateButton");
  this.sizeInput = document.getElementById("sizeInput");
  this.puzzle = document.getElementById("puzzle");
  this.randomizeButton = document.getElementById("randomize");
  this.goButton = document.getElementById("goButton");
  this.searchSelector = document.getElementById("searchSelector");
  this.logTable = document.getElementById("logTable");
  
};

MainView.prototype.showPuzzle = function (puzzle) {
  
  this.erasePuzzleRows();
  
  var cell;
  
  for (var i = 0; i < puzzle.state.matrix.length; i++) {
    this.puzzle.insertRow(i);
    
    for(var j = 0; j < puzzle.state.matrix.length; j++) {
     
      cell = this.puzzle.rows[i].insertCell(j);
      cell.innerHTML = puzzle.state.matrix[i][j];      
      
    }
    
  }
  
  this.puzzle.rows[puzzle.state.empty.x].cells[puzzle.state.empty.y].setAttribute("style", "background-color: green;  ");
  
};


MainView.prototype.erasePuzzleRows = function () {
  
  var length = this.puzzle.rows.length;
  
  for(var i = 0; i < length; i++) {
   
    this.puzzle.deleteRow(0);
    
  }
  
};

MainView.prototype.showResult = function (obj) {
  
  this.result = obj.result;
  this.result.push(obj.endState);
  
  var move = function () {
    
    if(this.result.length == 0) {
      return; 
    }
    
    var state = this.result.shift();
    
    for (var i = 0; i < state.matrix.length; i++) {
    
      for(var j = 0; j < state.matrix.length; j++) {
        
        
        this.puzzle.rows[i].cells[j].innerHTML = state.matrix[i][j];  
      
        if(this.puzzle.rows[i].cells[j].innerHTML == "") {
          
          console.log(this.puzzle.rows[i].cells[j]);
          this.puzzle.rows[i].cells[j].setAttribute("style", "background-color: green;  ");
          
        } else {
          
          this.puzzle.rows[i].cells[j].setAttribute("style", "background-color: white;  ");
          
        }
      
    }
    
  }
  
    setTimeout(move.bind(this), 1000);
    
  };
  
  
  setTimeout(move.bind(this), 1000);
  
  this.addResultToLog(obj.algorithm, obj.result.length, obj.maxStackLength, obj.initialState);

};

MainView.prototype.swap = function (p1, p2) {
  
  console.log(p1, p2);
  
  var aux = this.puzzle.rows[p1.x].cells[p1.y].innerText;
  
  if (this.puzzle.rows[p1.x].cells[p1.y].innerText == "") {
    this.puzzle.rows[p1.x].cells[p1.y].setAttribute("style", "background-color: white;  ");
    this.puzzle.rows[p2.x].cells[p2.y].setAttribute("style", "background-color: green;  ");
  } else {
    this.puzzle.rows[p1.x].cells[p1.y].setAttribute("style", "background-color: green;  ");
    this.puzzle.rows[p2.x].cells[p2.y].setAttribute("style", "background-color: white;  ");
  }
  
  this.puzzle.rows[p1.x].cells[p1.y].innerText = this.puzzle.rows[p2.x].cells[p2.y].innerText;
  this.puzzle.rows[p2.x].cells[p2.y].innerText = aux;
  
};

MainView.prototype.addResultToLog = function (algorithm, movements, maxStackLength, initialState) {
  
  var cell;
  this.logTable.insertRow(1);
  
  cell = this.logTable.rows[1].insertCell(0);
  cell.innerHTML = algorithm;
  
  cell = this.logTable.rows[1].insertCell(1);
  cell.innerHTML = movements;
  
  cell = this.logTable.rows[1].insertCell(2);
  cell.innerHTML = maxStackLength;
  
  var stateStr = initialState.toString();
  cell = this.logTable.rows[1].insertCell(3);
  cell.innerHTML = '<button value="' + stateStr + '">Get this state</button>'
  
};


module.exports = MainView;