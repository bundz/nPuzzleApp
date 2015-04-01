var $ = require("jquery");

var MainView = function (document) {
  
  this.document = document;
  this.title = document.getElementById("title");
  this.generateButton = document.getElementById("generateButton");
  this.sizeInput = document.getElementById("sizeInput");
  this.puzzle = document.getElementById("puzzle");
  this.randomizeButton = document.getElementById("randomize");
  this.depthFirstButton = document.getElementById("depthFirst");
  this.breadthFirstButton = document.getElementById("breadthFirst");
  this.iterativeButton = document.getElementById("iterative");
  this.goButton = document.getElementById("goButton");
  this.searchSelector = document.getElementById("searchSelector");
  
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
  
  console.log(obj);
  
//  this.empty = this.result.shift().empty;
  
  var move = function () {
    
    if(this.result.length == 0) {
      return; 
    }
    
    var state = this.result.shift();
    
    for (var i = 0; i < state.matrix.length; i++) {
    
      for(var j = 0; j < state.matrix.length; j++) {
        
        
        this.puzzle.rows[i].cells[j].innerHTML = state.matrix[i][j];  
        
        
//        this.puzzle.rows[state.empty.x].cells[state.empty.y].removeAttribute("style", "background-color: green;  ");
        
        if(this.puzzle.rows[i].cells[j].innerHTML == "") {
          
          console.log(this.puzzle.rows[i].cells[j]);
          this.puzzle.rows[i].cells[j].setAttribute("style", "background-color: green;  ");
          
        } else {
          
          this.puzzle.rows[i].cells[j].setAttribute("style", "background-color: white;  ");
          
        }
      
    }
    
  }
  
    
    
//    console.log(state.matrix[0].toString(),state.matrix[1].toString(),state.matrix[2].toString(), "move->", state.movement, "state->",state);
//    
//    var empty = this.empty;
//    
//    switch(state.movement) {
//     
//        case "u":
//          this.swap(empty, { x: empty.x - 1, y: empty.y});
//          break;
//        case "l":
//          this.swap(empty, { x: empty.x, y: empty.y - 1});
//          break;
//        case "d":
//          this.swap(empty, { x: empty.x + 1, y: empty.y});
//          break;
//        case "r":
//          this.swap(empty, { x: empty.x, y: empty.y + 1});
//          break;
//        
//    }
//    
//    this.empty = state.empty;
    setTimeout(move.bind(this), 1000);
    
  };
  
  
  setTimeout(move.bind(this), 1000);

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


module.exports = MainView;