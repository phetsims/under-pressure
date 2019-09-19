// Copyright 2013-2017, University of Colorado Boulder

/**
 * Main file for the Under Pressure simulation.
 */
define( require => {
  'use strict';

  // modules
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const UnderPressureScreen = require( 'FLUID_PRESSURE_AND_FLOW/under-pressure/UnderPressureScreen' );

  // strings
  const underPressureTitleString = require( 'string!UNDER_PRESSURE/under-pressure.title' );

  const simOptions = {
    credits: {
      leadDesign: 'Sam Reid',
      softwareDevelopment: 'John Blanco, Aadish Gupta, Sam Reid',
      team: 'Bryce Gruneich, Trish Loeblein, Ariel Paul, Kathy Perkins, Rachel Pepper, Noah Podolefsky',
      qualityAssurance: 'Steele Dalton, Amanda Davis, Bryce Griebenow, Elise Morgan, Ben Roberts',
      thanks: 'Thanks to Mobile Learner Labs and Actual Concepts for working with the PhET development team to ' +
              'convert this simulation to HTML5.'
    }
  };

  SimLauncher.launch( function() {
    const sim = new Sim( underPressureTitleString, [ new UnderPressureScreen() ], simOptions );
    sim.start();
  } );
} );
