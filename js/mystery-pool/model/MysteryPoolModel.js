// Copyright 2002-2013, University of Colorado Boulder

/**
 * main Model container for mystery pool screen. Based on square pool.
 *
 * @author Vasily Shakhov (Mlearner)
 */
define( function( require ) {
  'use strict';

  var inherit = require( 'PHET_CORE/inherit' );
  var SquarePoolModel = require( 'UNDER_PRESSURE/square-pool/model/SquarePoolModel' );

  function MysteryPoolModel( globalModel ) {
    var self = this;
    SquarePoolModel.call( this, globalModel );

    //random gravity and density for mystery pool
    this.random = {
      gravity: Math.round( self.globalModel.gravityRange.min + Math.random() * self.globalModel.gravityRange.getLength() ),
      fluidDensity: Math.round( self.globalModel.fluidDensityRange.min + Math.random() * self.globalModel.fluidDensityRange.getLength() )
    };

    this.globalModel.currentSceneProperty.link( function( scene ) {
      if ( scene === "Mystery" ) {
        var choice = self.globalModel.mysteryChoice;
        self.globalModel[choice] = self.random[choice];
      }
    } );

    this.globalModel.mysteryChoiceProperty.link( function( choice ) {
      if ( self.globalModel.currentScene === "Mystery" ) {
        self.globalModel[choice] = self.random[choice];
      }
    } );

  }

  return inherit( SquarePoolModel, MysteryPoolModel );
} );