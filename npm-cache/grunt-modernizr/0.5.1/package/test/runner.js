var checkForDevFile = function (callback) {
	var cwd = process.cwd();
	var fs = require("fs");
	var path = require("path");

	var testFile = path.join(cwd, "lib", "modernizr-dev.js");
	var remoteTestFile = "http://modernizr.com/downloads/modernizr-latest.js";

	if (fs.existsSync(testFile)) {
		return callback();
	} else {
		var http = require("http");

		var file = fs.createWriteStream(testFile);
		var request = http.get(remoteTestFile, function (response) {
			response.pipe(file);

			response.on("end", function () {
				callback();
			});
		});
	}
};

checkForDevFile(function () {
	var Mocha = require("mocha");

	var mocha = new Mocha({
		setup : "bdd",
		reporter : process.env.TRAVIS ? "tap" : "spec",
		slow : 5000,
		timeout : 30000
	});

	mocha.addFile("test/tests.js");

	var runner = mocha.run();

	runner.on("fail", function (test, err) {
		process.stderr.write("         " + err.toString() + "\n\n");
		process.exit(1);
	});
});
