/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugmeta may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('bugmeta.MetaDecorator')

//@Require('Bug')
//@Require('Class')
//@Require('Obj')
//@Require('bugmeta.Annotation')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Bug                     = bugpack.require('Bug');
    var Class                   = bugpack.require('Class');
    var Obj                     = bugpack.require('Obj');
    var Annotation              = bugpack.require('bugmeta.Annotation');


    //-------------------------------------------------------------------------------
    // Declare Class
    //-------------------------------------------------------------------------------

    /**
     * @class
     * @extends {Obj}
     */
    var MetaDecorator = Class.extend(Obj, {

        _name: "bugmeta.MetaDecorator",


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
                var annotation = arguments[i];
                if (Class.doesExtend(annotation, Annotation)) {
                    annotation.setAnnotationReference(this.reference);
                    this.metaContext.addAnnotation(annotation);
                } else {
                    throw new Bug("IllegalArgument", {}, "annotation does not extend the Annotation class");
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

    bugpack.export('bugmeta.MetaDecorator', MetaDecorator);
});
