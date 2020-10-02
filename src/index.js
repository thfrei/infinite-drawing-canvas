import EraserBrushFactory from './EraserBrush';
import _throttle from './lib/lodash.throttle';
import _debounce from './lib/lodash.debounce';

/**
 * Infinite Canvas
 */
class InfiniteCanvas {
  constructor($canvas, $parent) {
    this.$canvas = $canvas;
    this.$parent = $parent;

    // Canvas
    this.isDragging;
    this.selection;
    this.lastPosX;
    this.lastPosY;
    this.numberOfPanEvents;
    this.lastScale = 1;

    this.state = {
      IDLE: 'idle',
      INTERACTING: 'interacting',
      DRAGGING: 'dragging',
      PANNING: 'panning',
      SELECTING: 'selecting',
      PINCH_ZOOMING: 'pinch_zooming',
      SELECTED: 'selected,',
    };

    // bind methods to this
    this.handlePointerEventBefore = this.handlePointerEventBefore.bind(this);
    this.resizeCanvas = this.resizeCanvas.bind(this);
    this.handlePinch = this.handlePinch.bind(this);
    this.handlePinchEnd = this.handlePinchEnd.bind(this);
    this.handlePanStart = this.handlePanStart.bind(this);
    this.handlePanning = this.handlePanning.bind(this);
    this.handlePanEnd = this.handlePanEnd.bind(this);
  }

