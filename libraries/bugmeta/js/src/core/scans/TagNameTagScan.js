/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugmeta may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('bugmeta.TagNameTagScan')

//@Require('Class')
//@Require('List')
//@Require('bugmeta.TagScan')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Class       = bugpack.require('Class');
    var List        = bugpack.require('List');
    var TagScan     = bugpack.require('bugmeta.TagScan');


    //-------------------------------------------------------------------------------
    // Declare Class
    //-------------------------------------------------------------------------------

    /**
     * @class
     * @extends {TagScan}
     */
    var TagNameTagScan = Class.extend(TagScan, {

        _name: "bugmeta.TagNameTagScan",


        //-------------------------------------------------------------------------------
        // Constructor
        //-------------------------------------------------------------------------------

        /**
         * @constructs
         * @param {MetaContext} metaContext
         * @param {ITagProcessor} tagProcessor
         * @param {string} tagName
         */
        _constructor: function(metaContext, tagProcessor, tagName) {

            this._super(metaContext, tagProcessor);


            //-------------------------------------------------------------------------------
            // Private Properties
            //-------------------------------------------------------------------------------

            /**
             * @private
             * @type {string}
             */
            this.tagName        = tagName;
        },


        //-------------------------------------------------------------------------------
        // Getters and Setters
        //-------------------------------------------------------------------------------

        /**
         * @return {string}
         */
        getTagName: function() {
            return this.tagName;
        },


        //-------------------------------------------------------------------------------
        // Public Methods
        //-------------------------------------------------------------------------------

        /**
         * @param {{
         *      excludes: Array.<string>
         * }=} scanOptions
         */
        scanAll: function(scanOptions) {
            var _this = this;
            var tags = this.getMetaContext().filterTags(function(tag) {
                return (tag.getTagName() === _this.tagName);
            });
            this.processTags(tags, scanOptions);
        },

        /**
         * @param {Constructor} constructor
         * @param {{
         *      excludes: Array.<string>
         * }=} scanOptions
         */
        scanConstructor: function(constructor, scanOptions) {
            var _this           = this;
            var constructorTags = this.getMetaContext().getTagsByReference(constructor);
            var tags            = new List();
            if (constructorTags) {
                constructorTags.forEach(function(tag) {
                    if (tag.getTagName() === _this.tagName) {
                        tags.add(tag);
                    }
                });
                this.processTags(tags, scanOptions);
            }
        },

        /**
         * @param {Array.<Constructor>} constructors
         * @param {{
         *      excludes: Array.<string>
         * }=} scanOptions
         */
        scanConstructors: function(constructors, scanOptions) {
            var _this = this;
            constructors.forEach(function(constructors) {
                _this.scanConstructor(constructors, scanOptions);
            });
        },

        /**
         * @param {string} bugpackKey
         * @param {{
         *      excludes: Array.<string>
         * }=} scanOptions
         */
        scanBugpack: function(bugpackKey, scanOptions) {
            var constructor = bugpack.require(bugpackKey);
            this.scanConstructor(constructor, scanOptions);
        },

        /**
         * @param {Array.<string>} bugpackKeys
         * @param {{
         *      excludes: Array.<string>
         * }=} scanOptions
         */
        scanBugpacks: function(bugpackKeys, scanOptions) {
            var _this = this;
            bugpackKeys.forEach(function(bugpackKey) {
                _this.scanBugpack(bugpackKey, scanOptions);
            });
        }
    });


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('bugmeta.TagNameTagScan', TagNameTagScan);
});
