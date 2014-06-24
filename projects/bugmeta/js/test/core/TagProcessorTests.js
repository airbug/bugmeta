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
//@Require('bugdouble.BugDouble')
//@Require('bugmeta.BugMeta')
//@Require('bugmeta.TagProcessor')
//@Require('bugunit.TestTag')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var TypeUtil        = bugpack.require('TypeUtil');
    var BugDouble       = bugpack.require('bugdouble.BugDouble');
    var BugMeta         = bugpack.require('bugmeta.BugMeta');
    var TagProcessor    = bugpack.require('bugmeta.TagProcessor');
    var TestTag         = bugpack.require('bugunit.TestTag');


    //-------------------------------------------------------------------------------
    // Simplify References
    //-------------------------------------------------------------------------------

    var bugmeta         = BugMeta.context();
    var spyOnFunction   = BugDouble.spyOnFunction;
    var test            = TestTag.test;


    //-------------------------------------------------------------------------------
    // Declare Tests
    //-------------------------------------------------------------------------------

    var tagProcessorInstantiationTest = {

        //-------------------------------------------------------------------------------
        // Setup Test
        //-------------------------------------------------------------------------------

        setup: function(test) {
            this.testProcessorFunction      = function(tag) {};
            this.testTagProcessor    = new TagProcessor(this.testProcessorFunction);
        },

        //-------------------------------------------------------------------------------
        // Run Test
        //-------------------------------------------------------------------------------

        test: function(test) {
            test.assertEqual(this.testTagProcessor.getTagProcessorFunction(), this.testProcessorFunction,
                "Assert #getTagProcessorFunction returns testProcessorFunction");
        }
    };

    var tagProcessorInstantiationMissingProcessorFunctionTest = {

        //-------------------------------------------------------------------------------
        // Setup Test
        //-------------------------------------------------------------------------------

        setup: function(test) {

        },

        //-------------------------------------------------------------------------------
        // Run Test
        //-------------------------------------------------------------------------------

        test: function(test) {
            var _this = this;
            test.assertThrows(function() {
                var tagProcessor = new TagProcessor();
            }, "Assert instantiating an TagProcessor without processorFunction parameter throws an Error");
        }
    };

    var tagProcessorProcessTagTest = {

        //-------------------------------------------------------------------------------
        // Setup Test
        //-------------------------------------------------------------------------------

        setup: function(test) {
            var _this                       = this;
            this.testTag             = {};
            this.testProcessorFunction      = function(tag) {
                test.assertEqual(tag, _this.testTag,
                    "Assert tag received in processorFunction is testTag");
            };
            this.testProcessorFunctionSpy   = spyOnFunction(this.testProcessorFunction);
            this.testTagProcessor    = new TagProcessor(this.testProcessorFunctionSpy);
        },

        //-------------------------------------------------------------------------------
        // Run Test
        //-------------------------------------------------------------------------------

        test: function(test) {
            this.testTagProcessor.process(this.testTag);
            test.assertTrue(this.testProcessorFunctionSpy.wasCalled(),
                "Assert processorFunction was called");
        }
    };


    //-------------------------------------------------------------------------------
    // BugMeta
    //-------------------------------------------------------------------------------

    bugmeta.tag(tagProcessorInstantiationTest).with(
        test().name("TagProcessor - instantiation Test")
    );
    bugmeta.tag(tagProcessorInstantiationMissingProcessorFunctionTest).with(
        test().name("TagProcessor - instantiation missing processorFunction Test")
    );
    bugmeta.tag(tagProcessorProcessTagTest).with(
        test().name("TagProcessor - #processTag Test")
    );
});
