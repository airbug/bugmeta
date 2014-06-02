/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugmeta may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('bugmeta.MetaContext')

//@Require('Class')
//@Require('List')
//@Require('Map')
//@Require('Obj')
//@Require('bugmeta.TagProcessor')
//@Require('bugmeta.MetaTagger')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Class                   = bugpack.require('Class');
    var List                    = bugpack.require('List');
    var Map                     = bugpack.require('Map');
    var Obj                     = bugpack.require('Obj');
    var TagProcessor     = bugpack.require('bugmeta.TagProcessor');
    var MetaTagger           = bugpack.require('bugmeta.MetaTagger');


    //-------------------------------------------------------------------------------
    // Declare Class
    //-------------------------------------------------------------------------------

    /**
     * @class
     * @extends {Obj}
     */
    var MetaContext = Class.extend(Obj, {

        _name: "bugmeta.MetaContext",


        //-------------------------------------------------------------------------------
        // Constructor
        //-------------------------------------------------------------------------------

        /**
         * @constructs
         */
        _constructor: function() {

            this._super();


            //-------------------------------------------------------------------------------
            // Private Properties
            //-------------------------------------------------------------------------------

            /**
             * @private
             * @type {Map.<string, List.<Tag>>}
             */
            this.tagMap                  = new Map();

            /**
             * @private
             * @type {Map.<string, List.<TagProcessor>>}
             */
            this.tagProcessorMap         = new Map();

            /**
             * @private
             * @type {Map.<*, List.<Tag>>}
             */
            this.referenceToTagListMap   = new Map();
        },


        //-------------------------------------------------------------------------------
        // Getters and Setters
        //-------------------------------------------------------------------------------

        /**
         * @return {Map.<string, List.<Tag>>}
         */
        getTagMap: function() {
            return this.tagMap;
        },

        /**
         * @return {Map.<string, List.<TagProcessor>>}
         */
        getTagProcessorMap: function() {
            return this.tagProcessorMap;
        },

        /**
         * @return {Map.<*, List.<Tag>>}
         */
        getReferenceToTagListMap: function() {
            return this.referenceToTagListMap;
        },

        //-------------------------------------------------------------------------------
        // Public Methods
        //-------------------------------------------------------------------------------

        /**
         * @param {Tag} tag
         */
        addTag: function(tag) {
            var tagTypeList = this.tagMap.get(tag.getTagType());
            if (!tagTypeList) {
                tagTypeList = new List();
                this.tagMap.put(tag.getTagType(), tagTypeList);
            }
            tagTypeList.add(tag);
            var tagReferenceList = this.referenceToTagListMap.get(tag.getTagReference());
            if (!tagReferenceList) {
                tagReferenceList = new List();
                this.referenceToTagListMap.put(tag.getTagReference(), tagReferenceList);
            }
            tagReferenceList.add(tag);
            this.processTag(tag);
        },

        /**
         * @param {*} reference
         * @return {List.<Tag>}
         */
        getTagsByReference: function(reference) {
            return this.referenceToTagListMap.get(reference);
        },

        /**
         * @param {string} tagType
         * @return {List.<Tag>}
         */
        getTagsByType: function(tagType) {
            //TODO BRN (QUESTION): Should we clone this list to prevent breakage?
            return this.tagMap.get(tagType);
        },

        /**
         * @param {Tag} tag
         */
        processTag: function(tag) {
            var tagProcessorTypeList = this.tagProcessorMap.get(tag.getTagType());
            if (tagProcessorTypeList) {
                tagProcessorTypeList.forEach(function(tagProcessor) {
                    tagProcessor.process(tag);
                });
            }
        },

        /**
         * @param {string} tagType
         * @param {function(Tag)} tagProcessorFunction
         */
        registerTagProcessor: function(tagType, tagProcessorFunction) {
            var tagProcessorTypeList = this.tagProcessorMap.get(tagType);
            if (!tagProcessorTypeList) {
                tagProcessorTypeList = new List();
                this.tagProcessorMap.put(tagType, tagProcessorTypeList);
            }
            var tagProcessor = new TagProcessor(tagProcessorFunction);
            tagProcessorTypeList.add(tagProcessor);
        },

        /**
         * @param {*} reference
         * @return {MetaTagger}
         */
        tag: function(reference) {
            return new MetaTagger(reference, this);
        }
    });


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('bugmeta.MetaContext', MetaContext);
});
