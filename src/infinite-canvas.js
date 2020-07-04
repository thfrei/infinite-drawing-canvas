import EraserBrushFactory from './EraserBrush';

const initFabric = () => {
  const self = this;
  const canvas = this.__canvas = new fabric.Canvas('c', {
    isDrawingMode: true
  });
  fabric.Object.prototype.transparentCorners = false;

  // canvas.on('after:render', () => {
  //   console.log();
  // });

  const {EraserBrush} = EraserBrushFactory(fabric);

  var drawingModeEl = $('#drawing-mode'),
    drawingOptionsEl = $('#drawing-mode-options'),
    drawingColorEl = $('#drawing-color'),
    drawingShadowColorEl = $('#drawing-shadow-color'),
    drawingLineWidthEl = $('#drawing-line-width'),
    drawingShadowWidth = $('#drawing-shadow-width'),
    drawingShadowOffset = $('#drawing-shadow-offset'),
    saveCanvas = $('#save-canvas'),
    refreshCanvas = $('#refresh-canvas'),
    clearEl = $('#clear-canvas'),
    undo = $('#undo'),
    redo = $('#redo')
  ;

  const deletedItems = [];

  undo.on('click', function () {
    // Source: https://stackoverflow.com/a/28666556
    var lastItemIndex = (canvas.getObjects().length - 1);
    var item = canvas.item(lastItemIndex);

    deletedItems.push(item);
    // if(item.get('type') === 'path') {
    canvas.remove(item);
    canvas.renderAll();
    // }
  })

  redo.on('click', function () {
    const lastItem = deletedItems.pop();
    if (lastItem) {
      canvas.add(lastItem);
      canvas.renderAll();
    }
  })

  clearEl.on('click', function () {
    console.log('cE-oC');
    canvas.clear()
  });

  saveCanvas.on('click', function () {
    console.log('sC-oC');
    const canvasContent = canvas.toJSON();
    console.log('Canvas JSON', canvasContent);
    self.saveData();
  });
  refreshCanvas.on('click', function () {
    console.log('rC-oC');
    self.doRefresh('no note entity needed for refresh, only noteComplement');
  });
  drawingModeEl.on('click', function () {
    canvas.isDrawingMode = !canvas.isDrawingMode;
    if (canvas.isDrawingMode) {
      drawingModeEl.html('Cancel drawing mode');
      drawingOptionsEl.css('display', '');
    } else {
      drawingModeEl.html('Enter drawing mode');
      drawingOptionsEl.css('display', 'none');
    }
  });
  //
  // if (fabric.PatternBrush) {
  //     var vLinePatternBrush = new fabric.PatternBrush(canvas);
  //     vLinePatternBrush.getPatternSrc = function () {
  //
  //         var patternCanvas = fabric.document.createElement('canvas');
  //         patternCanvas.width = patternCanvas.height = 10;
  //         var ctx = patternCanvas.getContext('2d');
  //
  //         ctx.strokeStyle = this.color;
  //         ctx.lineWidth = 5;
  //         ctx.beginPath();
  //         ctx.moveTo(0, 5);
  //         ctx.lineTo(10, 5);
  //         ctx.closePath();
  //         ctx.stroke();
  //
  //         return patternCanvas;
  //     };
  //
  //     var hLinePatternBrush = new fabric.PatternBrush(canvas);
  //     hLinePatternBrush.getPatternSrc = function () {
  //
  //         var patternCanvas = fabric.document.createElement('canvas');
  //         patternCanvas.width = patternCanvas.height = 10;
  //         var ctx = patternCanvas.getContext('2d');
  //
  //         ctx.strokeStyle = this.color;
  //         ctx.lineWidth = 5;
  //         ctx.beginPath();
  //         ctx.moveTo(5, 0);
  //         ctx.lineTo(5, 10);
  //         ctx.closePath();
  //         ctx.stroke();
  //
  //         return patternCanvas;
  //     };
  //
  //     var squarePatternBrush = new fabric.PatternBrush(canvas);
  //     squarePatternBrush.getPatternSrc = function () {
  //
  //         var squareWidth = 10, squareDistance = 2;
  //
  //         var patternCanvas = fabric.document.createElement('canvas');
  //         patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
  //         var ctx = patternCanvas.getContext('2d');
  //
  //         ctx.fillStyle = this.color;
  //         ctx.fillRect(0, 0, squareWidth, squareWidth);
  //
  //         return patternCanvas;
  //     };
  //
  //     var diamondPatternBrush = new fabric.PatternBrush(canvas);
  //     diamondPatternBrush.getPatternSrc = function () {
  //
  //         var squareWidth = 10, squareDistance = 5;
  //         var patternCanvas = fabric.document.createElement('canvas');
  //         var rect = new fabric.Rect({
  //             width: squareWidth,
  //             height: squareWidth,
  //             angle: 45,
  //             fill: this.color
  //         });
  //
  //         var canvasWidth = rect.getBoundingRect().width;
  //
  //         patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
  //         rect.set({left: canvasWidth / 2, top: canvasWidth / 2});
  //
  //         var ctx = patternCanvas.getContext('2d');
  //         rect.render(ctx);
  //
  //         return patternCanvas;
  //     };
  //
  //     // var img = new Image();
  //     // img.src = './libraries/canvas-note/honey_im_subtle.png';
  //
  //     // var texturePatternBrush = new fabric.PatternBrush(canvas);
  //     // texturePatternBrush.source = img;
  // }

  $('#drawing-mode-selector').change(function () {
    if (false) {
    }
      // else if (this.value === 'hline') {
      //     canvas.freeDrawingBrush = vLinePatternBrush;
      // } else if (this.value === 'vline') {
      //     canvas.freeDrawingBrush = hLinePatternBrush;
      // } else if (this.value === 'square') {
      //     canvas.freeDrawingBrush = squarePatternBrush;
      // } else if (this.value === 'diamond') {
      //     canvas.freeDrawingBrush = diamondPatternBrush;
      // }
      // else if (this.value === 'texture') {
      //   canvas.freeDrawingBrush = texturePatternBrush;
    // }
    else if (this.value === "Eraser") {
      // to use it, just set the brush
      const eraserBrush = new EraserBrush(canvas);
      eraserBrush.width = parseInt(drawingLineWidthEl.val(), 10) || 1;
      eraserBrush.color = 'rgb(236,195,195)'; // erser works with opacity!
      canvas.freeDrawingBrush = eraserBrush;
      canvas.isDrawingMode = true;
    } else {
      canvas.freeDrawingBrush = new fabric[this.value + 'Brush'](canvas);
      canvas.freeDrawingBrush.color = drawingColorEl.val();
      canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.val(), 10) || 1;
      canvas.freeDrawingBrush.shadow = new fabric.Shadow({
        blur: parseInt(drawingShadowWidth.val(), 10) || 0,
        offsetX: 0,
        offsetY: 0,
        affectStroke: true,
        color: drawingShadowColorEl.val(),
      });
    }


  });

  drawingColorEl.change(function () {
    canvas.freeDrawingBrush.color = this.value;
  });
  drawingShadowColorEl.change(function () {
    canvas.freeDrawingBrush.shadow.color = this.value;
  })
  drawingLineWidthEl.change(function () {
    canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
    drawingLineWidthEl.prev().html(this.value);
  });
  drawingShadowWidth.change(function () {
    canvas.freeDrawingBrush.shadow.blur = parseInt(this.value, 10) || 0;
    drawingShadowWidth.prev().html(this.value);
  });
  drawingShadowOffset.change(function () {
    canvas.freeDrawingBrush.shadow.offsetX = parseInt(this.value, 10) || 0;
    canvas.freeDrawingBrush.shadow.offsetY = parseInt(this.value, 10) || 0;
    drawingShadowOffset.prev().html(this.value);
  })

  if (canvas.freeDrawingBrush) {
    canvas.freeDrawingBrush.color = drawingColorEl.value;
    canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
    canvas.freeDrawingBrush.shadow = new fabric.Shadow({
      blur: parseInt(drawingShadowWidth.value, 10) || 0,
      offsetX: 0,
      offsetY: 0,
      affectStroke: true,
      color: drawingShadowColorEl.value,
    });
  }
}

initFabric();
