var distanceHeuristic = function (state) {
  var value = state.result ? state.result.length : 0;
  var expectedX, expectedY;


  for(var i = 0; i < state.matrix.length; i++) {


    for(var j = 0; j < state.matrix.length; j++) {


      if(state.matrix[i][j] == null) {
        expectedX = state.matrix.length - 1;
        expectedY = state.matrix.length - 1;
      } else {
        expectedX = Math.floor((state.matrix[i][j] - 1)/(state.matrix.length));
        expectedY = (state.matrix[i][j] - 1) % state.matrix.length;
      }

      value += Math.abs(expectedX - i) + Math.abs(expectedY - j);

    }

  }
  
  return value;
};

module.exports = distanceHeuristic;