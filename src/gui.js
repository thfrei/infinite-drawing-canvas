/**
 * add listeners to buttons
 */
export const initButtons = (canvas) => {
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
};

export const initPens = (canvas) => {
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
};
