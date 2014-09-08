// Copyright 2002-2013, University of Colorado Boulder

/**
 * top background Node
 * contains atmosphere and earth
 * @author Vasily Shakhov (Mlearner)
 */
define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  function BackgroundNode( model, modelViewTransform ) {
    Node.call( this );

    //sky
    var sky = new Rectangle( -2000, -1000, 5000, 1000 + modelViewTransform.modelToViewY( model.skyGroundBoundY ) );

    this.addChild( sky );

    model.isAtmosphereProperty.link( function( isAtmosphere ) {
      if ( isAtmosphere ) {
        sky.fill = new LinearGradient( 0, 0, 0, modelViewTransform.modelToViewY( model.skyGroundBoundY ) )
          .addColorStop( 0, '#c4e6f5' )
          .addColorStop( 1, '#daedfa' );
      }
      else {
        sky.fill = 'black';
      }
    } );

    //earth
    this.addChild( new Rectangle( -2000, modelViewTransform.modelToViewY( model.skyGroundBoundY ), 5000, model.height - modelViewTransform.modelToViewY( model.skyGroundBoundY ) + 1000, {
      fill: '#93774c'
    } ) );

  }

  return inherit( Node, BackgroundNode, {} );
} );