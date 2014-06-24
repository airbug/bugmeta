/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugmeta may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('bugmeta.MetaTagger')

//@Require('Bug')
//@Require('Class')
//@Require('Obj')
//@Require('bugmeta.Tag')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Bug     = bugpack.require('Bug');
    var Class   = bugpack.require('Class');
    var Obj     = bugpack.require('Obj');
    var Tag     = bugpack.require('bugmeta.Tag');


    //-------------------------------------------------------------------------------
    // Declare Class
    //-------------------------------------------------------------------------------

    /**
     * @class
     * @extends {Obj}
     */
    var MetaTagger = Class.extend(Obj, {

        _name: "bugmeta.MetaTagger",


        //-------------------------------------------------------------------------------
        // Constructor
        //-------------------------------------------------------------------------------

        /**
         * @constructs
         * @param {*} reference
         * @param {MetaContext} metaContext
         */
        _constructor: function(reference, metaContext) {

            this._super();


            //-------------------------------------------------------------------------------
            // Private Properties
            //-------------------------------------------------------------------------------

            /**
             * @private
             * @type {MetaContext}
             */
            this.metaContext        = metaContext;

            /**
             * @private
             * @type {*}
             */
            this.reference          = reference;
        },


        //-------------------------------------------------------------------------------
        // Public Methods
        //-------------------------------------------------------------------------------

        /**
         * @param {...}
         * @return {*}
         */
        'with': function() {
            for (var i = 0, size = arguments.length; i < size; i++) {
                var tag = arguments[i];
                if (Class.doesExtend(tag, Tag)) {
                    tag.setTagReference(this.reference);
                    this.metaContext.addTag(tag);
                } else {
                    throw new Bug("IllegalArgument", {}, "tag does not extend the Tag class");
                }
            }

            // NOTE BRN: Return the reference so that whatever function we're annotating is passed through and the reference
            // is assigned correctly.

            return this.reference;
        }
    });


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('bugmeta.MetaTagger', MetaTagger);
});
