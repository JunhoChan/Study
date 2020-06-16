function junhoPlugin(options) {
}

junhoPlugin.prototype.apply = function(complier) {
  compiler.plugin("compile", function(params) {
    console.log("The compile is starting to compile...", params);
  });
  // 2
  compiler.plugin("compilation", function(compilation, params) {
    console.log("The compile is starting a new compilation...");
    // 4
    compilation.plugin("optimize", function() {
      console.log("The compilation is starting to optimize file...");
    });
  });

  // 3
  compiler.plugin("make", function(compiler, callback){
    console.log("the compile is making file...");
    callback();
  });

  // 5
  compiler.plugin("after-compile", function(compilation) {
    console.log("The compile has aleardy compiled");
  });

	// 6
	compiler.plugin("emit", function(compilation, callback) {
    console.log("The compilation is going to emit files...");
    callback();
  });

	// 7
	compiler.plugin('after-emit', function(compilation) {
    console.log('The compliation has aleardy emitted');
  })
}

module.export = junhoPlugin
