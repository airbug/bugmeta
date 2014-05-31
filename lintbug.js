/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugcore may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Common Modules
//-------------------------------------------------------------------------------

var bugcore             = require('bugcore');
var bugflow             = require('bugflow');
var bugfs               = require('bugfs');
var buildbug            = require('buildbug');


//-------------------------------------------------------------------------------
// Simplify References
//-------------------------------------------------------------------------------

var enableModule        = buildbug.enableModule;
var TypeUtil            = bugcore.TypeUtil;
var $series             = bugflow.$series;
var $task               = bugflow.$task;


//-------------------------------------------------------------------------------
// Enable Modules
//-------------------------------------------------------------------------------

var lintbug             = enableModule("lintbug");


//-------------------------------------------------------------------------------
// Lint Tasks
//-------------------------------------------------------------------------------

//NOTE BRN: This only works for JS files
lintbug.lintTask("updateCopyright", function(lintFile, callback) {
    var fileContents    = lintFile.getFileContents();
    var copyright       = getCopyright();
    var copyrightRegex  = /^(\s*)\/\*(([^.]|[.])+?)Copyright \(c\)(([^.]|[.])+?)\*\/(\s*)/;
    if (copyrightRegex.test(fileContents)) {
        fileContents = fileContents.replace(copyrightRegex, copyright + "\n\n");
    } else {
        fileContents = copyright + "\n\n" + fileContents;
    }
    lintFile.setFileContents(fileContents);
    callback();
});

lintbug.lintTask("orderRequireAnnotations", function(lintFile, callback) {
    var fileContents    = lintFile.getFileContents();
    var lines           = fileContents.split("\n");
    sortRequireAnnotationLines(lines);
    lintFile.setFileContents(lines.join("\n"));
});

lintbug.lintTask("orderBugPackRequiresInFile", function(jsFilePath, callback) {
    //var Class                   = bugpack.require('Class');
});


//-------------------------------------------------------------------------------
// Helper Methods
//-------------------------------------------------------------------------------

var copyright = null;

/**
 * @private
 * @return {string}
 */
var getCopyright = function() {
    if (copyright === null) {
        var copyrightText   = bugcore.StringUtil.trim(bugfs.readFileSync(__dirname + "/COPYRIGHT", 'utf8'));
        var copyrightLines  = copyrightText.split("\n");
        copyright = "/*\n";
        copyrightLines.forEach(function(copyrightLine) {
            copyrightLine = bugcore.StringUtil.trim(copyrightLine);
            if (copyrightLine !== "") {
                copyright += " * " + copyrightLine + "\n";
            } else {
                copyright += " *\n";
            }
        });
        copyright += " */\n";
    }
    return copyright;
};

/**
 * @private
 * @param {string} argumentsString
 * @return {Array.<(string|number)>}
 */
var parseArguments = function(argumentsString) {
    var args = [];
    var parts = argumentsString.split(',');
    parts.forEach(function(part) {
        var results = part.match(/\s*('|")(.*?)\1\s*/);
        if (results) {
            args.push(results[2]);
        } else {
            var num = parseFloat(part);
            if (isNaN(num)) {
                throw new Error("Could not parse parameter '" + part + "'");
            }
            args.push(num);
        }
    });
    return args;
};

/**
 * @private
 * @param {string} text
 * @return {string}
 */
var parseString = function(text) {
    var results = text.match(/\s*('|")(.*?)\1\s*/);
    if (results) {
        return results[2];
    }
    return null;
};

/**
 * @private
 * @param {Array.<string>} lines
 */
var sortRequireAnnotationLines = function(lines) {
    lines.sort(function(a, b) {
        var resultsA = a.match(/^\s*\/\/\s*@Require\(('|")((?:\w|\.)*)\1\)\s*$/);
        var resultsB = b.match(/^\s*\/\/\s*@Require\(('|")((?:\w|\.)*)\1\)\s*$/);

        if (resultsA && resultsB) {
            var partsA = resultsA[2].split(".");
            var partsB = resultsB[2].split(".");
            var classNameA = partsA.pop();
            var classNameB = partsB.pop();
            var packageNameA = partsA.join(".");
            var packageNameB = partsB.join(".");
            if (packageNameA < packageNameB) {
                return -1;
            }
            if (packageNameA > packageNameB) {
                return 1;
            }
            if (classNameA < classNameB) {
                return -1;
            }
            if (classNameB > classNameA) {
                return 1;
            }
        }
        return 0;
    });
};