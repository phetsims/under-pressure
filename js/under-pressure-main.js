// Copyright 2013-2015, University of Colorado Boulder

/**
 * Main file for the Under Pressure simulation.
 */
define( function( require ) {
  'use strict';

  // modules
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var UnderPressureScreen = require( 'FLUID_PRESSURE_AND_FLOW/under-pressure/UnderPressureScreen' );

  // strings
  var underPressureTitleString = require( 'string!UNDER_PRESSURE/under-pressure.title' );

  var simOptions = {
    credits: {
      leadDesign: 'Sam Reid',
      softwareDevelopment: 'John Blanco, Aadish Gupta, Sam Reid',
      team: 'Bryce Gruneich, Trish Loeblein, Ariel Paul, Kathy Perkins, Rachel Pepper, Noah Podolefsky',
      qualityAssurance: 'Steele Dalton, Bryce Griebenow, Elise Morgan, Ben Roberts',
      thanks: 'Thanks to Mobile Learner Labs and Actual Concepts for working with the PhET development team\nto convert this simulation to HTML5.'
    }
  };

  // Appending '?dev' to the URL will enable developer-only features.
  if ( phet.chipper.getQueryParameter( 'dev' ) ) {
    simOptions = _.extend( {
      // add dev-specific options here
    }, simOptions );
  }

  SimLauncher.launch( function() {
    var sim = new Sim( underPressureTitleString, [ new UnderPressureScreen() ], simOptions );
    sim.start();
  } );
} );
