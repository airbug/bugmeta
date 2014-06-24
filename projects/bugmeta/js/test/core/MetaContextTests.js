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
//@Require('bugmeta.BugMeta')
//@Require('bugmeta.MetaContext')
//@Require('bugmeta.Tag')
//@Require('bugunit.TestTag')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var Class           = bugpack.require('Class');
    var TypeUtil        = bugpack.require('TypeUtil');
    var BugMeta         = bugpack.require('bugmeta.BugMeta');
    var MetaContext     = bugpack.require('bugmeta.MetaContext');
    var Tag             = bugpack.require('bugmeta.Tag');
    var TestTag         = bugpack.require('bugunit.TestTag');


    //-------------------------------------------------------------------------------
    // Simplify References
    //-------------------------------------------------------------------------------

    var bugmeta         = BugMeta.context();
    var test            = TestTag.test;


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
            test.assertTrue(this.testMetaContext.getTagClassToTagListMap().isEmpty(),
                "Assert tagClassToTagListMap starts empty");
            test.assertTrue(this.testMetaContext.getTagClassToTagProcessorMap().isEmpty(),
                "Assert tagClassToTagProcessorMap starts empty");
            test.assertTrue(this.testMetaContext.getReferenceToTagListMap().isEmpty(),
                "Assert referenceToTagListMap starts empty");
        }
    };

    var metaContextAddTagTest = {

        //-------------------------------------------------------------------------------
        // Setup Test
        //-------------------------------------------------------------------------------

        setup: function(test) {
            this.testTagName        = "testTagName";
            this.testTagClass       = Tag.getClass();
            this.testTagReference   = Class.declare({});
            this.testTag            = new Tag(this.testTagName);
            this.testTag.setTagReference(this.testTagReference);
            this.testMetaContext            = new MetaContext();
            this.testMetaContext.addTag(this.testTag);
        },

        //-------------------------------------------------------------------------------
        // Run Test
        //-------------------------------------------------------------------------------

        test: function(test) {
            var tagsByTypeList = this.testMetaContext.getTagsByClass(this.testTagClass);
            test.assertTrue(tagsByTypeList.contains(this.testTag),
                "Assert that tagsTypeList contains the Tag");
            var tagsByReferenceList = this.testMetaContext.getTagsByReference(this.testTagReference);
            test.assertTrue(tagsByReferenceList.contains(this.testTag),
                "Assert that tagsByReferenceList returned the tag");
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