  initFabric() {
    const canvasElement = this.$canvas.get(0); // fabric.Canvas requires HTMLElement

    const self = this;
    const canvas = new fabric.Canvas(canvasElement, {
      isDrawingMode: true,
      // allowTouchScrolling: true,
    });
    this.$canvas = canvas;
    fabric.Object.prototype.transparentCorners = false;
    this.fabricInitialized = true;

    // Add Demo Content
    var comicSansText = new fabric.Text("I'm in Comic Sans", {
      fontFamily: 'Comic Sans MS',
      left: 100,
      top: 100,
    });
    canvas.add(comicSansText);
    var demoLine = new fabric.Line([30, 30, 150, 210], {
      fill: 'green',
      stroke: 'blue',
      strokeWidth: 5,
      selectable: false,
      evented: false,
    });
    canvas.add(demoLine);

    function afterRender() {
      console.log('after:render');
    }
    canvas.on('after:render', _debounce(afterRender, 1000));

    const canvasNote = this.$parent.get(0);
    new ResizeObserver(_throttle(this.resizeCanvas, 200)).observe(canvasNote); // this leads to a eraserbrush remaining...

    // initialize buttons
    this.initButtons(canvas);
    this.initPens(canvas);

    canvas.on('mouse:wheel', function (opt) {
      var delta = opt.e.deltaY;
      var zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    canvas.on('mouse:down:before', this.handlePointerEventBefore);

    // TODO: fix mouse:move pan and hamer, so that it works together
    // // mouse and hammer touch pan are in conflict!!!!! // hammer does not work if mouse enabled...,
    // canvas.on('mouse:down', function (opt) {
    //   console.log('mouse:down', opt);
    //   var evt = opt.e;
    //   if (evt.altKey === true) {
    //     canvas.isDragging = true;
    //     canvas.selection = false;
    //     self.lastPosX = evt.clientX;
    //     self.lastPosY = evt.clientY;
    //   }
    // });
    // canvas.on('mouse:move', function (opt) {
    //   console.log('mouse:move', opt);
    //   if (canvas.isDragging) {
    //     var e = opt.e;
    //     var vpt = canvas.viewportTransform;
    //     vpt[4] += e.clientX - self.lastPosX;
    //     vpt[5] += e.clientY - self.lastPosY;
    //     canvas.requestRenderAll();
    //     self.lastPosX = e.clientX;
    //     self.lastPosY = e.clientY;
    //   }
    // });
    // canvas.on('mouse:up', function (opt) {
    //   console.log('mouse:up', opt);
    //   // on mouse up we want to recalculate new interaction
    //   // for all objects, so we call setViewportTransform
    //   canvas.setViewportTransform(this.viewportTransform);
    //   canvas.isDragging = false;
    //   canvas.selection = true;
    // });

    //hammer start
    // ----
    var hammer = new Hammer.Manager(canvas.upperCanvasEl);
    var pinch = new Hammer.Pinch();
    var pan = new Hammer.Pan();

    hammer.add([pinch, pan]);

    hammer.on('pinchmove', _throttle(this.handlePinch, 20));
    // the pinchend call must be debounced, since a pinchmove event might
    // occur after a couple of ms after the actual pinchend event. With the
    // debounce, it is garuanted, that this.lastScale and the scale for the
    // next pinch zoom is set correctly
    hammer.on('pinchend', _debounce(this.handlePinchEnd, 200));

    hammer.on('panstart', this.handlePanStart);
    hammer.on('pan', _throttle(this.handlePanning, 20));
    hammer.on('panend', this.handlePanEnd);

    return canvas;
  }

  handlePointerEventBefore(fabricEvent) {
    const canvas = this.$canvas;
    console.log('mdb', fabricEvent, fabricEvent.e);
    // recognize touch
    if (this.recognizeInput(fabricEvent.e) === 'touch') {
      console.log('mdb touch');
      canvas.isDrawingMode = false;
      canvas.selection = false;
      // unselect any possible targets (if you start the pan on an object)
      if (fabricEvent.target) {
        // source: https://stackoverflow.com/a/25535052
        canvas.deactivateAll().renderAll();
      }
    } else if (this.recognizeInput(fabricEvent.e) === 'pen') {
      console.log('mdb pen');
      canvas.isDrawingMode = true;
    } else {
      fabricEvent.target.selection = true;
      console.log('mdb mouse');
      console.log('DRAW mouse intention');
    }
  }

  handlePinch(e) {
    const canvas = this.$canvas;
    console.log('pinch', e, 'pinchingi scale', this.lastScale, e.scale);
    let point = null;
    point = new fabric.Point(e.center.x, e.center.y);
    canvas.zoomToPoint(point, this.lastScale * e.scale);
  }

  handlePinchEnd(e) {
    this.lastScale = this.lastScale * e.scale;
    console.log('pinchend', this.lastScale, e.scale, e);
    // reactivate drawing mode after the pinch is over
  }

  handlePanStart(e) {
    const canvas = this.$canvas;
    console.log('panstart', e);

    if (e.pointerType === 'touch') {
      canvas.isDrawingMode = false;
      canvas.isDragging = true;
      canvas.selection = false;
      this.selection = false;
      this.lastPosX = e.center.x;
      this.lastPosY = e.center.y;
    }
  }

  handlePanning(e) {
    const canvas = this.$canvas;
    console.log('panning', e);

    if (e.pointerType === 'touch') {
      console.log('pan', e);
      if (canvas.isDragging) {
        var vpt = canvas.viewportTransform;
        vpt[4] += e.center.x - this.lastPosX;
        vpt[5] += e.center.y - this.lastPosY;
        canvas.requestRenderAll();
        this.lastPosX = e.center.x;
        this.lastPosY = e.center.y;
      }
    }
  }

  handlePanEnd(e) {
    const canvas = this.$canvas;
    console.log('panend', e);

    if (e.pointerType === 'touch') {
      // on mouse up we want to recalculate new interaction
      // for all objects, so we call setViewportTransform
      canvas.setViewportTransform(canvas.viewportTransform);
      canvas.isDragging = false;
      canvas.selection = true;
    }
  }

  /**
   *
   * @param {FabricPointerEvent} e
   */
  recognizeInput(e) {
    const TOUCH = 'touch';
    const PEN = 'pen';
    const MOUSE = 'mouse';
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

  // detect parent div size change
  resizeCanvas() {
    const canvas = this.$canvas;
    const width = this.$parent.width();
    const height = this.$parent.height();
    console.log(`setting canvas to ${width} x ${height}px`);
    // canvas.setWidth(width);
    // canvas.setHeight(height);
    canvas.setWidth(1500);
    canvas.setHeight(1500);
    canvas.renderAll();
  }

  /**
   * add listeners to buttons
   */
  initButtons(canvas) {
    var saveCanvas = $('#save-canvas'),
      refreshCanvas = $('#refresh-canvas'),
      clearEl = $('#clear-canvas'),
      undo = $('#undo'),
      redo = $('#redo');
    const deletedItems = [];

    undo.on('click', () => {
      // // Source: https://stackoverflow.com/a/28666556
      // var lastItemIndex = canvas.getObjects().length - 1;
      // var item = canvas.item(lastItemIndex);

      // deletedItems.push(item);
      // // if(item.get('type') === 'path') {
      // canvas.remove(item);
      // canvas.renderAll();
      // // }

      canvas.undo(); //fabric-history
    });

    redo.on('click', () => {
      // const lastItem = deletedItems.pop();
      // if (lastItem) {
      //   canvas.add(lastItem);
      //   canvas.renderAll();
      // }

      canvas.redo(); //fabric-history
    });

    clearEl.on('click', () => {
      console.log('cE-oC');
      canvas.clear();
    });

    saveCanvas.on('click', () => {
      console.log('sC-oC');
      const canvasContent = canvas.toJSON();
      console.log('Canvas JSON', canvasContent);
      this.saveData();
    });

    refreshCanvas.on('click', () => {
      console.log('rC-oC');
      this.doRefresh('no note entity needed for refresh, only noteComplement');
    });
  }

  initPens(canvas) {
    $('#pen-1').on('click', () => {
      canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas);
      canvas.freeDrawingBrush.color = 'black';
      canvas.freeDrawingBrush.width = 2;
      canvas.isDrawingMode = true;
    });
    $('#pen-2').on('click', () => {
      canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas);
      canvas.freeDrawingBrush.color = 'red';
      canvas.freeDrawingBrush.width = 2;
      canvas.isDrawingMode = true;
    });
    $('#pen-3').on('click', () => {
      canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas);
      canvas.freeDrawingBrush.color = 'green';
      canvas.freeDrawingBrush.width = 2;
      canvas.isDrawingMode = true;
    });
    $('#pen-4').on('click', () => {
      canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas);
      canvas.freeDrawingBrush.color = 'blue';
      canvas.freeDrawingBrush.width = 2;
      canvas.isDrawingMode = true;
    });
    $('#marker-1').on('click', () => {
      canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas);
      canvas.freeDrawingBrush.color = 'rgba(255, 255, 0, 0.5)';
      canvas.freeDrawingBrush.width = 10;
      canvas.isDrawingMode = true;
    });
    $('#marker-2').on('click', () => {
      canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas);
      canvas.freeDrawingBrush.color = 'rgba(241,229,170, 0.5)';
      canvas.freeDrawingBrush.width = 10;
      canvas.isDrawingMode = true;
    });
    $('#marker-3').on('click', () => {
      canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas);
      canvas.freeDrawingBrush.color = 'rgba(51,204,0, 0.5)';
      canvas.freeDrawingBrush.width = 10;
      canvas.isDrawingMode = true;
    });
    $('#marker-4').on('click', () => {
      canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas);
      canvas.freeDrawingBrush.color = 'rgba(75,141,242, 0.5)';
      canvas.freeDrawingBrush.width = 10;
      canvas.isDrawingMode = true;
    });
    $('#eraser').on('click', () => {
      const { EraserBrush } = EraserBrushFactory(fabric);
      const eraserBrush = new EraserBrush(canvas);
      eraserBrush.width = 10;
      eraserBrush.color = 'rgb(236,195,195)'; // erser works with opacity!
      canvas.freeDrawingBrush = eraserBrush;
      canvas.isDrawingMode = true;
    });
    $('#text-1').on('click', () => {
      canvas.add(
        new fabric.IText('Tap and Type', {
          fontFamily: 'arial black',
          left: 100,
          top: 100,
        }),
      );
      canvas.isDrawingMode = false;
    });
  }
}

setTimeout(() => {
  const myCanvas = new InfiniteCanvas(
    $('.canvasElement'),
    $('#parentContainer'),
  );
  myCanvas.initFabric();
}, 1000);
