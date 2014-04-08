//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('bugmeta.BugMeta')

//@Require('Class')
//@Require('Obj')
//@Require('Proxy')
//@Require('bugmeta.Annotation')
//@Require('bugmeta.AnnotationProcessor')
//@Require('bugmeta.AnnotationScan')
//@Require('bugmeta.IAnnotationProcessor')
//@Require('bugmeta.MetaContext')


//-------------------------------------------------------------------------------
// Common Modules
//-------------------------------------------------------------------------------

var bugpack                 = require('bugpack').context();


//-------------------------------------------------------------------------------
// BugPack
//-------------------------------------------------------------------------------

var Class                   = bugpack.require('Class');
var Obj                     = bugpack.require('Obj');
var Proxy                   = bugpack.require('Proxy');
var Annotation              = bugpack.require('bugmeta.Annotation');
var AnnotationProcessor     = bugpack.require('bugmeta.AnnotationProcessor');
var AnnotationScan          = bugpack.require('bugmeta.AnnotationScan');
var IAnnotationProcessor    = bugpack.require('bugmeta.IAnnotationProcessor');
var MetaContext             = bugpack.require('bugmeta.MetaContext');


//-------------------------------------------------------------------------------
// Declare Class
//-------------------------------------------------------------------------------

/**
 * @class
 * @extends {Obj}
 */
var BugMeta = Class.extend(Obj, {

    //-------------------------------------------------------------------------------
    // Constructor
    //-------------------------------------------------------------------------------

    /**
     * @constructs
     */
    _constructor: function() {

        this._super();


        //-------------------------------------------------------------------------------
        // Public Properties
        //-------------------------------------------------------------------------------

        /**
         * @type {function(new:Annotation)}
         */
        this.Annotation             = Annotation;

        /**
         * @type {function(new:AnnotationProcessor)}
         */
        this.AnnotationProcessor    = AnnotationProcessor;

        /**
         * @type {function(new:AnnotationScan)}
         */
        this.AnnotationScan         = AnnotationScan;

        /**
         * @type {function(new:IAnnotationProcessor)}
         */
        this.IAnnotationProcessor   = IAnnotationProcessor;

        /**
         * @private
         * @type {MetaContext}
         */
        this.metaContext            = null;
    },


    //-------------------------------------------------------------------------------
    // Public Methods
    //-------------------------------------------------------------------------------

    /**
     * @param {string} annotationType
     * @return {Annotation}
     */
    annotation: function(annotationType) {
        return new Annotation(annotationType);
    },

    /**
     * @return {MetaContext}
     */
    context: function() {
        if (!this.metaContext) {
            this.metaContext = new MetaContext();
        }
        return this.metaContext;
    },

    /**
     * @param {string} annotationType
     * @param {function(Annotation)} processorFunction
     */
    scanAllForTypeAndProcess: function(annotationType, processorFunction) {
        var annotationProcessor = new AnnotationProcessor(processorFunction);
        var annotationScan      = new AnnotationScan(this.context(), annotationProcessor, annotationType);
        annotationScan.scanAll();
    }
});


//-------------------------------------------------------------------------------
// Private Static Variables
//-------------------------------------------------------------------------------

/**
 * @static
 * @private
 * @type {BugMeta}
 */
BugMeta.instance = null;


//-------------------------------------------------------------------------------
// Private Static Methods
//-------------------------------------------------------------------------------

/**
 * @static
 * @return {BugMeta}
 */
BugMeta.getInstance = function() {
    if (BugMeta.instance === null) {
        BugMeta.instance = new BugMeta();
    }
    return BugMeta.instance;
};


//-------------------------------------------------------------------------------
// Static Proxy
//-------------------------------------------------------------------------------

Proxy.proxy(BugMeta, Proxy.method(BugMeta.getInstance), [
    "annotation",
    "context"
]);


//-------------------------------------------------------------------------------
// Exports
//-------------------------------------------------------------------------------

bugpack.export('bugmeta.BugMeta', BugMeta);