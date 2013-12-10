// Copyright 2002-2013, University of Colorado Boulder

/**
 * main Model container for trapezoid pool screen.
 *
 * @author Vasily Shakhov (Mlearner)
 */
define( function( require ) {
  'use strict';

  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Vector2 = require( 'DOT/Vector2' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var PoolWithFaucetsModel = require( 'UNDER_PRESSURE/common/model/PoolWithFaucetsModel' );
  var FaucetModel = require( 'UNDER_PRESSURE/common/model/FaucetModel' );
  var LinearFunction = require( 'DOT/LinearFunction' );


  function TrapezoidPoolModel( width, height ) {
    var model = this;

    //constants, from java model
    this.MAX_HEIGHT = 3; // meters
    this.MAX_VOLUME = model.MAX_HEIGHT; // Liters
    var WIDTHATTOP = 0.785; //meters,
    var WIDTHATBOTTOM = 3.57; //meters,
    var LEFTCHAMBERTOPCENTER = 3; //meters,
    var SEPARATION = 3.5;//Between centers

    this.inputFaucet = new FaucetModel( new Vector2( 3, 2.7 ), 1, 0.42 );
    this.outputFaucet = new FaucetModel( new Vector2( 7.75, 6.60 ), 1, 0.3 );

    PoolWithFaucetsModel.call( this, width, height );

    this.poolDimensions = {
      leftChamber: {
        centerTop: LEFTCHAMBERTOPCENTER,
        widthTop: WIDTHATTOP,
        widthBottom: WIDTHATBOTTOM,
        y: model.skyGroundBoundY,
        height: model.MAX_HEIGHT,
        leftBorderFunction: new LinearFunction( 0, model.MAX_HEIGHT, LEFTCHAMBERTOPCENTER - WIDTHATBOTTOM / 2, LEFTCHAMBERTOPCENTER - WIDTHATTOP / 2 ),
        rightBorderFunction: new LinearFunction( 0, model.MAX_HEIGHT, LEFTCHAMBERTOPCENTER + WIDTHATBOTTOM / 2, LEFTCHAMBERTOPCENTER + WIDTHATTOP / 2 )
      },
      rightChamber: {
        centerTop: LEFTCHAMBERTOPCENTER + SEPARATION,
        widthTop: WIDTHATBOTTOM,
        widthBottom: WIDTHATTOP,
        y: model.skyGroundBoundY,
        height: model.MAX_HEIGHT,
        leftBorderFunction: new LinearFunction( 0, model.MAX_HEIGHT, LEFTCHAMBERTOPCENTER + SEPARATION - WIDTHATTOP / 2, LEFTCHAMBERTOPCENTER + SEPARATION - WIDTHATBOTTOM / 2 ),
        rightBorderFunction: new LinearFunction( 0, model.MAX_HEIGHT, LEFTCHAMBERTOPCENTER + SEPARATION + WIDTHATTOP / 2, LEFTCHAMBERTOPCENTER + SEPARATION + WIDTHATBOTTOM / 2 )
      },
      bottomChamber: {
        x1: LEFTCHAMBERTOPCENTER + WIDTHATBOTTOM / 2,
        y1: model.skyGroundBoundY + model.MAX_HEIGHT - 0.21,
        x2: LEFTCHAMBERTOPCENTER + SEPARATION - WIDTHATTOP / 2,
        y2: model.skyGroundBoundY + model.MAX_HEIGHT
      }
    };


    //key coordinates of complex figure
    this.verticles = {
      x1top: model.poolDimensions.leftChamber.centerTop - model.poolDimensions.leftChamber.widthTop / 2,
      x2top: model.poolDimensions.leftChamber.centerTop + model.poolDimensions.leftChamber.widthTop / 2,
      x3top: model.poolDimensions.rightChamber.centerTop - model.poolDimensions.rightChamber.widthTop / 2,
      x4top: model.poolDimensions.rightChamber.centerTop + model.poolDimensions.rightChamber.widthTop / 2,

      x1middle: model.poolDimensions.leftChamber.rightBorderFunction( model.poolDimensions.bottomChamber.y2 - model.poolDimensions.bottomChamber.y1 ),
      x2middle: model.poolDimensions.rightChamber.leftBorderFunction( model.poolDimensions.bottomChamber.y2 - model.poolDimensions.bottomChamber.y1 ),

      x1bottom: model.poolDimensions.leftChamber.centerTop - model.poolDimensions.leftChamber.widthBottom / 2,
      x2bottom: model.poolDimensions.leftChamber.centerTop + model.poolDimensions.leftChamber.widthBottom / 2,
      x3bottom: model.poolDimensions.rightChamber.centerTop - model.poolDimensions.rightChamber.widthBottom / 2,
      x4bottom: model.poolDimensions.rightChamber.centerTop + model.poolDimensions.rightChamber.widthBottom / 2,

      ymiddle: model.poolDimensions.bottomChamber.y1
    }

  }

  return inherit( PoolWithFaucetsModel, TrapezoidPoolModel, {
    getPressureAtCoords: function( x, y ) {
      var pressure = "";

      x = x / this.pxToMetersRatio;
      y = y / this.pxToMetersRatio;

      if ( y < this.skyGroundBoundY ) {
        pressure = this.getAirPressure( y );
      }
      else if ( this.isPointInsidePool( x, y ) ) {
        //inside pool
        var waterHeight = y - (this.poolDimensions.bottomChamber.y2 - this.MAX_HEIGHT * this.volume / this.MAX_VOLUME);// water height above barometer
        if ( waterHeight <= 0 ) {
          pressure = this.getAirPressure( y );
        }
        else {
          pressure = this.getAirPressure( y - waterHeight ) + this.getWaterPressure( waterHeight );
        }
      }

      return pressure;
    },
    isPointInsidePool: function( x, y ) {
      var isInside = false;
      if ( x > this.poolDimensions.bottomChamber.x1 && x < this.poolDimensions.bottomChamber.x2 && y > this.poolDimensions.bottomChamber.y1 && y < this.poolDimensions.bottomChamber.y2 ) {
        //inside bottom chamber
        isInside = true;
      }
      else {
        var y_above_pool = this.poolDimensions.bottomChamber.y2 - y;
        if ( y_above_pool > 0 ) {
          var x1 = this.poolDimensions.leftChamber.leftBorderFunction( y_above_pool ),
            x2 = this.poolDimensions.leftChamber.rightBorderFunction( y_above_pool ),
            x3 = this.poolDimensions.rightChamber.leftBorderFunction( y_above_pool ),
            x4 = this.poolDimensions.rightChamber.rightBorderFunction( y_above_pool );
          console.log( x1, x2, x3, x4 );
          if ( x1 < x && x < x2 ) {
            //inside left chamber
            isInside = true;
          }
          else if ( x3 < x && x < x4 ) {
            //inside right chamber
            isInside = true;
          }
        }
      }
      return isInside;
    }
  } );
} );