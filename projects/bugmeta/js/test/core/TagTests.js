/*
 * Copyright (c) 2014 airbug inc. http://airbug.com
 *
 * bugmeta may be freely distributed under the MIT license.
 */


//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@TestFile

//@Require('TypeUtil')
//@Require('bugmeta.BugMeta')
//@Require('bugmeta.Tag')
//@Require('bugunit.TestTag')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var TypeUtil    = bugpack.require('TypeUtil');
    var BugMeta     = bugpack.require('bugmeta.BugMeta');
    var Tag         = bugpack.require('bugmeta.Tag');
    var TestTag     = bugpack.require('bugunit.TestTag');


    //-------------------------------------------------------------------------------
    // Simplify References
    //-------------------------------------------------------------------------------

    var bugmeta     = BugMeta.context();
    var test        = TestTag.test;


    //-------------------------------------------------------------------------------
    // Declare Tests
    //-------------------------------------------------------------------------------

    var tagInstantiationTest = {

        //-------------------------------------------------------------------------------
        // Setup Test
        //-------------------------------------------------------------------------------

        setup: function(test) {
            this.testTagName     = "testTagName";
            this.testTag         = new Tag(this.testTagName);
        },

        //-------------------------------------------------------------------------------
        // Run Test
        //-------------------------------------------------------------------------------

        test: function(test) {
            test.assertEqual(this.testTag.getTagName(), this.testTagName,
                "Assert #getTagName returns 'testTagName'");
            test.assertTrue(TypeUtil.isNull(this.testTag.getTagReference()),
                "Assert #getTagReference returns null");
        }
    };

    var tagSetTagReferenceTest = {

        //-------------------------------------------------------------------------------
        // Setup Test
        //-------------------------------------------------------------------------------

        setup: function(test) {
            this.testTagName         = "testTagName";
            this.testTagReference    = {};
            this.testTag             = new Tag(this.testTagName);
        },

        //-------------------------------------------------------------------------------
        // Run Test
        //-------------------------------------------------------------------------------

        test: function(test) {
            this.testTag.setTagReference(this.testTagReference);
            test.assertEqual(this.testTag.getTagReference(), this.testTagReference,
                "Assert #getTagReference returns 'testTagReference'");
        }
    };


    //-------------------------------------------------------------------------------
    // BugMeta
    //-------------------------------------------------------------------------------

    bugmeta.tag(tagInstantiationTest).with(
        test().name("Tag - instantiation Test")
    );
    bugmeta.tag(tagSetTagReferenceTest).with(
        test().name("Tag - #setTagReference Test")
    );
});
