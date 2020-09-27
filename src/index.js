import EraserBrushFactory from './EraserBrush';

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

    // Canvas Mode State Machine
    
  }

  initFabric() {
    const canvasElement = this.$canvas.get(0); // fabric.Canvas requires HTMLElement

    const self = this;
    const canvas = new fabric.Canvas(canvasElement, {
      isDrawingMode: true,
      // allowTouchScrolling: true,
    });
    fabric.Object.prototype.transparentCorners = false;
    this.fabricInitialized = true;

    var comicSansText = new fabric.Text("I'm in Comic Sans", {
      fontFamily: 'Comic',
      left: 100,
      top: 100,
    });
    canvas.add(comicSansText);

    function afterRender() {
      console.log('after:render');
      self.saveData();
    }
    // canvas.on('after:render', afterRender);
    const canvasNote = this.$parent.get(0);
    new ResizeObserver(this.resizeCanvas.bind(this, canvas)).observe(
      canvasNote,
    ); // this leads to a eraserbrush remaining...

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

    canvas.on('touch:gesture', (opt) => {
      console.log('ts');
    });

    //hammer start
    // ----

    var hammer = new Hammer.Manager(canvas.upperCanvasEl);
    var pinch = new Hammer.Pinch();
    var pan = new Hammer.Pan();

    hammer.add([pinch, pan]);

    hammer.on('pinch', function (ev) {
      console.log('pinch', ev);
      let point = null;
      point = new fabric.Point(ev.center.x, ev.center.y);
      canvas.zoomToPoint(point, ev.scale);
    });

    hammer.on('pinchend', function (ev) {
      console.log('pinchend', ev);
      // reactivate drawing mode after the pinch is over
    });

    hammer.on('panstart', function (e) {
      console.log('panstart', e);
      if (e.pointerType === 'touch') {
        canvas.isDragging = true;
        canvas.selection = false;
        self.lastPosX = e.center.x;
        self.lastPosY = e.center.y;
      }
    });

    hammer.on('pan', function (e) {
      console.log('pan', e);
      if (e.pointerType === 'touch') {
        if (canvas.isDragging) {
          var vpt = canvas.viewportTransform;
          vpt[4] += e.center.x - self.lastPosX;
          vpt[5] += e.center.y - self.lastPosY;
          canvas.requestRenderAll();
          self.lastPosX = e.center.x;
          self.lastPosY = e.center.y;
        }
      }
    });

    hammer.on('panend', function (e) {
      console.log('panend', e);
      if (e.pointerType === 'touch') {
        // on mouse up we want to recalculate new interaction
        // for all objects, so we call setViewportTransform
        canvas.setViewportTransform(canvas.viewportTransform);
        canvas.isDragging = false;
        canvas.selection = true;
      }
    });

    canvas.on('mouse:down:before', function (o) {
      console.log('mdb', o);
      if (o.e.touches && o.e.touches.length >= 1) {
        canvas.isDrawingMode = false;
        this.selection = false;
      }
    });
  }

  /**
   *
   * @param {PointerEvent} e
   */
  recognizeInput(e) {
    const touch = 'touch';
    const pen = 'pen';
    const mouse = 'mouse';
    console.log('recognizeInput Touchevent', touchEvent);

    if (e.touches) {
      if (e.touches.length > 1) {
        // most likely pinch, since two fingers, aka touch inputs
        console.log('recognizeInput', touch);
        return touch;
      }
      if (e.touches.length === 1) {
        // now it may be pen or one finger
        const touchEvent = e.touches[0] || {};
        console.log('recognizeInput Touchevent', touchEvent);
        if (touchEvent.radiusX === 0.5 && touchEvent.radiusY === 0.5) {
          console.log('recognizeInput', pen);
          return pen;
        } else {
          console.log('recognizeInput', touch);
          return touch;
        }
      }
    } else {
      console.log('recognizeInput', mouse);
      return mouse;
    }
  }

  // detect parent div size change
  resizeCanvas(canvas) {
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
