

var MainController = function (view, model) {
  this.view = view;
  this.view.generateButton.onclick = this.generatePuzzle.bind(this);
  this.view.randomizeButton.onclick = this.randomizePuzzle.bind(this);
  this.view.breadthFirstButton.onclick = this.breadthFirstSearch.bind(this);
  this.view.depthFirstButton.onclick = this.depthFirstSearch.bind(this);
  this.view.iterativeButton.onclick = this.itarativeDepthFirst.bind(this);
  
  this.model = model;
  
}

MainController.prototype.generatePuzzle = function () {
   
  this.model.generatePuzzle(this.view.sizeInput.value);
  this.view.showPuzzle(this.model.puzzle);
  this.addPieceClickEvents();
  console.log(this.view.puzzle.rows);
  
  
  
};

MainController.prototype.randomizePuzzle = function () {
  
  this.model.randomizePuzzle();
  this.view.showPuzzle(this.model.puzzle);
  this.addPieceClickEvents();
  
};

MainController.prototype.breadthFirstSearch = function () {
  
  var result = this.model.breadthFirstSearch();
  
  this.view.showResult(result);
};

MainController.prototype.depthFirstSearch = function () {
  
  var result = this.model.depthFirstSearch();
  
  this.view.showResult(result);
};

MainController.prototype.itarativeDepthFirst = function () {
  
  var result = this.model.iterativeDepthFirst();
  
  console.log(result);
  
  this.view.showResult(result);
};

MainController.prototype.pieceClicked = function (ev) {
  var cellPoint = getCellPoint(ev.target.innerText, this.model.puzzle.state.matrix);
  
  console.log(this.model);
  
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