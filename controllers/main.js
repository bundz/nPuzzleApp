

var MainController = function (view, model) {
  this.view = view;
  this.view.generateButton.onclick = this.generatePuzzle.bind(this);
  this.view.randomizeButton.onclick = this.randomizePuzzle.bind(this);
  this.view.goButton.onclick = this.doSearch.bind(this);
  
  this.model = model;
  
}

MainController.prototype.generatePuzzle = function () {
  
  this.model.generatePuzzle(this.view.sizeInput.value);
  this.view.showPuzzle(this.model.puzzle);
  this.addPieceClickEvents();
  
};

MainController.prototype.randomizePuzzle = function () {
  
  this.model.randomizePuzzle();
  this.view.showPuzzle(this.model.puzzle);
  this.addPieceClickEvents();
  
};

MainController.prototype.clonePuzzle = function () {
   
  this.model.puzzle.state.result = [];
  this.view.showPuzzle(this.model.puzzle);
  this.addPieceClickEvents();
  
};

MainController.prototype.tryCopyStateFromView = function () {
  
  this.model.tryCopyState(this.view.puzzle.rows);
  
};

MainController.prototype.doSearch = function (ev) {
  
  var result; 
  
  switch (this.view.searchSelector.value) {
    
    case "bfs":
      console.log(this.model);
      result = this.model.breadthFirstSearch();
      result.algorithm = "bfs";
      break;
    case "dfs":
      result = this.model.depthFirstSearch();
      result.algorithm = "dfs";
      break;
    case "idfs":
      result = this.model.iterativeDepthFirst();
      result.algorithm = "idfs";
      break;
    case "h1":
      result = this.model.aStar("h1");
      result.algorithm = "A* (h1)"
      break;
    case "h2":
      result = this.model.aStar("h2");
      result.algorithm = "A* (h2)"
      break;
    case "h3":
      result = this.model.aStar("h3");
      result.algorithm = "A* (h3)"
      break;
    default:
      break;
  }  
  
  this.view.showResult(result);
  this.addGetStateEvent();
      
};


MainController.prototype.pieceClicked = function (ev) {
  var cellPoint = getCellPoint(ev.target.innerText, this.model.puzzle.state.matrix);
  
  if(canSwap(cellPoint, this.model.puzzle.state.empty)) {
    this.view.swap(this.model.puzzle.state.empty, cellPoint);
    this.model.puzzle.state.swap(this.model.puzzle.state.empty, cellPoint);
  }
  
};

MainController.prototype.addPieceClickEvents = function () {
  
  for(var i = 0; i < this.view.puzzle.rows.length; i++) {
    
    for(var j = 0; j < this.view.puzzle.rows.length; j++) {
      
      this.view.puzzle.rows[i].cells[j].onclick = this.pieceClicked.bind(this);
      
    }
  }
  
};

MainController.prototype.addGetStateEvent = function () {
  
  this.view.logTable.rows[1].cells[3].onclick = this.getStateClicked.bind(this);
  
};

MainController.prototype.getStateClicked = function (ev) {
  
  console.log(ev.target.value);
  
  var array = ev.target.value.split(',');
  var value;
  
  for(var i = 0; i < this.model.puzzle.state.matrix.length; i++) {
    
    for(var j = 0; j < this.model.puzzle.state.matrix.length; j++) {
      
      value = array.shift();
      
      if(value == "null") {
        this.model.puzzle.state.empty = { x: i, y: j };
        value = null;
      }
      
      this.model.puzzle.state.matrix[i][j] = value;
      
      
    }
    
  }
  
  this.clonePuzzle();
  
};

function getCellPoint (value, matrix) {
  
  for(var i = 0; i < matrix.length; i++) {
   
    for(var j = 0; j < matrix.length; j++) {
     
      if (matrix[i][j] == value) {
       
        return { x: i, y: j };
        
      }
      
    }
    
  }
  
}

function canSwap(p1, p2) {
  return ((Math.abs(p1.x - p2.x) == 1) + (Math.abs(p1.y - p2.y))) == 1
}

module.exports = MainController;