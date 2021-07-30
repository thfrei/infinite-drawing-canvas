// import * as fabric from '../dist/assets/fabric.4.2.0.custom';
import { fabric } from 'fabric';
import 'hammerjs';
import '../dist/assets/jquery.hammer.js';

import * as _throttle from './lib/lodash.throttle.js';
import * as _debounce from './lib/lodash.debounce.js';
// import sleep from './lib/sleep.js';
import deleteIcon from './lib/deleteIcon.js';

var img = document.createElement('img');
img.src = deleteIcon;

/**
 * Infinite Drawing Canvas
 */
class IDC {
  $canvas: fabric.Canvas;
  $parent: JQuery;
  $canvasContainer: JQuery;

  canvasElement: any;

  isDragging: boolean;
  selection: boolean;
  lastPosX: number;
  lastPosY: number;
  startPosX: number;
  startPosY: number;
  lastScale: number;
  fonts: Array<String>;
  width: number;
  height: number;
  drawWithTouch: boolean;
  scaledWidth: number;
  scaledHeight: number;
  activatePlaceTextBox: boolean;

  hammer: any;

  constructor($canvas, $parent, $canvasContainer) {

  }


  deleteObject(eventData, target) {
    var canvas = target.canvas;
    canvas.remove(target);
    canvas.requestRenderAll();
  }

  initFabric() {
    this.overrideFabric();

    const canvasElement = this.$canvas.get(0); // fabric.Canvas requires HTMLElement
    this.canvasElement = canvasElement;

    const self = this;
    const canvas = new fabric.Canvas(canvasElement, {
      isDrawingMode: false,
      allowTouchScrolling: true,
      transparentCorners: false,
    });
    this.$canvas = canvas;
    // fabric.Object.prototype.transparentCorners = false;

    // Resizing
    // FIXME: canvas should only enlarge, maybe we dont even need, since canvas will scroll behind parent!
    // const canvasNote = this.$parent.get(0);
    // new ResizeObserver(_throttle(this.resizeCanvas, 200)).observe(canvasNote); // this leads to a eraserbrush remaining...

    // Handle different input devices: Touch (Finger), Pen, Mouse
    canvas.on('mouse:down:before', this.handlePointerEventBefore);

    this.hammer = new Hammer.Manager(canvas.upperCanvasEl);
    var pinch = new Hammer.Pinch();
    var pan = new Hammer.Pan();
    this.hammer.add([pinch, pan]);

    // Zoom (Pinch)
    // FIXME: not working
    // Problem: Somehow eraser planes from matched do not overlay and then do not erase
    this.hammer.on('pinchmove', _throttle(this.handlePinch, 20));
    // the pinchend call must be debounced, since a pinchmove event might
    // occur after a couple of ms after the actual pinchend event. With the
    // debounce, it is garuanted, that this.lastScale and the scale for the
    // next pinch zoom is set correctly
    this.hammer.on('pinchend', _debounce(this.handlePinchEnd, 200));

    // Move Canvas
    this.hammer.on('panstart', this.handlePanStart);
    this.hammer.on('pan', this.handlePanning);
    this.hammer.on('panend', this.handlePanEnd);

    canvas.transformCanvas = this.transformCanvas;

    return self;
  }

  /**
   * prepares object that has width, scale and height of current view
   * @returns {{canvas: *, width: *, lastScale: number, height: *}}
   */
  getInfiniteCanvas() {
    const canvas = this.$canvas;
    const canvasContent = canvas.toJSON();
    console.log('Canvas JSON', canvasContent);
    const payload = {
      width: this.width,
      height: this.height,
      lastScale: this.lastScale,
      canvas: canvasContent,
    };
    return payload;
  }

  /**
   * load infinite canvas json into canvas
   * @param infiniteCanvasState
   */
  async setInfiniteCanvas(infiniteCanvasState) {
    const self = this;
    const { lastScale, width, height, canvas } = infiniteCanvasState;

    // console.log('sICJSON', payload, canvasContainer);
    return new Promise<void>((resolve, reject) => {
      const savedCanvas = canvas;
      if (savedCanvas) {
        this.$canvas.loadFromJSON(savedCanvas, function () {
          console.log('loaded?');
          self.width = self.scaledWidth = parseInt(width, 10);
          self.height = self.scaledHeight = parseInt(height, 10);
          self.lastScale = lastScale;
          self.$canvas.setWidth(self.width);
          self.$canvas.setHeight(self.height);
          self.$canvasContainer.width(self.width).height(self.height);
          self.$canvas.renderAll();
          resolve();
        });
      } else {
        console.log('payload empty?');
        reject('payload empty?');
      }
    });
  }

