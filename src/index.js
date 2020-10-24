import _throttle from './lib/lodash.throttle';
import _debounce from './lib/lodash.debounce';
import { initButtons, initPens } from './gui.js';

/**
 * Infinite Canvas
 */
class InfiniteCanvas {
  constructor($canvas, $parent, $canvasContainer) {
    this.$canvas = $canvas;
    this.$canvasContainer = $canvasContainer;
    this.$parent = $parent;

    // Canvas
    this.isDragging;
    this.selection;
    this.lastPosX;
    this.lastPosY;
    this.startPosX = 0;
    this.startPosY = 0;
    this.numberOfPanEvents;
    this.lastScale = 1;
    this.fonts = [
      'Times New Roman',
      'Arial',
      'Verdana',
      'Calibri',
      'Consolas',
      'Comic Sans MS',
    ];
    this.width = this.scaledWidth = 1500; //px
    this.height = this.scaledHeight = 1500; //px

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
    this.transformCanvas = this.transformCanvas.bind(this);
    this.resetZoom = this.resetZoom.bind(this);
  }

  initFabric() {
    const canvasElement = this.$canvas.get(0); // fabric.Canvas requires HTMLElement
    this.canvasElement = canvasElement;

    const self = this;
    const canvas = new fabric.Canvas(canvasElement, {
      isDrawingMode: true,
      allowTouchScrolling: true,
    });
    this.$canvas = canvas;
    fabric.Object.prototype.transparentCorners = false;

    // Add Demo Content
    this.addDemoContent(canvas);
    this.addBg(canvas);

    // Resizing
    // FIXME: canvas should only enlarge, maybe we dont even need, since canvas will scroll behind parent!
    // const canvasNote = this.$parent.get(0);
    // new ResizeObserver(_throttle(this.resizeCanvas, 200)).observe(canvasNote); // this leads to a eraserbrush remaining...

    // Buttons
    initButtons(self);
    initPens(canvas);

    // Handle different input devices: Touch (Finger), Pen, Mouse
    canvas.on('mouse:down:before', this.handlePointerEventBefore);

    var hammer = new Hammer.Manager(canvas.upperCanvasEl);
    var pinch = new Hammer.Pinch();
    var pan = new Hammer.Pan();
    hammer.add([pinch, pan]);

    // Zoom (Pinch)
    // FIXME: not working
    // Problem: Somehow eraser planes from matched do not overlay and then do not erase
    hammer.on('pinchmove', _throttle(this.handlePinch, 20));
    // the pinchend call must be debounced, since a pinchmove event might
    // occur after a couple of ms after the actual pinchend event. With the
    // debounce, it is garuanted, that this.lastScale and the scale for the
    // next pinch zoom is set correctly
    hammer.on('pinchend', _debounce(this.handlePinchEnd, 200));

    // Move Canvas
    hammer.on('panstart', this.handlePanStart);
    hammer.on('pan', this.handlePanning);
    hammer.on('panend', this.handlePanEnd);

    canvas.transformCanvas = this.transformCanvas;

    return canvas;
  }

  transformCanvas(direction, distance) {
    const canvas = this.$canvas;
    const items = canvas.getObjects();

    for (let i = 0; i < items.length; i++) {
      const item = canvas.item(i).setCoords();
      console.log('tc, item', item);
      if (direction === 'top') {
        // move all down
        item.top = item.top + distance;
      }
      if (direction === 'left') {
        // move all to the right
        item.left = item.left + distance;
      }
    }

    this.resetZoom();

    let newWidth = this.scaledWidth,  newHeight = this.scaledHeight;

    if (direction === 'top' || direction === 'bottom') {
      newHeight = this.scaledHeight + distance;
    } else if (direction === 'left' || direction === 'right') {
      newWidth = this.scaledWidth + distance;
    }
    this.scaledWidth = this.width = newWidth;
    this.scaledHeight = this.height = newHeight;
    canvas.setWidth(newWidth);
    canvas.setHeight(newHeight);
    
    this.$canvasContainer.width(newWidth).height(newHeight);

    canvas.renderAll();
    console.log('called tc', direction, distance);
  }

