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
//@Require('bugmeta.ITagProcessor')
//@Require('bugmeta.MetaContext')
//@Require('bugmeta.Tag')
//@Require('bugmeta.TagClassTagScan')
//@Require('bugmeta.TagNameTagScan')
//@Require('bugmeta.TagProcessor')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Class               = bugpack.require('Class');
    var Obj                 = bugpack.require('Obj');
    var Proxy               = bugpack.require('Proxy');
    var ITagProcessor       = bugpack.require('bugmeta.ITagProcessor');
    var MetaContext         = bugpack.require('bugmeta.MetaContext');
    var Tag                 = bugpack.require('bugmeta.Tag');
    var TagClassTagScan     = bugpack.require('bugmeta.TagClassTagScan');
    var TagNameTagScan      = bugpack.require('bugmeta.TagNameTagScan');
    var TagProcessor        = bugpack.require('bugmeta.TagProcessor');


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
             * @type {function(new:TagClassTagScan)}
             */
            this.TagClassTagScan        = TagClassTagScan;

            /**
             * @type {function(new:TagNameTagScan)}
             */
            this.TagNameTagScan         = TagNameTagScan;


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
         * @param {string} tagName
         * @param {function(Tag)} processorFunction
         */
        processByName: function(tagName, processorFunction) {
            var tagProcessor = new TagProcessor(processorFunction);
            var tagScan      = new TagNameTagScan(this.context(), tagProcessor, tagName);
            tagScan.scanAll();
        },

        /**
         * @param {string} tagName
         * @return {Tag}
         */
        tag: function(tagName) {
            return new Tag(tagName);
        }
    });


    //-------------------------------------------------------------------------------
    // Private Static Properties
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
