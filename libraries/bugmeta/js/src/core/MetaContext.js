/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugmeta may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@Export('bugmeta.MetaContext')

//@Require('Bug')
//@Require('Class')
//@Require('Collections')
//@Require('List')
//@Require('Obj')
//@Require('bugmeta.MetaTagger')
//@Require('bugmeta.Tag')
//@Require('bugmeta.TagProcessor')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Bug             = bugpack.require('Bug');
    var Class           = bugpack.require('Class');
    var Collections     = bugpack.require('Collections');
    var List            = bugpack.require('List');
    var Obj             = bugpack.require('Obj');
    var MetaTagger      = bugpack.require('bugmeta.MetaTagger');
    var Tag             = bugpack.require('bugmeta.Tag');
    var TagProcessor    = bugpack.require('bugmeta.TagProcessor');


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
             * @type {Map.<*, List.<Tag>>}
             */
            this.referenceToTagListMap      = Collections.map();

            /**
             * @private
             * @type {Map.<Class, List.<Tag>>}
             */
            this.tagClassToTagListMap       = Collections.map();

            /**
             * @private
             * @type {Map.<string, List.<TagProcessor>>}
             */
            this.tagClassToTagProcessorMap  = Collections.map();

            /**
             * @private
             * @type {List.<Tag>}
             */
            this.tagList                    = Collections.list();
        },


        //-------------------------------------------------------------------------------
        // Getters and Setters
        //-------------------------------------------------------------------------------

        /**
         * @return {Map.<*, List.<Tag>>}
         */
        getReferenceToTagListMap: function() {
            return this.referenceToTagListMap;
        },

        /**
         * @return {Map.<string, List.<Tag>>}
         */
        getTagClassToTagListMap: function() {
            return this.tagClassToTagListMap;
        },

        /**
         * @return {Map.<string, List.<TagProcessor>>}
         */
        getTagClassToTagProcessorMap: function() {
            return this.tagClassToTagProcessorMap;
        },

        /**
         * @return {List.<Tag>}
         */
        getTagList: function() {
            return this.tagList;
        },


        //-------------------------------------------------------------------------------
        // Public Methods
        //-------------------------------------------------------------------------------

        /**
         * @param {Tag} tag
         */
        addTag: function(tag) {
            if (Class.doesExtend(tag, Tag)) {
                this.mapTag(tag);
                this.processTag(tag);
            } else {
                throw new Bug("ArgumentBug", {}, "parameter 'tag' must be an instance of Tag");
            }
        },

        /**
         * @param {function(Tag):boolean} filterMethod
         * @returns {List.<Tag>}
         */
        filterTags: function(filterMethod) {
            return /** @type {List.<Tag>} */this.tagList
                .stream()
                .filter(filterMethod)
                .collectSync(List);
        },

        /**
         * @param {Class} tagClass
         * @return {List.<Tag>}
         */
        getTagsByClass: function(tagClass) {
            return Collections.list(this.tagClassToTagListMap.get(tagClass));
        },

        /**
         * @param {*} reference
         * @return {List.<Tag>}
         */
        getTagsByReference: function(reference) {
            return Collections.list(this.referenceToTagListMap.get(reference));
        },

        /**
         * @param {Class} tagClass
         * @param {function(Tag)} tagProcessorFunction
         */
        registerTagProcessor: function(tagClass, tagProcessorFunction) {
            var tagProcessor = new TagProcessor(tagProcessorFunction);
            while (!Obj.equals(tagClass, Tag.getClass())) {
                var tagProcessorTypeList = this.tagClassToTagProcessorMap.get(tagClass);
                if (!tagProcessorTypeList) {
                    tagProcessorTypeList = Collections.list();
                    this.tagClassToTagProcessorMap.put(tagClass, tagProcessorTypeList);
                }
                tagProcessorTypeList.add(tagProcessor);
                tagClass = tagClass.getSuperclass();
            }
        },

        /**
         * @param {*} reference
         * @return {MetaTagger}
         */
        tag: function(reference) {
            return new MetaTagger(reference, this);
        },


        //-------------------------------------------------------------------------------
        // Private Methods
        //-------------------------------------------------------------------------------

        /**
         * @private
         * @param {Tag} tag
         */
        mapTag: function(tag) {
            var tagClass            = tag.getClass();
            var baseClassProcessed  = false;
            while (!baseClassProcessed) {
                if (Obj.equals(tagClass, Tag.getClass())) {
                    baseClassProcessed = true;
                }
                var tagList = this.tagClassToTagListMap.get(tagClass);
                if (!tagList) {
                    tagList = Collections.list();
                    this.tagClassToTagListMap.put(tagClass, tagList);
                }
                tagList.add(tag);
                tagClass = tagClass.getSuperclass();
            }
            var tagReferenceList = this.referenceToTagListMap.get(tag.getTagReference());
            if (!tagReferenceList) {
                tagReferenceList = Collections.list();
                this.referenceToTagListMap.put(tag.getTagReference(), tagReferenceList);
            }
            tagReferenceList.add(tag);
        },

        /**
         * @private
         * @param {Tag} tag
         */
        processTag: function(tag) {
            var tagClass = tag.getClass();
            var baseClassProcessed  = false;
            while (!baseClassProcessed) {
                if (Obj.equals(tagClass, Tag.getClass())) {
                    baseClassProcessed = true;
                }
                var tagProcessorTypeList = this.tagClassToTagProcessorMap.get(tagClass);
                if (tagProcessorTypeList) {
                    tagProcessorTypeList.forEach(function(tagProcessor) {
                        tagProcessor.process(tag);
                    });
                }
                tagClass = tagClass.getSuperclass();
            }
        }
    });


    //-------------------------------------------------------------------------------
    // Exports
    //-------------------------------------------------------------------------------

    bugpack.export('bugmeta.MetaContext', MetaContext);
});
