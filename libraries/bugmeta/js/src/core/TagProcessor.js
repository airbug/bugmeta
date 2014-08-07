/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugmeta may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('bugmeta.TagProcessor')

//@Require('Bug')
//@Require('Class')
//@Require('Obj')
//@Require('TypeUtil')
//@Require('bugmeta.ITagProcessor')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Bug             = bugpack.require('Bug');
    var Class           = bugpack.require('Class');
    var Obj             = bugpack.require('Obj');
    var TypeUtil        = bugpack.require('TypeUtil');
    var ITagProcessor   = bugpack.require('bugmeta.ITagProcessor');


    //-------------------------------------------------------------------------------
    // Declare Class
    //-------------------------------------------------------------------------------

    /**
     * @class
     * @extends {Obj}
     * @implements {ITagProcessor}
     */
    var TagProcessor = Class.extend(Obj, {

        _name: "bugmeta.TagProcessor",


        //-------------------------------------------------------------------------------
        // Constructor
        //-------------------------------------------------------------------------------

        /**
         * @constructs
         * @param {function(Tag)} tagProcessorFunction
         */
        _constructor: function(tagProcessorFunction) {

            this._super();


            //-------------------------------------------------------------------------------
            // Private Properties
            //-------------------------------------------------------------------------------

            if (!TypeUtil.isFunction(tagProcessorFunction)) {
                throw new Bug("IllegalArgument", {}, "tagProcessorFunction must be a function");
            }
            /**
             * @private
             * @type {function(Tag)}
             */
            this.tagProcessorFunction = tagProcessorFunction;
        },


        //-------------------------------------------------------------------------------
        // Getters and Setters
        //-------------------------------------------------------------------------------

        /**
         * @return {function(Tag)}
         */
        getTagProcessorFunction: function() {
            return this.tagProcessorFunction;
        },


        //-------------------------------------------------------------------------------
        // Public Methods
        //-------------------------------------------------------------------------------

        /**
         * @param {Tag} tag
         */
        process: function(tag) {
            this.tagProcessorFunction.call(null, tag);
        }
    });


    //-------------------------------------------------------------------------------
    // Implement Interfaces
    //-------------------------------------------------------------------------------

    Class.implement(TagProcessor, ITagProcessor);


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('bugmeta.TagProcessor', TagProcessor);
});
