// Copyright 2002-2013, University of Colorado Boulder

/**
 * main Model container for chamber pool screen.
 *
 * @author Vasily Shakhov (Mlearner)
 */
define( function( require ) {
  'use strict';

  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var UnderPressureModel = require( 'common/model/UnderPressureModel' );
  var LinearFunction = require( 'DOT/LinearFunction' );


  function ChamberPoolModel( width, height ) {
    var self = this;

    //constants, from java model
    //The entire apparatus is this tall
    this.MAX_HEIGHT = 3; // meters

    this.DEFAULT_HEIGHT = 2.5; //meters, without load

    //The size of the passage between the chambers
    var PASSAGE_SIZE = 0.5;

    //Width of the right opening to the air
    var RIGHT_OPENING_WIDTH = 2.5;

    //Width of the left opening to the air
    var LEFT_OPENING_WIDTH = 0.5;

    //Use the length ratio instead of area ratio because the quadratic factor makes it too hard to see the water move on the right, and decreases the pressure effect too much to see it
    var LENGTH_RATIO = RIGHT_OPENING_WIDTH / LEFT_OPENING_WIDTH;

    //Height of each chamber, physics not working properly to vary these independently
    var CHAMBER_HEIGHT = 1.25;

    //from mockup
    //left chamber start x
    var LEFT_CHAMBER_X = 0.5;
    var LEFT_CHAMBER_WIDTH = 3;

    //right(bottom) chamber start x
    var RIGHT_CHAMBER_X = 5.5;
    var RIGHT_CHAMBER_WIDTH = 1.25;


    UnderPressureModel.call( this, width, height );



    this.poolDimensions = {
      leftChamber: {
        x1: LEFT_CHAMBER_X,
        y1: self.skyGroundBoundY + self.MAX_HEIGHT - CHAMBER_HEIGHT,
        x2: LEFT_CHAMBER_X + LEFT_CHAMBER_WIDTH,
        y2: self.skyGroundBoundY + self.MAX_HEIGHT
      },
      rightChamber: {
        x1: RIGHT_CHAMBER_X,
        y1: self.skyGroundBoundY + self.MAX_HEIGHT - CHAMBER_HEIGHT,
        x2: RIGHT_CHAMBER_X + RIGHT_CHAMBER_WIDTH,
        y2: self.skyGroundBoundY + self.MAX_HEIGHT
      },
      horizontalPassage: {
        x1: LEFT_CHAMBER_X + LEFT_CHAMBER_WIDTH,
        y1: self.skyGroundBoundY + self.MAX_HEIGHT - PASSAGE_SIZE * 3 / 2,
        x2: RIGHT_CHAMBER_X,
        y2: self.skyGroundBoundY + self.MAX_HEIGHT - PASSAGE_SIZE / 2
      },
      leftOpening: {
        x1: LEFT_CHAMBER_X + LEFT_CHAMBER_WIDTH / 2 - LEFT_OPENING_WIDTH / 2,
        y1: self.skyGroundBoundY,
        x2: LEFT_CHAMBER_X + LEFT_CHAMBER_WIDTH / 2 + LEFT_OPENING_WIDTH / 2,
        y2: self.skyGroundBoundY + self.MAX_HEIGHT - CHAMBER_HEIGHT
      },
      rightOpening: {
        x1: RIGHT_CHAMBER_X + RIGHT_CHAMBER_WIDTH / 2 - RIGHT_OPENING_WIDTH / 2,
        y1: self.skyGroundBoundY,
        x2: RIGHT_CHAMBER_X + RIGHT_CHAMBER_WIDTH / 2 + RIGHT_OPENING_WIDTH / 2,
        y2: self.skyGroundBoundY + self.MAX_HEIGHT - CHAMBER_HEIGHT
      }
    };

  }

  return inherit( UnderPressureModel, ChamberPoolModel );
} );