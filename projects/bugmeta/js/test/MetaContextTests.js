/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugmeta may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@TestFile

//@Require('Class')
//@Require('TypeUtil')
//@Require('bugmeta.Tag')
//@Require('bugmeta.BugMeta')
//@Require('bugmeta.MetaContext')
//@Require('bugunit.TestTag')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Class                   = bugpack.require('Class');
    var TypeUtil                = bugpack.require('TypeUtil');
    var Tag              = bugpack.require('bugmeta.Tag');
    var BugMeta                 = bugpack.require('bugmeta.BugMeta');
    var MetaContext             = bugpack.require('bugmeta.MetaContext');
    var TestTag          = bugpack.require('bugunit.TestTag');


    //-------------------------------------------------------------------------------
    // Simplify References
    //-------------------------------------------------------------------------------

    var bugmeta                 = BugMeta.context();
    var test                    = TestTag.test;


    //-------------------------------------------------------------------------------
    // Declare Tests
    //-------------------------------------------------------------------------------

    var metaContextInstantiationTest = {

        //-------------------------------------------------------------------------------
        // Setup Test
        //-------------------------------------------------------------------------------

        setup: function(test) {
            this.testMetaContext = new MetaContext();
        },

        //-------------------------------------------------------------------------------
        // Run Test
        //-------------------------------------------------------------------------------

        test: function(test) {
            test.assertTrue(Class.doesExtend(this.testMetaContext, MetaContext),
                "Assert that testMetaContext is an instance of MetaContext");
            test.assertTrue(this.testMetaContext.getTagMap().isEmpty(),
                "Assert tagMap starts empty");
            test.assertTrue(this.testMetaContext.getTagProcessorMap().isEmpty(),
                "Assert tagProcessorMap starts empty");
            test.assertTrue(this.testMetaContext.getReferenceToTagListMap().isEmpty(),
                "Assert referenceToTagListMap starts empty");
        }
    };

    var metaContextAddTagTest = {

        //-------------------------------------------------------------------------------
        // Setup Test
        //-------------------------------------------------------------------------------

        setup: function(test) {
            this.testTagType         = "testTagType";
            this.testTagReference    = Class.declare({});
            this.testTag             = new Tag(this.testTagType);
            this.testTag.setTagReference(this.testTagReference);
            this.testMetaContext            = new MetaContext();
            this.testMetaContext.addTag(this.testTag);
        },

        //-------------------------------------------------------------------------------
        // Run Test
        //-------------------------------------------------------------------------------

        test: function(test) {
            var tagsByTypeList = this.testMetaContext.getTagsByType(this.testTagType);
            test.assertTrue(tagsByTypeList.contains(this.testTag),
                "Assert that tagsTypeList returned the tag")
            var tagsByReferenceList = this.testMetaContext.getTagsByReference(this.testTagReference);
            test.assertTrue(tagsByReferenceList.contains(this.testTag),
                "Assert that tagsByReferenceList returned the tag")
        }
    };


    //-------------------------------------------------------------------------------
    // BugMeta
    //-------------------------------------------------------------------------------

    bugmeta.tag(metaContextInstantiationTest).with(
        test().name("MetaContext - instantiation Test")
    );
    bugmeta.tag(metaContextAddTagTest).with(
        test().name("MetaContext - #addTag Test")
    );
});
