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
         */
        _constructor: function(metaContext, tagProcessor) {

            this._super();


            //-------------------------------------------------------------------------------
            // Private Properties
            //-------------------------------------------------------------------------------

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
        // Protected Methods
        //-------------------------------------------------------------------------------

        /**
         * @protected
         * @param {List.<Tag>} tags
         * @param {{
         *      excludes: Array.<string>
         * }=} scanOptions
         */
        processTags: function(tags, scanOptions) {
            var _this           = this;
            var excludeSet      = new Set();
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
        }
    });


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('bugmeta.TagScan', TagScan);
});