  handlePointerEventBefore(fabricEvent) {
    const canvas = this.$canvas;
    const inputType = this.recognizeInput(fabricEvent.e);
    console.log('mdb', fabricEvent, fabricEvent.e, 'inputType', inputType);
    // place text box independent of touch type
    if (this.activatePlaceTextBox) {
      if (fabricEvent && fabricEvent.absolutePointer) {
        this.placeTextBox(
          fabricEvent.absolutePointer.x,
          fabricEvent.absolutePointer.y,
        );
        this.activatePlaceTextBox = false;
        return;
      }
    }

    // recognize touch
    if (inputType === 'touch') {
      if (this.drawWithTouch) {
        // drawing
        canvas.isDrawingMode = true;
      } else {
        // panning
        console.log('mdb touch');
        canvas.isDrawingMode = false;
        canvas.selection = false;
        // unselect any possible targets (if you start pan/pinch on an object)
        if (fabricEvent.target && canvas) {
          // source: https://stackoverflow.com/a/25535052
          // this statement will throw an error saying that deactivateAll() is not a function. However, it IS!
          canvas.deactivateAll().renderAll();
        }
      }
    } else if (inputType === 'pen') {
      // draw with pen
      console.log('mdb pen');
      canvas.isDrawingMode = true;
    } else if (inputType === 'mouse') {
      // draw with mouse
      console.log('mdb mouse, draw');
    } else {
      console.log('mdb input type not recognized!');
      throw new Error('input type not recognized!');
    }
  }

  handlePinchEnd(e) {
    const canvas = this.$canvas;

    console.log('hpe', e);
    this.lastScale = this.lastScale * e.scale;
    console.log('pinchend', this.lastScale, e.scale, e);

    // resize canvas, maybe this fixes eraser
    this.scaledWidth = this.scaledWidth * e.scale;
    this.scaledHeight = this.scaledHeight * e.scale;
    canvas.setWidth(this.scaledWidth);
    canvas.setHeight(this.scaledHeight);

    this.$canvasContainer.width(this.scaledWidth).height(this.scaledHeight);

    // ("width", `${self.width}px`);
    // console.log('zoom100, cc', self.$canvasContainer);

    // reactivate drawing mode after the pinch is over
  }

  handlePanStart(e) {
    const canvas = this.$canvas;
    console.log('panstart', e);

    if (
      e.pointerType === 'touch' &&
      !this.drawWithTouch // pointertype mouse and canvas state mouse-drag
    ) {
      canvas.isDrawingMode = false;
      canvas.isDragging = true;
      canvas.selection = false;
      this.selection = false;

      var scrollContainer = $('#parentContainer').get(0);
      this.startPosX = scrollContainer.scrollLeft;
      this.startPosY = scrollContainer.scrollTop;
    }
  }

  handlePanning(e) {
    const canvas = this.$canvas;
    // console.log('panning', e);

    if (e.pointerType === 'touch') {
      // console.log('pan', e);
      if (canvas.isDragging) {
        // scrolltest
        const panMultiplier = 1.0;
        const dx = this.startPosX - e.deltaX * panMultiplier;
        const dy = this.startPosY - e.deltaY * panMultiplier;
        var scrollContainer = $('#parentContainer');
        scrollContainer.scrollLeft(dx);
        scrollContainer.scrollTop(dy);
        canvas.requestRenderAll();
      }
    }
  }

  async handlePanEnd(e) {
    const canvas = this.$canvas;
    console.log('panend', e);

    if (e.pointerType === 'touch') {
      canvas.isDragging = false;
      canvas.selection = true;

      var scrollContainer = $('#parentContainer').get(0);
      this.startPosX = scrollContainer.scrollLeft;
      this.startPosY = scrollContainer.scrollTop;
    }
  }

  /**
   * recognizes input device
   *
   * @param {FabricPointerEvent} e
   * @returns ['touch','pen','mouse']
   */
  recognizeInput(e) {
    const TOUCH = 'touch';
    const PEN = 'pen';
    const MOUSE = 'mouse';
    // we need to modify fabric.js in order to get the
    // pointerevent and not only the touchevent when using pen
    console.log('recognizeInput Touchevent', e);

    if (e.touches) {
      if (e.touches.length > 1) {
        // most likely pinch, since two fingers, aka touch inputs
        console.log('recognizeInput', TOUCH);
        return TOUCH;
      }
      if (e.touches.length === 1) {
        // now it may be pen or one finger
        const touchEvent = e.touches[0] || {};
        console.log('recognizeInput Touchevent', touchEvent);
        if (touchEvent.radiusX === 0.5 && touchEvent.radiusY === 0.5) {
          // when we have pointer event, we can distinguish between
          // pen (buttons=1) and eraser (buttons=32) <- pointerevent
          // at least on chrome; firefox not supported :-(
          console.log('recognizeInput', PEN);
          return PEN;
        } else {
          console.log('recognizeInput', TOUCH);
          return TOUCH;
        }
      }
    } else {
      console.log('recognizeInput', MOUSE);
      return MOUSE;
    }
  }
}

export { InfiniteCanvas, CanvasState };
