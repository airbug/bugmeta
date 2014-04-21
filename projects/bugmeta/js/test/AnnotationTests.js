//-------------------------------------------------------------------------------
// Annotations
//-------------------------------------------------------------------------------

//@TestFile

//@Require('TypeUtil')
//@Require('bugmeta.Annotation')
//@Require('bugmeta.BugMeta')
//@Require('bugunit.TestAnnotation')


//-------------------------------------------------------------------------------
// Context
//-------------------------------------------------------------------------------

require('bugpack').context("*", function(bugpack) {

    //-------------------------------------------------------------------------------
    // BugPack
    //-------------------------------------------------------------------------------

    var TypeUtil                = bugpack.require('TypeUtil');
    var Annotation              = bugpack.require('bugmeta.Annotation');
    var BugMeta                 = bugpack.require('bugmeta.BugMeta');
    var TestAnnotation          = bugpack.require('bugunit.TestAnnotation');


    //-------------------------------------------------------------------------------
    // Simplify References
    //-------------------------------------------------------------------------------

    var bugmeta                 = BugMeta.context();
    var test                    = TestAnnotation.test;


    //-------------------------------------------------------------------------------
    // Declare Tests
    //-------------------------------------------------------------------------------

    var annotationInstantiationTest = {

        //-------------------------------------------------------------------------------
        // Setup Test
        //-------------------------------------------------------------------------------

        setup: function(test) {
            this.testAnnotationType     = "testAnnotationType";
            this.testAnnotation         = new Annotation(this.testAnnotationType);
        },

        //-------------------------------------------------------------------------------
        // Run Test
        //-------------------------------------------------------------------------------

        test: function(test) {
            test.assertEqual(this.testAnnotation.getAnnotationType(), this.testAnnotationType,
                "Assert #getAnnotationType returns 'testAnnotationType'");
            test.assertTrue(TypeUtil.isNull(this.testAnnotation.getAnnotationReference()),
                "Assert #getAnnotationReference returns null");
        }
    };

    var annotationSetAnnotationReferenceTest = {

        //-------------------------------------------------------------------------------
        // Setup Test
        //-------------------------------------------------------------------------------

        setup: function(test) {
            this.testAnnotationType         = "testAnnotationType";
            this.testAnnotationReference    = {};
            this.testAnnotation             = new Annotation(this.testAnnotationType);
        },

        //-------------------------------------------------------------------------------
        // Run Test
        //-------------------------------------------------------------------------------

        test: function(test) {
            this.testAnnotation.setAnnotationReference(this.testAnnotationReference);
            test.assertEqual(this.testAnnotation.getAnnotationReference(), this.testAnnotationReference,
                "Assert #getAnnotationReference returns 'testAnnotationReference'");
        }
    };


    //-------------------------------------------------------------------------------
    // BugMeta
    //-------------------------------------------------------------------------------

    bugmeta.annotate(annotationInstantiationTest).with(
        test().name("Annotation - instantiation Test")
    );
    bugmeta.annotate(annotationSetAnnotationReferenceTest).with(
        test().name("Annotation - #setAnnotationReference Test")
    );
});
