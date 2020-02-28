// Copyright 2013-2020, University of Colorado Boulder

/**
 * Main file for the Under Pressure simulation.
 */

import UnderPressureScreen from '../../fluid-pressure-and-flow/js/under-pressure/UnderPressureScreen.js';
import Sim from '../../joist/js/Sim.js';
import SimLauncher from '../../joist/js/SimLauncher.js';
import underPressureStrings from './under-pressure-strings.js';

const underPressureTitleString = underPressureStrings[ 'under-pressure' ].title;

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