var $ = require("jquery"),
    Controller = require("./controllers/main"),
    View = require("./views/main"),
    Model = require("./models/main");

var model, view, controller;

window.onload = init;

function init () {
  
  model = new Model();
  view = new View(document);  
  controller = new Controller(view, model);
  
}