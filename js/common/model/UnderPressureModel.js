// Copyright 2002-2013, University of Colorado Boulder

/**
 * top model for all screens,
 * all common properties and methods are placed here
 * @author Vasily Shakhov (Mlearner)
 */
define( function( require ) {
  'use strict';

  var Property = require( 'AXON/Property' );
  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Range = require( 'DOT/Range' );
  var WaterColorModel = require( "UNDER_PRESSURE/common/model/WaterColorModel" );
  var Units = require( "UNDER_PRESSURE/common/model/Units" );
  var LinearFunction = require( 'DOT/LinearFunction' );
  var Vector2 = require( 'DOT/Vector2' );

  var SceneModels = {
    SquarePoolModel: require( "square-pool/model/SquarePoolModel" ),
    TrapezoidPoolModel: require( "trapezoid-pool/model/TrapezoidPoolModel" ),
    ChamberPoolModel: require( "chamber-pool/model/ChamberPoolModel" )
  };

  //var ChamberPoolModel = require("chamber-pool/model/ChamberPoolModel");


  function UnderPressureModel( width, height ) {
    var self = this;

    this.scenes = ["Square", "Trapezoid", "Chamber"];


    this.MARS_GRAVITY = 3.71;
    this.JUPITER_GRAVITY = 24.92;
    this.GAZOLINE_DENSITY = 700;
    this.HONEY_DENSITY = 1420;
    this.WATER_DENSITY = 1000;

    this.MIN_PRESSURE = 0;
    this.MAX_PRESSURE = 300000;//kPa

    // dimensions of the model's space
    this.width = width;
    this.height = height;
    this.skyGroundBoundY = 3.14; // M

    //Constants for air pressure in Pascals, Pascals is SI, see http://en.wikipedia.org/wiki/Atmospheric_pressure
    this.EARTH_AIR_PRESSURE = 101325;
    this.EARTH_AIR_PRESSURE_AT_500_FT = 99490;

    this.pxToMetersRatio = 70; // 70px = 1 M

    this.gravityRange = new Range( this.MARS_GRAVITY, this.JUPITER_GRAVITY );
    this.fluidDensityRange = new Range( this.GAZOLINE_DENSITY, this.HONEY_DENSITY );

    PropertySet.call( this, {
        isAtmosphere: true,
        isRulerVisible: false,
        isGridVisible: true,
        measureUnits: "metric",
        gravity: 9.8,
        fluidDensity: self.WATER_DENSITY,
        leftDisplacement: 0, //displacement from default height, for chamber-pool
        currentScene: self.scenes[2],
        currentVolume: 0, //L, volume of liquid in currentScene
        rulerPosition: new Vector2( 2 * self.pxToMetersRatio, this.skyGroundBoundY * self.pxToMetersRatio ) // px
      }
    );

    this.sceneModels = {};
    this.scenes.forEach( function( name ) {
      self.sceneModels[name] = (new SceneModels[name + "PoolModel"]( self ));
    } );


    this.waterColorModel = new WaterColorModel( this );
    this.units = new Units();

    this.getStandardAirPressure = new LinearFunction( 0, this.units.feetToMeters( 500 ), this.EARTH_AIR_PRESSURE, this.EARTH_AIR_PRESSURE_AT_500_FT );

    this.barometersStatement = [];
    for ( var i = 0; i < 4; i++ ) {
      this.barometersStatement.push( new Property( 0 ) );
    }

    this.currentSceneProperty.link( function() {
      self.currentVolume = self.sceneModels[self.currentScene].volume;
    } );
  }

  return inherit( PropertySet, UnderPressureModel, {
    step: function( dt ) {
      this.sceneModels[this.currentScene].step( dt );
    },
    reset: function() {
      this.currentVolumeProperty.reset();
      this.isAtmosphereProperty.reset();
    },
    getAirPressure: function( height ) {
      if ( !this.isAtmosphere ) {
        return 0;
      }
      else {
        return this.getStandardAirPressure( this.skyGroundBoundY - height ) * this.gravity / 9.8;
      }
    },
    getWaterPressure: function( height ) {
      return height * this.gravity * this.fluidDensity;
    },
    getPressureAtCoords: function( x, y ) {
      return this.sceneModels[this.currentScene].getPressureAtCoords( x, y );
    }
  } );
} )
;