  resetZoom() {
    const canvas = this.$canvas;

    // zoom level of canvas
    canvas.setZoom(1);
    // width of
    canvas.setWidth(this.width);
    canvas.setHeight(this.height);
    // reset scale, so that for next pinch we start with "fresh" values
    this.scaledWidth = this.width;
    this.scaledHeight = this.height;
    // set div container of canvas
    this.$canvasContainer.width(this.width).height(this.height);
  }

  addDemoContent(canvas) {
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
  }

  addBg(canvas) {
    // Add BG
    var bg = new fabric.Rect({
      width: 1500,
      height: 1500,
      stroke: 'Fuchsia',
      strokeWidth: 10,
      fill: '',
      evented: false,
      selectable: false,
    });
    bg.fill = new fabric.Pattern(
      {
        source:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAASElEQVQ4y2NkYGD4z0A6+M3AwMBKrGJWBgYGZiibEQ0zIInDaCaoelYyHYcX/GeitomjBo4aOGrgQBj4b7RwGFwGsjAwMDAAAD2/BjgezgsZAAAAAElFTkSuQmCC',
      },
      function () {
        bg.dirty = true;
        canvas.requestRenderAll();
      },
    );
    bg.canvas = canvas;
    canvas.backgroundImage = bg;
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
      if (fabricEvent.target && canvas) {
        // source: https://stackoverflow.com/a/25535052
        canvas.deactivateAll().renderAll();
      }
    } else if (this.recognizeInput(fabricEvent.e) === 'pen') {
      console.log('mdb pen');
      canvas.isDrawingMode = true;
    } else {
      console.log('mdb mouse');
      console.log('DRAW mouse intention');
    }
  }

  handlePinch(e) {
    console.log('hp', e);
    const canvas = this.$canvas;
    console.log('pinch', e, 'pinchingi scale', this.lastScale, e.scale);
    // during pinch, we need to focus top left corner.
    // otherwise canvas might slip underneath the container and misalign.
    let point = null;
    point = new fabric.Point(0, 0);
    // point = new fabric.Point(e.center.x, e.center.y);
    canvas.zoomToPoint(point, this.lastScale * e.scale);
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

    if (e.pointerType === 'touch') {
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
    console.log('panning', e);

    if (e.pointerType === 'touch') {
      console.log('pan', e);
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
      // take momentum of panning to do it once panning is finished
      // let deltaX = e.deltaX;
      // let deltaY = e.deltaY;
      // for(let v = Math.abs(e.overallVelocity); v>0; v=v-0.1) {
      //   if (deltaX > 0) {
      //     deltaX = e.deltaX + e.deltaX * v;
      //   } else {
      //     deltaX = e.deltaX - e.deltaX * v;
      //   }
      //   deltaY = e.deltaY + e.deltaY * v;
      //   const newEvent = {...e, overallVelocity: v, deltaX, deltaY};
      //   console.log('vel', v, deltaX, deltaY, newEvent);
      //   this.handlePanning(newEvent);
      //   await this.sleep(1000);
      // }

      // on mouse up we want to recalculate new interaction
      // for all objects, so we call setViewportTransform
      // canvas.setViewportTransform(canvas.viewportTransform);
      canvas.isDragging = false;
      canvas.selection = true;

      var scrollContainer = $('#parentContainer').get(0);
      this.startPosX = scrollContainer.scrollLeft;
      this.startPosY = scrollContainer.scrollTop;
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
}

setTimeout(() => {
  const myCanvas = new InfiniteCanvas(
    $('.canvasElement'),
    $('#parentContainer'),
    $('#canvasContainer'),
  );
  const canvas = myCanvas.initFabric();

  canvas.setWidth(myCanvas.width);
  canvas.setHeight(myCanvas.height);

  // After Render
  function afterRender() {
    console.log('after:render outside');
  }
  canvas.on('after:render', _debounce(afterRender, 1000));

  window.fabric = fabric;
  window.myCanvas = canvas;
}, 1000);
