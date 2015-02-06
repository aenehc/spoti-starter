var App           = require('./application/app.js');
var gui           = global.window.nwDispatcher.requireNwGui();
var win           = gui.Window.get();
var nativeMenuBar = new gui.Menu({ type: "menubar" });



try {
  nativeMenuBar.createMacBuiltin("My App");
  win.menu = nativeMenuBar;
}
catch (ex) {
  console.log(ex.message);
}



App.init();
