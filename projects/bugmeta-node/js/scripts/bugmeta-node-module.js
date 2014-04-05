//-------------------------------------------------------------------------------
// Script
//-------------------------------------------------------------------------------

var bugpackApi          = require("bugpack");
var bugpack             = bugpackApi.loadContextSync(module);
bugpack.loadExportSync("bugmeta.BugMeta");
var BugMeta             = bugpack.require("bugmeta.BugMeta");


//-------------------------------------------------------------------------------
// Exports
//-------------------------------------------------------------------------------

module.exports = BugMeta.getInstance();
