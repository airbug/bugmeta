//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('bugmeta.AnnotationProcessor')

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

    var Bug                     = bugpack.require('Bug');
    var Class                   = bugpack.require('Class');
    var Obj                     = bugpack.require('Obj');
    var TypeUtil                = bugpack.require('TypeUtil');
    var ITagProcessor    = bugpack.require('bugmeta.ITagProcessor');


    //-------------------------------------------------------------------------------
    // Declare Class
    //-------------------------------------------------------------------------------

    /**
     * @class
     * @extends {Obj}
     * @implements {ITagProcessor}
     */
    var AnnotationProcessor = Class.extend(Obj, {

        _name: "bugmeta.AnnotationProcessor",


        //-------------------------------------------------------------------------------
        // Constructor
        //-------------------------------------------------------------------------------

        /**
         * @constructs
         * @param {function(Annotation)} processorFunction
         */
        _constructor: function(processorFunction) {

            this._super();


            //-------------------------------------------------------------------------------
            // Private Properties
            //-------------------------------------------------------------------------------

            if (!TypeUtil.isFunction(processorFunction)) {
                throw new Bug("IllegalArgument", {}, "processorFunction must be a function");
            }
            /**
             * @private
             * @type {function(Annotation)}
             */
            this.processorFunction = processorFunction;
        },


        //-------------------------------------------------------------------------------
        // Getters and Setters
        //-------------------------------------------------------------------------------

        /**
         * @return {function(Annotation)}
         */
        getProcessorFunction: function() {
            return this.processorFunction;
        },


        //-------------------------------------------------------------------------------
        // Public Methods
        //-------------------------------------------------------------------------------

        /**
         * @param {Annotation} annotation
         */
        process: function(annotation) {
            this.processorFunction.call(null, annotation);
        }
    });


    //-------------------------------------------------------------------------------
    // Implement Interfaces
    //-------------------------------------------------------------------------------

    Class.implement(AnnotationProcessor, ITagProcessor);


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('bugmeta.AnnotationProcessor', AnnotationProcessor);
});
