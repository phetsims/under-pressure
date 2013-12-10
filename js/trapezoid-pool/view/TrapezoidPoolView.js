// Copyright 2002-2013, University of Colorado Boulder

/**
 * main ScreenView container for trapezoid pool.
 *
 * @author Vasily Shakhov (Mlearner)
 */
define( function( require ) {
  "use strict";
  var inherit = require( "PHET_CORE/inherit" );
  var CommonNode = require( "UNDER_PRESSURE/common/view/CommonNode" );
  var ScreenView = require( "JOIST/ScreenView" );
  var TrapezoidPoolBack = require( "trapezoid-pool/view/TrapezoidPoolBack" );
  var FaucetFluidNode = require( "UNDER_PRESSURE/common/view/FaucetFluidNode" );
  var TrapezoidPoolWaterNode = require( "trapezoid-pool/view/TrapezoidPoolWaterNode" );
  var BarometersContainer = require( "UNDER_PRESSURE/common/view/BarometersContainer" );


  function TrapezoidPoolView( model ) {
    ScreenView.call( this, { renderer: "svg" } );

    //sky, earth and controls
    this.addChild( new CommonNode( model ) );

    //pool
    this.addChild( new TrapezoidPoolBack( model ) );

    //fluids
    this.addChild( new FaucetFluidNode( model.inputFaucet, model, (model.poolDimensions.bottomChamber.y2 - model.inputFaucet.location.y) * model.pxToMetersRatio ) );
    this.addChild( new FaucetFluidNode( model.outputFaucet, model, 1000 ) );

    //water
    this.addChild( new TrapezoidPoolWaterNode( model ) );

    //barometers
    this.addChild(new BarometersContainer(model));

  }

  return inherit( ScreenView, TrapezoidPoolView );
} );