/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugmeta may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('bugmeta.BugMeta')

//@Require('Class')
//@Require('Obj')
//@Require('Proxy')
//@Require('bugmeta.Tag')
//@Require('bugmeta.TagProcessor')
//@Require('bugmeta.TagScan')
//@Require('bugmeta.ITagProcessor')
//@Require('bugmeta.MetaContext')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Class                   = bugpack.require('Class');
    var Obj                     = bugpack.require('Obj');
    var Proxy                   = bugpack.require('Proxy');
    var Tag              = bugpack.require('bugmeta.Tag');
    var TagProcessor     = bugpack.require('bugmeta.TagProcessor');
    var TagScan          = bugpack.require('bugmeta.TagScan');
    var ITagProcessor           = bugpack.require('bugmeta.ITagProcessor');
    var MetaContext             = bugpack.require('bugmeta.MetaContext');


    //-------------------------------------------------------------------------------
    // Declare Class
    //-------------------------------------------------------------------------------

    /**
     * @class
     * @extends {Obj}
     */
    var BugMeta = Class.extend(Obj, {

        _name: "bugmeta.BugMeta",


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
             * @type {function(new:ITagProcessor)}
             */
            this.ITagProcessor          = ITagProcessor;

            /**
             * @type {function(new:Tag)}
             */
            this.Tag                    = Tag;

            /**
             * @type {function(new:TagProcessor)}
             */
            this.TagProcessor           = TagProcessor;

            /**
             * @type {function(new:TagScan)}
             */
            this.TagScan                = TagScan;


            //-------------------------------------------------------------------------------
            // Private Properties
            //-------------------------------------------------------------------------------

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
         * @return {MetaContext}
         */
        context: function() {
            if (!this.metaContext) {
                this.metaContext = new MetaContext();
            }
            return this.metaContext;
        },

        /**
         * @param {string} tagType
         * @param {function(Tag)} processorFunction
         */
        scanAllForTypeAndProcess: function(tagType, processorFunction) {
            var tagProcessor = new TagProcessor(processorFunction);
            var tagScan      = new TagScan(this.context(), tagProcessor, tagType);
            tagScan.scanAll();
        },

        /**
         * @param {string} tagType
         * @return {Tag}
         */
        tag: function(tagType) {
            return new Tag(tagType);
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
    // Public Static Methods
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

    Proxy.proxy(BugMeta, Proxy.method(BugMeta.getInstance), [,
        "context",
        "tag"
    ]);


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('bugmeta.BugMeta', BugMeta);
});
