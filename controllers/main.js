

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

MainController.prototype.doSearch = function (ev) {
  
  var result;
  
  console.log(this);
  
  switch (this.view.searchSelector.value) {
    
    case "bfs":
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
  
  var array = ev.target.value.split(',');
  var value;
  
  for(var i = 0; i < this.model.puzzle.state.matrix.length; i++) {
    
    for(var j = 0; j < this.model.puzzle.state.matrix.length; j++) {
      
      value = array.shift();
      
      if(value == "null") {
        this.model.puzzle.state.empty = { x: i, y: j };
        value = "";
      }
      
      this.model.puzzle.state.matrix[i][j] = value;
      
    }
    
  }
  
  
  this.view.showPuzzle(this.model.puzzle);
  this.addPieceClickEvents();
  console.log(this);
  
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