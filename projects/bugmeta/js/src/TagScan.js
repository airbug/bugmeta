/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugmeta may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('bugmeta.TagScan')

//@Require('Class')
//@Require('Obj')
//@Require('Set')
//@Require('TypeUtil')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Class       = bugpack.require('Class');
    var Obj         = bugpack.require('Obj');
    var Set         = bugpack.require('Set');
    var TypeUtil    = bugpack.require('TypeUtil');


    //-------------------------------------------------------------------------------
    // Declare Class
    //-------------------------------------------------------------------------------

    /**
     * @class
     * @extends {Obj}
     */
    var TagScan = Class.extend(Obj, {

        _name: "bugmeta.TagScan",


        //-------------------------------------------------------------------------------
        // Constructor
        //-------------------------------------------------------------------------------

        /**
         * @constructs
         * @param {MetaContext} metaContext
         * @param {ITagProcessor} tagProcessor
         * @param {string} forType
         */
        _constructor: function(metaContext, tagProcessor, forType) {

            this._super();


            //-------------------------------------------------------------------------------
            // Private Properties
            //-------------------------------------------------------------------------------

            /**
             * @private
             * @type {string}
             */
            this.forType        = forType;

            /**
             * @private
             * @type {MetaContext}
             */
            this.metaContext    = metaContext;

            /**
             * @private
             * @type {ITagProcessor}
             */
            this.tagProcessor   = tagProcessor;
        },


        //-------------------------------------------------------------------------------
        // Getters and Setters
        //-------------------------------------------------------------------------------

        /**
         * @return {string}
         */
        getForType: function() {
            return this.forType;
        },

        /**
         * @return {MetaContext}
         */
        getMetaContext: function() {
            return this.metaContext;
        },

        /**
         * @return {ITagProcessor}
         */
        getTagProcessor: function() {
            return this.tagProcessor;
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
            var _this           = this;
            var excludeSet      = new Set();
            var tags     = this.metaContext.getTagsByType(this.forType);
            if (scanOptions && scanOptions.excludes) {
                scanOptions.excludes.forEach(function(exclude) {
                    if (TypeUtil.isString(exclude)) {
                        excludeSet.add(bugpack.require(exclude));
                    } else {
                        excludeSet.add(exclude);
                    }
                });
            }
            if (tags) {
                tags.forEach(function(tag) {
                    if (!excludeSet.contains(tag.getTagReference())) {
                        _this.tagProcessor.process(tag);
                    }
                });
            }
        },

        /**
         * @param {Class} _class
         */
        scanClass: function(_class) {
            var _this       = this;
            var tags = this.metaContext.getTagsByReference(_class);
            if (tags) {
                tags.forEach(function(tag) {
                    if (tag.getTagType() === _this.forType) {
                        _this.tagProcessor.process(tag);
                    }
                });
            }
        },

        /**
         * @param {Array.<Class>} _classes
         */
        scanClasses: function(_classes) {
            var _this = this;
            _classes.forEach(function(_class) {
                _this.scanClass(_class);
            });
        },

        /**
         * @param {string} bugpackKey
         */
        scanBugpack: function(bugpackKey) {
            var _class = bugpack.require(bugpackKey);
            this.scanClass(_class);
        },

        /**
         * @param {Array.<string>} bugpackKeys
         */
        scanBugpacks: function(bugpackKeys) {
            var _this = this;
            bugpackKeys.forEach(function(bugpackKey) {
                _this.scanBugpack(bugpackKey);
            });
        }
    });


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('bugmeta.TagScan', TagScan);
});
