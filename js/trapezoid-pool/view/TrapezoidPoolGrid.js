// Copyright 2002-2013, University of Colorado Boulder

/**
 * specific grid view for trapezoid pool
 * @author Vasily Shakhov (Mlearner)
 */
define( function( require ) {
  'use strict';
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Text = require( 'SCENERY/nodes/Text' );
  var GridLinesNode = require( 'UNDER_PRESSURE/common/view/GridLinesNode' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  var metersString = require( 'string!UNDER_PRESSURE/m' );
  var feetString = require( 'string!UNDER_PRESSURE/ft' );

  function SquarePoolGrid( model, mvt ) {
    var self = this;
    Node.call( this );

    var fontOptions = {
      font: new PhetFont( 12 )
    };

    this.addChild( new GridLinesNode( model.globalModel, mvt, 0, model.poolDimensions.leftChamber.y, mvt.viewToModelX( model.globalModel.width ), model.poolDimensions.leftChamber.y + model.poolDimensions.leftChamber.height + 0.3, {metersStep: 0.5} ) );

    var metersLabels = new Node();
    var metersText = new Text( '3' + metersString, _.extend( {
      x: mvt.modelToViewX( model.poolDimensions.rightChamber.centerTop + model.poolDimensions.rightChamber.widthBottom / 2 ) + 10,
      y: mvt.modelToViewY( model.globalModel.skyGroundBoundY + 3 ) + 17
    }, fontOptions ) );
    var backgroundRect = new Rectangle( 0, 0, metersText.width + 5, metersText.height + 5, 10, 10, {fill: '#67a257'} );
    backgroundRect.centerX = metersText.centerX;
    backgroundRect.centerY = metersText.centerY;
    metersLabels.addChild( backgroundRect );
    metersLabels.addChild( metersText );

    var feetLabels = new Node();
    var feetText = new Text( '10' + feetString, _.extend( {
      x: mvt.modelToViewX( model.poolDimensions.rightChamber.centerTop + model.poolDimensions.rightChamber.widthBottom / 2 ) + 10,
      y: mvt.modelToViewY( model.globalModel.skyGroundBoundY + model.globalModel.units.feetToMeters( 10 ) ) + 17
    }, fontOptions ) );
    backgroundRect = new Rectangle( 0, 0, feetText.width + 10, feetText.height + 5, 10, 10, {fill: '#67a257'} );
    backgroundRect.centerX = feetText.centerX;
    backgroundRect.centerY = feetText.centerY;
    feetLabels.addChild( backgroundRect );
    feetLabels.addChild( feetText );

    this.addChild( metersLabels );
    this.addChild( feetLabels );

    model.globalModel.measureUnitsProperty.link( function( value ) {
      var metersVisible = (value !== 'english');
      metersLabels.visible = metersVisible;
      feetLabels.visible = !metersVisible;
    } );

    model.globalModel.isGridVisibleProperty.link( function( value ) {
      self.visible = value;
    } );
  }

  return inherit( Node, SquarePoolGrid );
} );