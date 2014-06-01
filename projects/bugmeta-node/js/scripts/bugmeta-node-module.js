/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugmeta may be freely distributed under the MIT license.
 */


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
