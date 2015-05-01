var SearchEngine = require("search-engine"),
    nPuzzle = require("nPuzzle"),
    heuristics = require("./heuristics");

var MainModel = function () {  };

MainModel.prototype.generatePuzzle = function (size) {
  
  this.puzzle = new nPuzzle(size);
  
  var config = {};
  
  config.isFinalState = this.puzzle.isEndState;
  config.generatePossibleStates = this.puzzle.generatePossibleStates;
  
  this.search = new SearchEngine(config);
  
};

MainModel.prototype.randomizePuzzle = function () {
  this.puzzle.randomize(20);
};

MainModel.prototype.breadthFirstSearch = function () {
  
  var result = this.search.breadthFirst(this.puzzle.state, this.puzzle.hash);
  
  this.puzzle.state = result.endState;
  
  return result;
};

MainModel.prototype.depthFirstSearch = function () {
  
  console.log(this.puzzle.hash);
  
  var result = this.search.depthFirst(this.puzzle.state, this.puzzle.hash);
  
  this.puzzle.state = result.endState;
  
  return result;
};

MainModel.prototype.iterativeDepthFirst = function () {
  
  var result = this.search.iterativeDepthFirst(this.puzzle.state, this.puzzle.hash);
  
  this.puzzle.state = result.endState;
  
  return result;
};

MainModel.prototype.aStar = function (heuristicName) {
  
  var result = this.search.aStar(this.puzzle.state, this.puzzle.hash, heuristics[heuristicName]);
  
  this.puzzle.state = result.endState;
  
  return result;
};

MainModel.prototype.tryCopyState = function (rows) {
  
  this.puzzle = new nPuzzle(this.rows.length);
  
  for(var i = 0; i < rows.length; i++) {
   
    for(var j = 2; j < rows.length; j++) {
      
      if(rows[i].cells[j].innerHTML != "null") {
        this.puzzle.state.matrix[i][j] = parseInt(rows[i].cells[j].innerHTML);
      } else {
        this.puzzle.state.matrix[i][j] = null;
      }
      
    }
    
  }
  
};

module.exports = MainModel;