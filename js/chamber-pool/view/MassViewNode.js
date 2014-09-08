// Copyright 2002-2013, University of Colorado Boulder

/**
 * view for single mass
 * @author Vasily Shakhov (Mlearner)
 */
define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Shape = require( 'KITE/Shape' );
  var Image = require( 'SCENERY/nodes/Image' );
  var SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  var Vector2 = require( 'DOT/Vector2' );
  var Text = require( 'SCENERY/nodes/Text' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  var massImg = require( 'image!UNDER_PRESSURE/images/mass.png' );
  var massLabelPattern = require( 'string!UNDER_PRESSURE/massLabelPattern' );

  /**
   * @param {MassModel} massModel of simulation
   * @param {ChamberPoolModel} model of simulation
   * @param {ModelViewTransform2} modelViewTransform , Transform between model and view coordinate frames
   * @param {Bounds2} dragBounds - bounds that define where the barometer may be dragged
   * @constructor
   */
  function MassViewNode( massModel, model, modelViewTransform, dragBounds ) {
    var self = this;

    Node.call( this, {
      cursor: 'pointer'
    } );

    var width = modelViewTransform.modelToViewX( massModel.width ),
      height = modelViewTransform.modelToViewY( massModel.height );

    this.addChild( new Image( massImg, {
      clipArea: Shape.rect( 0, 0, width, height ),
      x: -width / 2,
      y: -height / 2
    } ) );

    //image border
    this.addChild( new Rectangle( -width / 2, -height / 2, width, height, {
      stroke: '#918e8e',
      lineWidth: 1
    } ) );

    this.addChild( new Text( StringUtils.format( massLabelPattern, massModel.mass ), { centerY: 0, centerX: 0, font: new PhetFont( 9 ), fill: 'black', pickable: false, 'fontWeight': 'bold'} ) );

    var massClickOffset = {x: 0, y: 0};
    var massDragHandler = new SimpleDragHandler( {
      //When dragging across it in a mobile device, pick it up
      allowTouchSnag: true,
      start: function( event ) {
        massClickOffset.x = self.globalToParentPoint( event.pointer.point ).x - event.currentTarget.x;
        massClickOffset.y = self.globalToParentPoint( event.pointer.point ).y - event.currentTarget.y;
        self.moveToFront();
        massModel.isDragging = true;
      },
      end: function() {
        var newPosition = self.translation;
        newPosition.x = modelViewTransform.viewToModelX( newPosition.x );
        newPosition.y = modelViewTransform.viewToModelY( newPosition.y );
        massModel.position = newPosition;
        massModel.isDragging = false;
      },
      //Translate on drag events
      drag: function( event ) {
        var point = self.globalToParentPoint( event.pointer.point ).subtract( massClickOffset );
        self.translation = dragBounds.getClosestPoint( point.x, point.y );
      }
    } );

    this.addInputListener( massDragHandler );

    massModel.positionProperty.link( function( position ) {
      if ( !model.isDragging ) {
        self.translation = new Vector2( modelViewTransform.modelToViewX( position.x ), modelViewTransform.modelToViewY( position.y ) );
      }
    } );
  }

  return inherit( Node, MassViewNode );
} );