var SearchEngine = require("search-engine"),
    nPuzzle = require("nPuzzle");

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
  
  var result = this.search.depthFirst(this.puzzle.state, this.puzzle.hash);
  
  this.puzzle.state = result.endState;
  
  return result;
};

MainModel.prototype.iterativeDepthFirst = function () {
  
  var result = this.search.iterativeDepthFirst(this.puzzle.state, this.puzzle.hash);
  
  this.puzzle.state = result.endState;
  
  return result;
};


module.exports = MainModel;